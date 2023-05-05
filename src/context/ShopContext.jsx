import { createContext, useState, useEffect } from "react";

// Firebase
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, addDoc } from "firebase/firestore";

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

// Products
import { products } from "../assets/products/products";

export const ShopContext = createContext(null);

export const ShopContextProvider = (props) => {
  // Stuff
  const [PRODUCTS, setPRODUCTS] = useState(products);

  // Fetch products from Firestore
  useEffect(() => {
    // addProductsToFirestore(); // You can call this function when needed
    // fetchProducts();
  }, []);

  async function addProductsToFirestore() {
    const productsCollection = collection(db, "products");

    products.forEach(async (product) => {
      try {
        const docRef = await addDoc(productsCollection, product);
        console.log(`Document written with ID: ${docRef.id}`);
      } catch (e) {
        console.error(`Error adding document: ${e}`);
      }
    });
  }

  async function fetchProducts() {
    const productsCollection = collection(db, "products");
    const productsSnapshot = await getDocs(productsCollection);
    const productsList = productsSnapshot.docs.map((doc) => doc.data());
    setPRODUCTS(productsList);
  }

  console.log(PRODUCTS);

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
