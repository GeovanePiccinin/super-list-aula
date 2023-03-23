import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";

import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyASifaKAYWPcQhnNeygJ1I_cfEEqnJd6GY",
  authDomain: "todo-list-1-81e55.firebaseapp.com",
  projectId: "todo-list-1-81e55",
  storageBucket: "todo-list-1-81e55.appspot.com",
  messagingSenderId: "665997667465",
  appId: "1:665997667465:web:e1bfb096b99bc75ea4aa58",
  measurementId: "G-85P4J6DT81",
};

const app = firebase.initializeApp(firebaseConfig);

export const auth = getAuth(app);

export default app;
