import { createContext, useState, useEffect } from "react";

// Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  orderBy,
  query,
  getDocs,
  onSnapshot,
  addDoc,
} from "firebase/firestore";

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

  // Fetch products from Firestore if not cached
  useEffect(() => {
    // Try to load cached data from local storage
    const cachedProducts = getCachedProducts();
    if (cachedProducts) {
      console.log("Fetching products from local storage");
      setPRODUCTS(cachedProducts);
    }

    // Set up the real-time listener to update products when they change
    const unsubscribe = fetchProducts();

    // Clean up the real-time listener when the component is unmounted
    return () => {
      unsubscribe();
    };
  }, []);

  async function addCategoryToFireStore(categoryName) {
    console.log("added to firestore:", categoryName);
    const categoryCollection = collection(db, "categories");
    const category = {
      category: categoryName,
    };
    try {
      const docRef = await addDoc(categoryCollection, category);
      console.log(`Document written with ID: ${docRef.id}`);
    } catch (e) {
      console.error(`Error adding document: ${e}`);
    }
  }

  const setCachedCategories = (categories) => {
    localStorage.setItem("categories", JSON.stringify(categories));
  };

  function fetchCategories() {
    const categoriesCollection = collection(db, "categories");
    const q = query(categoriesCollection, orderBy("id"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const categoriesSet = new Set(); // Use a Set to store unique categories
      snapshot.docs.forEach((doc) => {
        const data = doc.data();
        const category = data.name;
        categoriesSet.add(category); // Add the category to the Set
      });

      const categoriesList = Array.from(categoriesSet); // Convert the Set back to an array
      console.log("Fetching categories from Firestore", categoriesList);
      setCATEGORIES(categoriesList);
      setCachedCategories(categoriesList); // Update the cached data in local storage
    });

    return unsubscribe;
  }

  async function addProductToFirestore(obj) {
    console.log("added to firestore");
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
    setPRODUCTS,
    getProduct,
    getProductsInCategory,
    addProductToFirestore,
    fetchCategories,
    addCategoryToFireStore,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
