import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getFunctions } from "firebase/functions";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAcbxd6EpnSHn6TzKAql6lSz77U_uorJKI",
  authDomain: "polychat-21aca.firebaseapp.com",
  projectId: "polychat-21aca",
  storageBucket: "polychat-21aca.appspot.com",
  messagingSenderId: "643116323491",
  appId: "1:643116323491:web:1bbeab209001a7be106516",
  measurementId: "G-7BKSYG64FJ"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const functions = getFunctions(app);

export { db, auth, functions };