import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCIXl8zBAziXl610MX9wbFUfQvO3mwQuQo",
  authDomain: "jwss-stay.firebaseapp.com",
  projectId: "jwss-stay",
  storageBucket: "jwss-stay.firebasestorage.app",
  messagingSenderId: "839858358482",
  appId: "1:839858358482:web:429fc80577716089c1c50b",
  measurementId: "G-6HQP9HXLJR"
};

// Initialize Firebase only if it hasn't been initialized already (important for Next.js hot-reloading)
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Export the Firestore database instance
export const db = getFirestore(app);
