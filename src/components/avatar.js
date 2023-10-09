import { initializeApp } from "firebase/app";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "firebase/storage";

// Your web app's Firebase configuration
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

const storage = getStorage(app);

// Upload File
const uploadFile = (file) => {
  const storageRef = ref(storage, 'path/to/uploaded/file');
  
  return uploadBytes(storageRef, file).catch((error) => {
    console.error('Error uploading file: ', error);
    throw error; // Re-throw the error for further handling, if necessary
  });
};

// Download File
const downloadFile = () => {
  const storageRef = ref(storage, 'path/to/file');
  
  return getDownloadURL(storageRef).catch((error) => {
    console.error('Error getting download URL: ', error);
    throw error; // Re-throw the error for further handling, if necessary
  });
};

// Delete File
const deleteFile = () => {
  const storageRef = ref(storage, 'path/to/file');
  
  return deleteObject(storageRef).catch((error) => {
    console.error('Error deleting file: ', error);
    throw error; // Re-throw the error for further handling, if necessary
  });
};

export { uploadFile, downloadFile, deleteFile };
