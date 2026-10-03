import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "ai-interview-4f139.firebaseapp.com",
  projectId: "ai-interview-4f139",
  storageBucket: "ai-interview-4f139.firebasestorage.app",
  messagingSenderId: "693912928085",
  appId: "1:693912928085:web:e046d1db991901be74b9dc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const provider = new GoogleAuthProvider();
