// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDQcLoXSrK56MZJ3FyPzP2ejU6CiTl6uxc",
  authDomain: "facebook-next-clone-01-10-22.firebaseapp.com",
  projectId: "facebook-next-clone-01-10-22",
  storageBucket: "facebook-next-clone-01-10-22.appspot.com",
  messagingSenderId: "710929912407",
  appId: "1:710929912407:web:fe23f6548af1260f708912",
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };
