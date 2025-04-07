import { useState, useEffect } from 'react';
import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  User as FirebaseUser
} from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

interface UserData {
  name: string;
  kurumKategori: string;
  kurum: string;
  il: string;
  ilce: string;
}

export interface User extends FirebaseUser {
  uid: string;
  email: string | null;
  displayName: string | null;
}

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user as User);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const signup = async (email: string, password: string, userData: UserData) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      await updateProfile(user, {
        displayName: userData.name
      });

      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, {
        name: userData.name,
        email: user.email,
        kurumKategori: userData.kurumKategori,
        kurum: userData.kurum,
        il: userData.il,
        ilce: userData.ilce,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return user;
    } catch (error) {
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      throw error;
    }
  };

  return {
    user,
    loading,
    signup,
    login,
    logout
  };
};

export default useAuth; 