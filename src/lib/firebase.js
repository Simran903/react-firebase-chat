import { initializeApp } from "firebase/app";
import{ getAuth } from "firebase/auth";
import{ getFirestore } from "firebase/firestore";
import{ getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "reactchatapp-4228d.firebaseapp.com",
  projectId: "reactchatapp-4228d",
  storageBucket: "reactchatapp-4228d.appspot.com",
  messagingSenderId: "556551957714",
  appId: "1:556551957714:web:6e4c8993a154b7c1cd510b"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth();
export const db = getFirestore();
export const storage = getStorage();