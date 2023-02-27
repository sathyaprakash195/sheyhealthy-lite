import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNeZnel839fXRwkEcMWFI7ZQGt2wEtmmY",
  authDomain: "sheyhealthy-lite.firebaseapp.com",
  projectId: "sheyhealthy-lite",
  storageBucket: "sheyhealthy-lite.appspot.com",
  messagingSenderId: "1035820909890",
  appId: "1:1035820909890:web:9bc7beda9301359d7234db",
  measurementId: "G-TKW0LJ3XRX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const firestoreDatabase = getFirestore(app);

export default firestoreDatabase;
