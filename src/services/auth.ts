import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  User,
} from 'firebase/auth';
import { auth, db } from './firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { User as ReduxUser } from '../store/slices/authSlice';

export interface UserData {
  id: string;
  name: string;
  email: string;
  department: string;
  position: string;
  location: string;
}

export const registerUser = async (
  email: string,
  password: string,
  userData: Omit<ReduxUser, 'id'>
): Promise<ReduxUser> => {
  // Gerçek API entegrasyonu için burayı güncelleyin
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: Math.random().toString(36).substr(2, 9),
        ...userData,
      });
    }, 1000);
  });
};

export const loginUser = async (
  email: string,
  password: string
): Promise<ReduxUser> => {
  // Gerçek API entegrasyonu için burayı güncelleyin
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'test@example.com' && password === 'password') {
        resolve({
          id: '1',
          name: 'Test User',
          email: 'test@example.com',
          department: 'Test Department',
          location: 'Test Location',
        });
      } else {
        reject(new Error('Geçersiz e-posta veya şifre'));
      }
    }, 1000);
  });
};

export const logoutUser = async (): Promise<void> => {
  try {
    await signOut(auth);
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email: string): Promise<void> => {
  try {
    await sendPasswordResetEmail(auth, email);
  } catch (error) {
    throw error;
  }
};

export const getCurrentUser = async (): Promise<UserData | null> => {
  try {
    const user = auth.currentUser;
    if (!user) return null;

    const userDoc = await getDoc(doc(db, 'users', user.uid));
    if (!userDoc.exists()) return null;

    return userDoc.data() as UserData;
  } catch (error) {
    throw error;
  }
}; 