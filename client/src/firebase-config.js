// client/src/firebase-config.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBawMYQ4bIcBKF-V-NH7--2as1AiB0FHgs",
  authDomain: "moolen-26aa2.firebaseapp.com",
  projectId: "moolen-26aa2",
  storageBucket: "moolen-26aa2.firebasestorage.app",
  messagingSenderId: "805608036908",
  appId: "1:805608036908:web:9c67e560313d752081cf89",
  measurementId: "G-WRQT7CFYWD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider(); // Untuk Google Sign-In via Firebase

export { app, auth, googleProvider };
