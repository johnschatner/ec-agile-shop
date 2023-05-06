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

  // Fetch products & categories from Firestore if not cached
  useEffect(() => {
    // Try to load cached data from local storage
    const cachedProducts = getCachedProducts();
    if (cachedProducts) {
      console.log("Fetching products from local storage");
      setPRODUCTS(cachedProducts);
    }

    // Set up the real-time listener to update products when they change
    const unsubscribe = fetchProducts();

    // Fetch categories once
    fetchCategories();

    // Clean up the real-time listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  async function fetchCategories() {
    const categoryCollection = collection(db, "categories");
    const categorySnapshot = await getDocs(categoryCollection);
    const categoriesList = categorySnapshot.docs.map(
      (doc) => doc.data().category
    );
    setCATEGORIES(categoriesList);
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

  // async function addProductToFirestore(obj) {
  //   console.log("added to firestore", obj);

  //   const productImage = obj.productImage;

  //   // Upload the image to Firebase Storage
  //   const imageRef = ref(storage, `images/${productImage.name}`);
  //   const snapshot = await uploadBytes(imageRef, productImage);
  //   const imageURL = await getDownloadURL(snapshot.ref);

  //   console.log(imageURL);
  // }

  async function addProductToFirestore(product) {
    try {
      const productImage = product.productImage;
      // Upload the image to Firebase Storage
      const imageRef = ref(storage, `product_images/${product.name}`);
      const snapshot = await uploadBytes(imageRef, productImage);

      // Get the download URL for the uploaded image
      const imageURL = await getDownloadURL(snapshot.ref);

      // Create a new product object with the image URL
      const updatedProduct = {
        name: product.name,
        price: product.price,
        category: product.category,
        description: product.description,
        id: Math.floor(Math.random() * 1000000),
        image: imageURL,
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

    PRODUCTS.forEach(async (product) => {
      try {
        const docRef = await addDoc(productsCollection, product);
        console.log(`Document written with ID: ${docRef.id}`);
      } catch (e) {
        console.error(`Error adding document: ${e}`);
      }
    });
  }

  function fetchProducts() {
    const productsCollection = collection(db, "products");
    const q = query(productsCollection, orderBy("id"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const productsList = snapshot.docs.map((doc) => {
        const data = doc.data();
        data.id = parseInt(data.id, 10); // Convert the id back to a number
        return data;
      });
      console.log("Fetching products from Firestore", productsList);
      setPRODUCTS(productsList);
      setCachedProducts(productsList); // Update the cached data in local storage
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
    storage, // Firebase Storage
    setPRODUCTS,
    getProduct,
    getProductsInCategory,
    addProductToFirestore,
    addCategoryToFireStore,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
