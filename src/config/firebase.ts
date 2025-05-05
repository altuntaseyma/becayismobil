import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

const firebaseConfig = {
  apiKey: "AIzaSyBYs_b2yPnyliJor0eILWramc8LQEBChIw", // Web API Key
  authDomain: "becayisplatformu.firebaseapp.com",
  projectId: "becayisplatformu",
  storageBucket: "becayisplatformu.appspot.com",
  messagingSenderId: "452331817845",
  appId: "1:452331817845:web:43a204d41625662d7f213c",
  measurementId: "G-G88MJ2P23Z"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app; 