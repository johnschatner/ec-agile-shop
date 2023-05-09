import { createContext, useState, useEffect } from "react";

// Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  orderBy,
  query,
  where,
  getDocs,
  onSnapshot,
  addDoc,
  limit,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_REACT_APP_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env
    .VITE_REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase if process object is defined
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Storage
const storage = getStorage(app);

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  const pageSize = 100;
  // Stuff
  const [PRODUCTS, setPRODUCTS] = useState([]);
  const [CATEGORIES, setCATEGORIES] = useState([]);

  function getCachedProducts() {
    const cachedData = localStorage.getItem("products");
    return cachedData ? JSON.parse(cachedData) : null;
  }

  function setCachedProducts(products) {
    console.log("Caching products in local storage");
    localStorage.setItem("products", JSON.stringify(products));
  }

  function getCachedProducts() {
    const cachedData = localStorage.getItem("products");
    return cachedData && cachedData !== "undefined"
      ? JSON.parse(cachedData)
      : null;
  }

  function setCachedCategories(categories) {
    console.log("Caching categories in local storage");
    localStorage.setItem("categories", JSON.stringify(categories));
  }

  function getCachedCategories() {
    const cachedData = localStorage.getItem("categories");
    return cachedData && cachedData !== "undefined"
      ? JSON.parse(cachedData)
      : null;
  }

  // Fetch products & categories from Firestore if not cached
  useEffect(() => {
    async function fetchInitialData() {
      // Try to load cached data from local storage
      const cachedProducts = getCachedProducts();
      if (cachedProducts) {
        console.log("Fetching products from local storage");
        setPRODUCTS(cachedProducts);
      } else {
        // Fetch products once if not cached
        await fetchProducts();
      }

      // Fetch categories once
      await fetchCategories();
    }

    fetchInitialData();

    // Set up the real-time listener to update products when they change
    const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
      const productsList = snapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = doc.id; // Use Firestore document ID as the product ID
        return data;
      });
      console.log("Fetching products from Firestore", productsList);
      setPRODUCTS(productsList);
      setCachedProducts(productsList); // Update the cached data in local storage
    });

    // Clean up the real-time listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  async function fetchCategories() {
    const cachedCategories = getCachedCategories();
    if (cachedCategories) {
      console.log("Fetching categories from local storage");
      setCATEGORIES(cachedCategories);
      return;
    }

    const categoryCollection = collection(db, "categories");
    const categorySnapshot = await getDocs(categoryCollection);
    const categoriesList = categorySnapshot.docs.map(
      (doc) => doc.data().category
    );

    console.log("Setting categories:", categoriesList);
    setCATEGORIES(categoriesList);
    setCachedCategories(categoriesList);
  }

  async function addCategoryToFireStore(categoryName) {
    console.log("adding to firestore:", categoryName);
    const categoryCollection = collection(db, "categories");

    // Check if the category already exists
    const q = query(categoryCollection, where("category", "==", categoryName));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      // Category doesn't exist, so add it
      const category = {
        category: categoryName,
      };
      try {
        const docRef = await addDoc(categoryCollection, category);
        console.log(`Document written with ID: ${docRef.id}`);
        return false;
      } catch (e) {
        console.error(`Error adding document: ${e}`);
      }
    } else {
      console.log("Category already exists in the database.");
      return true;
    }
  }

  async function addProductToFirestore(product) {
    try {
      const productImages = product.productImageArray;
      const imageURLs = {};

      // Upload each image to Firebase Storage
      for (let i = 0; i < productImages.length; i++) {
        const image = productImages[i];
        const imageRef = ref(
          storage,
          `product_images/${product.name}/${product.name}_${i}`
        );
        const snapshot = await uploadBytes(imageRef, image);
        const imageURL = await getDownloadURL(snapshot.ref);
        imageURLs[`image${i + 1}`] = imageURL; // Assign the URL to a property based on the image index
      }

      console.log(productImages);

      // Create a new product object with the image URL
      const updatedProduct = {
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        image: imageURLs,
        dateAdded: new Date().toISOString().slice(0, 10),
      };

      // Add the product to Firestore
      const productsRef = collection(db, "products");
      const newProductRef = await addDoc(productsRef, updatedProduct);

      console.log("Product added with image: ", newProductRef.id);
    } catch (error) {
      console.error("Error adding product with image: ", error);
    }
  }

  async function addProductsToFirestore() {
    const productsCollection = collection(db, "products");
    const batch = writeBatch(db);

    PRODUCTS.forEach((product) => {
      const newDocRef = doc(productsCollection);
      batch.set(newDocRef, product);
    });

    try {
      await batch.commit();
      console.log("Batch write successful");
    } catch (e) {
      console.error(`Error with batch write: ${e}`);
    }
  }

  function fetchProducts(startAfter) {
    const productsCollection = collection(db, "products");
    const q = query(
      productsCollection,
      orderBy("id"),
      startAfter ? startAfter() : limit(pageSize)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsList = snapshot.docs.map((doc) => {
        const product = doc.data();
        product.id = parseInt(product.id, 10); // Convert the id back to a number
        return product;
      });
      console.log("Fetching products from Firestore", productsList);
      setPRODUCTS((prevProducts) => [...prevProducts, ...productsList]);
      setCachedProducts([...PRODUCTS, ...productsList]); // Update the cached data in local storage
    });

    return unsubscribe;
  }

  const getProduct = (id) => {
    const product = PRODUCTS.find((product) => product.id === id);
    return product;
  };

  const getProductsInCategory = (category) => {
    const productsInCategory = PRODUCTS.filter(
      (product) => product.category === category
    );
    return productsInCategory;
  };

  // Export
  const contextValue = {
    PRODUCTS,
    CATEGORIES,
    setCATEGORIES,
    setPRODUCTS,
    getProduct,
    getProductsInCategory,
    addProductToFirestore,
    addCategoryToFireStore,
    setCachedCategories,
    setCachedProducts,
    fetchCategories,
    setCATEGORIES,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
