// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// add env keys to netlify
const firebaseConfig = {
  /*  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID, */

  apiKey: "AIzaSyBNbqD70Fs1RLOt_7LDch9_IB8bKiuh63k",

  authDomain: "smiling-foundry-254822.firebaseapp.com",

  projectId: "smiling-foundry-254822",

  storageBucket: "smiling-foundry-254822.appspot.com",

  messagingSenderId: "788864565485",

  appId: "1:788864565485:web:91b32eff27c6c80cb40ce4",

  measurementId: "G-Z535E81YJD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
