// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth';
import {getFirestore, collection as collectionRef, addDoc as addDocRef, getDoc, Firestores as docs, where as wheres ,query as querys} from 'firebase/firestore';
import {getStorage, ref, listAll, getDownloadURL, uploadBytesResumable } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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

// Initialize Firebase
const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);
export const db = getFirestore(app);
export const  collection = collectionRef
export const addDoc = addDocRef
export const where = wheres
export const query = querys
export const getDocs = docs
