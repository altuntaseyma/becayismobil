import React, { useEffect } from 'react';
import * as Notifications from 'expo-notifications';
import { getAuth } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { db } from './services/firebase';
import AppNavigator from './navigation/AppNavigator';

const App = () => {
  useEffect(() => {
    const registerForPushNotifications = async () => {
      try {
        const { status: existingStatus } = await Notifications.getPermissionsAsync();
        let finalStatus = existingStatus;
        if (existingStatus !== 'granted') {
          const { status } = await Notifications.requestPermissionsAsync();
          finalStatus = status;
        }
        if (finalStatus !== 'granted') {
          return;
        }
        const tokenData = await Notifications.getExpoPushTokenAsync();
        const token = tokenData.data;
        const auth = getAuth();
        const user = auth.currentUser;
        if (user && token) {
          await setDoc(doc(db, 'users', user.uid), { expoPushToken: token }, { merge: true });
        }
      } catch (error) {
        console.log('Push notification kaydı başarısız:', error);
      }
    };
    registerForPushNotifications();
  }, []);

  return <AppNavigator />;
};

export default App; 