import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA0xe7VzhqK0N_JDvWGUi4KfYL8EbOycXs",
  authDomain: "neads-website.firebaseapp.com",
  projectId: "neads-website",
  storageBucket: "neads-website.appspot.com",
  messagingSenderId: "484420778418",
  appId: "1:484420778418:web:49ec17da11d80c4f294cab",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);   // Firestore
export const storage = getStorage(app); // Storage for images
