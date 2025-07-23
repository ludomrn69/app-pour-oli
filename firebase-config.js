// firebase-config.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  // Remplace par tes vraies clés Firebase
  apiKey: "ton-api-key",
  authDomain: "app-pour-oli.firebaseapp.com",
  projectId: "app-pour-oli",
  storageBucket: "app-pour-oli.appspot.com",
  messagingSenderId: "123456789",
  appId: "ton-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;