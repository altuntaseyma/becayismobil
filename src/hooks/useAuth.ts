import { useState, useEffect, useContext } from 'react';
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
import { useAuth } from '../contexts/AuthContext';

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

export { useAuth } from '../contexts/AuthContext';

export default useAuth; 