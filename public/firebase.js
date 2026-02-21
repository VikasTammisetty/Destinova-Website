import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyDw0K2EuZUrWMBhIE_i5gouu72MRL4eW54",
  authDomain: "destinova-72b11.firebaseapp.com",
  projectId: "destinova-72b11",
  storageBucket: "destinova-72b11.firebasestorage.app",
  messagingSenderId: "585905994072",
  appId: "1:585905994072:web:b111649e2ba9b934d30d2d",
  measurementId: "G-Q2ZMDPYHMY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
