import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

export const app = initializeApp({
  apiKey:"YOUR_KEY",
  projectId:"YOUR_ID"
});

export const auth = getAuth(app);
export const db = getFirestore(app);
