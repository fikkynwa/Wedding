import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAchsdJMsVXr3Zi8RD_JHEuLPV9ihKjFjI",
  authDomain: "akim-asyiqim.firebaseapp.com",
  projectId: "akim-asyiqim",
  storageBucket: "akim-asyiqim.firebasestorage.app",
  messagingSenderId: "449223201497",
  appId: "1:449223201497:web:508177c7502c3d57bae4c8",
  measurementId: "G-89QZ91MSPD"
};

// Initialize Firebase
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
export const db = getFirestore(app);
export default app;
