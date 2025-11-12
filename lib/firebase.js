
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBqm6FT1mLeMoSnQFtRYAb0SIA2kTwHJMA",
  authDomain: "ecotrack-f34cc.firebaseapp.com",
  projectId: "ecotrack-f34cc",
  storageBucket: "ecotrack-f34cc.firebasestorage.app",
  messagingSenderId: "729566226695",
  appId: "1:729566226695:web:2f086a832966d190e23da2",
  measurementId: "G-E9NEHNG2X1"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
