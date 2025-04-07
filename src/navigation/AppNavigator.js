import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { LoginScreen } from '../screens/LoginScreen';
import { RegisterScreen } from '../screens/RegisterScreen';
import { useAuthContext } from '../contexts/AuthContext';

const Stack = createNativeStackNavigator();

export const AppNavigator = () => {
  const { user, loading } = useAuthContext();

  if (loading) {
    // Burada bir loading ekranı gösterilebilir
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!user ? (
          // Auth ekranları
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
          </>
        ) : (
          // Ana uygulama ekranları
          <>
            {/* Burada diğer ekranlar eklenecek */}
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}; 