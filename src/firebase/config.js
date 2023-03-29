import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAa1Mq9Jw_ZnwxvO005k2OtJVDT6tYOKxA",
  authDomain: "super-list-firebase.firebaseapp.com",
  projectId: "super-list-firebase",
  storageBucket: "super-list-firebase.appspot.com",
  messagingSenderId: "598212174719",
  appId: "1:598212174719:web:2516855fbebdb0263cb04a",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
