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
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
