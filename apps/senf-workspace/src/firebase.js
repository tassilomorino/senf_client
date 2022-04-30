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

  apiKey: "AIzaSyB4SvrQ5QZ61K9jGEv0KbCDtKo8bCRtb2c",
  authDomain: "senf-chat.firebaseapp.com",
  databaseURL:
    "https://senf-chat-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "senf-chat",
  storageBucket: "senf-chat.appspot.com",
  messagingSenderId: "625175372028",
  appId: "1:625175372028:web:a9cb8092f08d2dd9543779",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
