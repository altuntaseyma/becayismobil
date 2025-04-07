import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

// Firebase yapılandırma bilgileri
const firebaseConfig = {
  apiKey: "AIzaSyBYs_b2yPnyliJor0eILWramc8LQEBChIw",
  authDomain: "becayisplatformu.firebaseapp.com",
  databaseURL: "https://becayisplatformu-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "becayisplatformu",
  storageBucket: "becayisplatformu.firebasestorage.app",
  messagingSenderId: "452331817845",
  appId: "1:452331817845:web:43a204d41625662d7f213c",
  measurementId: "G-G88MJ2P23Z"
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Servisleri dışa aktar
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 