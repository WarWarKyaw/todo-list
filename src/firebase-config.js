// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { getFirestore, collection, addDoc, doc, onSnapshot, query, updateDoc, deleteDoc, orderBy } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCmjrZP-vMKV3GvizndBOvhXafhF1Qu4dM",
  authDomain: "todo-list-ad94a.firebaseapp.com",
  projectId: "todo-list-ad94a",
  storageBucket: "todo-list-ad94a.appspot.com",
  messagingSenderId: "932936909625",
  appId: "1:932936909625:web:2dd9f99b76de3a8dcc5ee8",
  measurementId: "G-917WESMSZT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { auth, signInWithEmailAndPassword, onAuthStateChanged, db, collection, addDoc, doc, onSnapshot, query, updateDoc, deleteDoc, orderBy };