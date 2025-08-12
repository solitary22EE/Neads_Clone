// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; 
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0xe7VzhqK0N_JDvWGUi4KfYL8EbOycXs",
  authDomain: "neads-website.firebaseapp.com",
  projectId: "neads-website",
  storageBucket: "neads-website.firebasestorage.app",
  messagingSenderId: "484420778418",
  appId: "1:484420778418:web:884b87cbc54950af294cab",
  measurementId: "G-1BVD7P813G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


const db = getFirestore(app);

export { db };