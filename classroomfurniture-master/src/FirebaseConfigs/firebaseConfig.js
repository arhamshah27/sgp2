// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBmwS-ZZBm1x06AHryjkN3jV293fLnn-LM",
  authDomain: "classroom-furniture-ecommerce.firebaseapp.com",
  projectId: "classroom-furniture-ecommerce",
  storageBucket: "classroom-furniture-ecommerce.firebasestorage.app",
  messagingSenderId: "1021126620528",
  appId: "1:1021126620528:web:205d3b9b13a6da5fc38bb5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const storage = getStorage(app)
export const db = getFirestore(app)