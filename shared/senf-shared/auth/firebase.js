import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  // apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  // authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  // databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  // projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
  // storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
  // messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  // appId: import.meta.env.VITE_FIREBASE_APP_ID,
  apiKey: "AIzaSyBbVacMvYfdUG96Ez8UVWbXZPO3f4HnjGY",
  authDomain: "senf-dev.firebaseapp.com",
  databaseURL:
    "https://senf-dev-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "senf-dev",
  storageBucket: "senf-dev.appspot.com",
  messagingSenderId: "665148664729",
  appId: "1:665148664729:web:0cde2c0ef4fe389235c108",
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const performance = getPerformance(firebaseApp);

export default firebaseApp;
export { auth, db };
