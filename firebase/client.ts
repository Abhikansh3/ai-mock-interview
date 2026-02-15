// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBXOz-mPNmkl9tZ_ZHvVKWEQk9Rfd-Cvyg",
  authDomain: "prepwise-d287c.firebaseapp.com",
  projectId: "prepwise-d287c",
  storageBucket: "prepwise-d287c.firebasestorage.app",
  messagingSenderId: "939240233216",
  appId: "1:939240233216:web:813bfadc32e71da49e7be5",
  measurementId: "G-4ZRBV491TN"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
