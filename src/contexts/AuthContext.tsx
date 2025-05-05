import React, { createContext, useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { auth, db } from '../config/firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

interface UserData {
  displayName: string;
  kurumKategori: string;
  kurum: string;
  il: string;
  ilce: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected';
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  register: (email: string, password: string, userData: UserData) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  getUserData: () => Promise<UserData | null>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email: string, password: string, userData: UserData) => {
    try {
      const { user } = await createUserWithEmailAndPassword(auth, email, password);
      
      await setDoc(doc(db, 'users', user.uid), {
        ...userData,
        email,
        createdAt: new Date().toISOString(),
      });
    } catch (error: any) {
      let message = 'Kayıt sırasında bir hata oluştu';
      if (error.code === 'auth/email-already-in-use') {
        message = 'Bu e-posta adresi zaten kullanımda';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Geçersiz e-posta adresi';
      } else if (error.code === 'auth/weak-password') {
        message = 'Şifre en az 6 karakter olmalıdır';
      }
      Alert.alert('Hata', message);
      throw error;
    }
  };

  const login = async (email: string, password: string) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      let message = 'Giriş yapılırken bir hata oluştu';
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
        message = 'E-posta veya şifre hatalı';
      } else if (error.code === 'auth/invalid-email') {
        message = 'Geçersiz e-posta adresi';
      }
      Alert.alert('Hata', message);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu');
      throw error;
    }
  };

  const getUserData = async () => {
    if (!user) return null;

    try {
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        return docSnap.data() as UserData;
      }
      return null;
    } catch (error) {
      Alert.alert('Hata', 'Kullanıcı bilgileri alınırken bir hata oluştu');
      return null;
    }
  };

  const value = {
    user,
    loading,
    register,
    login,
    logout,
    getUserData,
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export default AuthContext; 