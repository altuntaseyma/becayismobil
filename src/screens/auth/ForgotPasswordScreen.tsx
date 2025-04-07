import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text, HelperText } from 'react-native-paper';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AuthStackParamList } from '../../navigation/types';
import { resetPassword } from '../../services/auth';

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

export default function ForgotPasswordScreen({ navigation }: ForgotPasswordScreenProps) {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleResetPassword = async () => {
    if (!email) {
      setError('Lütfen e-posta adresinizi girin');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(false);
      await resetPassword(email);
      setSuccess(true);
    } catch (err: any) {
      setError(err.message || 'Şifre sıfırlama işlemi başarısız oldu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Şifre Sıfırlama</Text>
      <Text style={styles.description}>
        Kayıtlı e-posta adresinizi girin, şifre sıfırlama bağlantısı gönderelim.
      </Text>
      <TextInput
        label="E-posta"
        value={email}
        onChangeText={setEmail}
        mode="outlined"
        style={styles.input}
        keyboardType="email-address"
        autoCapitalize="none"
        disabled={loading}
      />
      {error && (
        <HelperText type="error" visible={!!error}>
          {error}
        </HelperText>
      )}
      {success && (
        <HelperText type="info" visible={success}>
          Şifre sıfırlama bağlantısı e-posta adresinize gönderildi.
        </HelperText>
      )}
      <Button
        mode="contained"
        onPress={handleResetPassword}
        style={styles.button}
        loading={loading}
        disabled={loading}
      >
        Şifre Sıfırlama Bağlantısı Gönder
      </Button>
      <Button
        mode="text"
        onPress={() => navigation.navigate('Login')}
        style={styles.button}
        disabled={loading}
      >
        Giriş Ekranına Dön
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
  },
  description: {
    textAlign: 'center',
    marginBottom: 30,
    color: '#666',
  },
  input: {
    marginBottom: 15,
  },
  button: {
    marginTop: 10,
  },
}); 