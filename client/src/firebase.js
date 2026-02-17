import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBTyUQaBM4_exX496nDjS72YIsmM3l5I0Y",
  authDomain: "menu-admin-76356.firebaseapp.com",
  databaseURL: "https://menu-admin-76356-default-rtdb.firebaseio.com",
  projectId: "menu-admin-76356",
  storageBucket: "menu-admin-76356.firebasestorage.app",
  messagingSenderId: "882758954881",
  appId: "1:882758954881:web:67a13abd6e6d0748670280",
  measurementId: "G-5MFB75J8GZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);   // Firestore
export const storage = getStorage(app); // Storage for images
