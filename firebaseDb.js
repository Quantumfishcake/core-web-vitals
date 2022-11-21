import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


// See: https://firebase.google.com/docs/web/learn-more#config-object
const firebaseConfig = {
    apiKey: "AIzaSyBLCnC7SKByIeoJgfZZiYwQK52B1g6beY4",
    authDomain: "corewebvitals-30437.firebaseapp.com",
    projectId: "corewebvitals-30437",
    storageBucket: "corewebvitals-30437.appspot.com",
    messagingSenderId: "514585926270",
    appId: "1:514585926270:web:0c82ccb50a830dcee8562f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Cloud Storage and get a reference to the service
export const storage = getStorage(app);
