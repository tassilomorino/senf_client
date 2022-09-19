// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// add env keys to netlify
const firebaseConfig = {
  // apiKey: "AIzaSyB86KSs0YPJz2NEEB3UnUB5KAV_-XsuZ-M",
  // authDomain: "todo-f5d03.firebaseapp.com",
  // projectId: "todo-f5d03",
  // storageBucket: "todo-f5d03.appspot.com",
  // messagingSenderId: "962822667343",
  // appId: "1:962822667343:web:6007c78f8f5285f61a7e3a",

  apiKey: "AIzaSyBbVacMvYfdUG96Ez8UVWbXZPO3f4HnjGY",
  authDomain: "senf-dev.firebaseapp.com",
  databaseURL:
    "https://senf-dev-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "senf-dev",
  storageBucket: "senf-dev.appspot.com",
  messagingSenderId: "665148664729",
  appId: "1:665148664729:web:0cde2c0ef4fe389235c108",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
