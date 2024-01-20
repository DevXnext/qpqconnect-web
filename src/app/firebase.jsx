// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";
const firebaseConfig = {
  apiKey: "AIzaSyDNa6g4vGbPuStWN91cM0mFsBjLcglKjYg",
  authDomain: "canmart-3b042.firebaseapp.com",
  projectId: "canmart-3b042",
  storageBucket: "canmart-3b042.appspot.com",
  messagingSenderId: "648451992770",
  appId: "1:648451992770:web:f2ac6a0f4faeaba0529f5b",
  measurementId: "G-ZQ9W4J16J4",
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);
export { app, auth, db };
