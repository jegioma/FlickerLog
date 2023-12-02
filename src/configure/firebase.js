// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signOut as signOutRef } from 'firebase/auth';
import {
  getFirestore,
  collection as collectionRef,
  addDoc as addDocRef,
  getDocs as getDocsRef,
  getDoc as getDocRef,
  where as whereRef,
  query as queryRef,
  doc as docRef,
  updateDoc as updateDocRef,
  deleteDoc as deleteDocRef,
  or as orRef,
} from 'firebase/firestore';

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAOajV_OTXOJwyEL7iOOknO5VRIryXy5iU",
  authDomain: "flicklog-980df.firebaseapp.com",
  databaseURL: "https://flicklog-980df-default-rtdb.firebaseio.com",
  projectId: "flicklog-980df",
  storageBucket: "flicklog-980df.appspot.com",
  messagingSenderId: "568355853466",
  appId: "1:568355853466:web:24cd84dcf7dc8c036ffb23",
  measurementId: "G-JBHQJ7W5D5"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const collection = collectionRef;
export const addDoc = addDocRef;
export const getDocs = getDocsRef;
export const where = whereRef;
export const query = queryRef;
export const doc = docRef;
export const getDoc = getDocRef;
export const updateDoc = updateDocRef;
export const deleteDoc = deleteDocRef;
export const or = orRef;

// Export the signOut function
export const signOut = signOutRef;