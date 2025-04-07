import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../hooks/useAuth';
import { RegisterScreenProps } from '../../navigation/types';
import {
  kurumKategorileri,
  kurumlar,
  iller,
  ilceler
} from '../../constants/data';

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    kurumKategori: '',
    kurum: '',
    il: '',
    ilce: ''
  });

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [kurumListesi, setKurumListesi] = useState<string[]>([]);
  const [ilceListesi, setIlceListesi] = useState<string[]>([]);
  const { signup } = useAuth();

  useEffect(() => {
    if (formData.kurumKategori) {
      setKurumListesi(kurumlar[formData.kurumKategori] || []);
      setFormData(prev => ({ ...prev, kurum: '' }));
    }
  }, [formData.kurumKategori]);

  useEffect(() => {
    if (formData.il) {
      setIlceListesi(ilceler[formData.il] || []);
      setFormData(prev => ({ ...prev, ilce: '' }));
    }
  }, [formData.il]);

  const handleRegister = async () => {
    if (!formData.name || !formData.email || !formData.password || !formData.confirmPassword ||
        !formData.kurumKategori || !formData.kurum || !formData.il || !formData.ilce) {
      setError('Lütfen tüm alanları doldurun');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Şifreler eşleşmiyor');
      return;
    }

    if (formData.password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      await signup(formData.email, formData.password, {
        name: formData.name,
        kurumKategori: formData.kurumKategori,
        kurum: formData.kurum,
        il: formData.il,
        ilce: formData.ilce
      });
      navigation.navigate('Login');
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.logoContainer}>
          <View style={styles.iconContainer}>
            <Ionicons name="swap-horizontal" size={60} color="#007AFF" />
          </View>
          <Text style={styles.title}>Becayiş Portalı</Text>
        </View>

        <View style={styles.formContainer}>
          {error && <Text style={styles.errorText}>{error}</Text>}
          
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={formData.name}
              onChangeText={(text) => setFormData({ ...formData, name: text })}
              autoCapitalize="words"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="E-posta"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Şifre"
              value={formData.password}
              onChangeText={(text) => setFormData({ ...formData, password: text })}
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity
              style={styles.eyeIcon}
              onPress={() => setShowPassword(!showPassword)}
            >
              <Ionicons
                name={showPassword ? 'eye-outline' : 'eye-off-outline'}
                size={24}
                color="#666"
              />
            </TouchableOpacity>
          </View>

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={24} color="#666" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Şifre Tekrar"
              value={formData.confirmPassword}
              onChangeText={(text) => setFormData({ ...formData, confirmPassword: text })}
              secureTextEntry={!showPassword}
            />
          </View>

          <View style={styles.pickerContainer}>
            <Ionicons name="business-outline" size={24} color="#666" style={styles.inputIcon} />
            <Picker
              selectedValue={formData.kurumKategori}
              style={styles.picker}
              onValueChange={(itemValue: string) => setFormData({ ...formData, kurumKategori: itemValue })}
            >
              <Picker.Item label="Kurum Kategorisi Seçin" value="" />
              {kurumKategorileri.map((kategori) => (
                <Picker.Item key={kategori} label={kategori} value={kategori} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Ionicons name="business-outline" size={24} color="#666" style={styles.inputIcon} />
            <Picker
              selectedValue={formData.kurum}
              style={styles.picker}
              onValueChange={(itemValue: string) => setFormData({ ...formData, kurum: itemValue })}
              enabled={kurumListesi.length > 0}
            >
              <Picker.Item label="Kurum Seçin" value="" />
              {kurumListesi.map((kurum) => (
                <Picker.Item key={kurum} label={kurum} value={kurum} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Ionicons name="location-outline" size={24} color="#666" style={styles.inputIcon} />
            <Picker
              selectedValue={formData.il}
              style={styles.picker}
              onValueChange={(itemValue: string) => setFormData({ ...formData, il: itemValue })}
            >
              <Picker.Item label="İl Seçin" value="" />
              {iller.map((il) => (
                <Picker.Item key={il} label={il} value={il} />
              ))}
            </Picker>
          </View>

          <View style={styles.pickerContainer}>
            <Ionicons name="location-outline" size={24} color="#666" style={styles.inputIcon} />
            <Picker
              selectedValue={formData.ilce}
              style={styles.picker}
              onValueChange={(itemValue: string) => setFormData({ ...formData, ilce: itemValue })}
              enabled={ilceListesi.length > 0}
            >
              <Picker.Item label="İlçe Seçin" value="" />
              {ilceListesi.map((ilce) => (
                <Picker.Item key={ilce} label={ilce} value={ilce} />
              ))}
            </Picker>
          </View>

          <TouchableOpacity
            style={[styles.registerButton, loading && styles.disabledButton]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.registerButtonText}>
              {loading ? 'Kayıt yapılıyor...' : 'Kayıt Ol'}
            </Text>
          </TouchableOpacity>

          <View style={styles.linksContainer}>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.linkText}>Zaten hesabınız var mı? Giriş yapın</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  iconContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    paddingHorizontal: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    marginBottom: 15,
    paddingLeft: 10,
    backgroundColor: '#fff',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 50,
    fontSize: 16,
  },
  picker: {
    flex: 1,
    height: 50,
  },
  eyeIcon: {
    padding: 10,
  },
  registerButton: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  disabledButton: {
    opacity: 0.7,
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  linksContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  linkText: {
    color: '#007AFF',
    fontSize: 14,
    marginBottom: 10,
  },
  errorText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});

export default RegisterScreen; 