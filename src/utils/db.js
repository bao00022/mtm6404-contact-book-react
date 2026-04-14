import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mtm6404-contact-book-rea-c6bee.firebaseapp.com",
  projectId: "mtm6404-contact-book-rea-c6bee",
  storageBucket: "mtm6404-contact-book-rea-c6bee.firebasestorage.app",
  messagingSenderId: "589370654280",
  appId: "1:589370654280:web:68df3f003dfac9df0fa27d",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
