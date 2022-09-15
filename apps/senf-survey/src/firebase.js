import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getPerformance } from "firebase/performance";

const firebaseConfig = {
  apiKey: "AIzaSyB86KSs0YPJz2NEEB3UnUB5KAV_-XsuZ-M",
  authDomain: "todo-f5d03.firebaseapp.com",
  projectId: "todo-f5d03",
  storageBucket: "todo-f5d03.appspot.com",
  messagingSenderId: "962822667343",
  appId: "1:962822667343:web:6007c78f8f5285f61a7e3a"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const performance = getPerformance(firebaseApp);

export default firebaseApp;
export { auth, db };
