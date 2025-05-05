import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { useAuth } from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';
import { RegisterScreenProps } from '../../navigation/types';
import { kurumKategorileri, kurumlar, iller, ilceler } from '../../constants/data';
import { List, Divider } from 'react-native-paper';

const RegisterScreen = ({ navigation }: RegisterScreenProps) => {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    displayName: '',
    email: '',
    password: '',
    passwordConfirm: '',
    kurumKategori: '',
    kurum: '',
    il: '',
    ilce: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [filteredKurumlar, setFilteredKurumlar] = useState<string[]>([]);
  const [filteredIlceler, setFilteredIlceler] = useState<string[]>([]);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    if (formData.kurumKategori) {
      setFilteredKurumlar(kurumlar[formData.kurumKategori] || []);
      setFormData(prev => ({ ...prev, kurum: '' }));
    }
  }, [formData.kurumKategori]);

  useEffect(() => {
    if (formData.il) {
      setFilteredIlceler(ilceler[formData.il] || []);
      setFormData(prev => ({ ...prev, ilce: '' }));
    }
  }, [formData.il]);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.displayName) {
      newErrors.displayName = 'Ad Soyad zorunludur';
    }

    if (!formData.email) {
      newErrors.email = 'E-posta zorunludur';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Geçerli bir e-posta adresi giriniz';
    }

    if (!formData.password) {
      newErrors.password = 'Şifre zorunludur';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Şifre en az 6 karakter olmalıdır';
    }

    if (formData.password !== formData.passwordConfirm) {
      newErrors.passwordConfirm = 'Şifreler eşleşmiyor';
    }

    if (!formData.kurumKategori) {
      newErrors.kurumKategori = 'Kurum kategorisi seçiniz';
    }

    if (!formData.kurum) {
      newErrors.kurum = 'Kurum seçiniz';
    }

    if (!formData.il) {
      newErrors.il = 'İl seçiniz';
    }

    if (!formData.ilce) {
      newErrors.ilce = 'İlçe seçiniz';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      await register(formData.email, formData.password, {
        displayName: formData.displayName,
        kurumKategori: formData.kurumKategori,
        kurum: formData.kurum,
        il: formData.il,
        ilce: formData.ilce,
        isVerified: false,
        verificationStatus: 'pending'
      });
      Alert.alert('Başarılı', 'Hesabınız oluşturuldu. Lütfen e-posta adresinizi doğrulayın.');
      navigation.replace('Login');
    } catch (error: any) {
      Alert.alert('Hata', error.message || 'Kayıt sırasında bir hata oluştu');
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.iconContainer}>
            <Ionicons name="swap-horizontal" size={60} color="#007AFF" />
          </View>
          <Text style={styles.title}>Becayiş Portalı</Text>
        </View>

        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Ionicons name="person-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={formData.displayName}
              onChangeText={(text) => setFormData({ ...formData, displayName: text })}
            />
          </View>
          {errors.displayName && <Text style={styles.errorText}>{errors.displayName}</Text>}

          <View style={styles.inputContainer}>
            <Ionicons name="mail-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="E-posta"
              value={formData.email}
              onChangeText={(text) => setFormData({ ...formData, email: text })}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
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
                size={20}
                color="#666"
              />
            </TouchableOpacity>
          </View>
          {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

          <View style={styles.inputContainer}>
            <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.icon} />
            <TextInput
              style={styles.input}
              placeholder="Şifre Tekrar"
              value={formData.passwordConfirm}
              onChangeText={(text) => setFormData({ ...formData, passwordConfirm: text })}
              secureTextEntry={!showPassword}
            />
          </View>
          {errors.passwordConfirm && <Text style={styles.errorText}>{errors.passwordConfirm}</Text>}

          {/* Kurum Kategorisi Dropdown */}
          <List.Accordion
            title={formData.kurumKategori || 'Kurum Kategorisi Seçin'}
            expanded={openDropdown === 'kurumKategori'}
            onPress={() => setOpenDropdown(openDropdown === 'kurumKategori' ? null : 'kurumKategori')}
            style={{ ...styles.inputContainer, borderColor: errors.kurumKategori ? 'red' : '#ddd', marginBottom: 5 }}
            titleStyle={{ color: formData.kurumKategori ? '#333' : '#aaa', fontSize: 16 }}
          >
            {kurumKategorileri.map((item) => (
              <List.Item
                key={item}
                title={item}
                onPress={() => {
                  setFormData({ ...formData, kurumKategori: item, kurum: '' });
                  setOpenDropdown(null);
                }}
              />
            ))}
          </List.Accordion>
          {errors.kurumKategori && <Text style={styles.errorText}>{errors.kurumKategori}</Text>}
          <Divider />

          {/* Kurum Dropdown */}
          <List.Accordion
            title={formData.kurum || 'Kurum Seçin'}
            expanded={openDropdown === 'kurum'}
            onPress={() => setOpenDropdown(openDropdown === 'kurum' ? null : 'kurum')}
            style={{ ...styles.inputContainer, borderColor: errors.kurum ? 'red' : '#ddd', marginBottom: 5, opacity: formData.kurumKategori ? 1 : 0.5 }}
            titleStyle={{ color: formData.kurum ? '#333' : '#aaa', fontSize: 16 }}
            disabled={!formData.kurumKategori}
          >
            {filteredKurumlar.map((item) => (
              <List.Item
                key={item}
                title={item}
                onPress={() => {
                  setFormData({ ...formData, kurum: item });
                  setOpenDropdown(null);
                }}
              />
            ))}
          </List.Accordion>
          {errors.kurum && <Text style={styles.errorText}>{errors.kurum}</Text>}
          <Divider />

          {/* İl Dropdown */}
          <List.Accordion
            title={formData.il || 'İl Seçin'}
            expanded={openDropdown === 'il'}
            onPress={() => setOpenDropdown(openDropdown === 'il' ? null : 'il')}
            style={{ ...styles.inputContainer, borderColor: errors.il ? 'red' : '#ddd', marginBottom: 5 }}
            titleStyle={{ color: formData.il ? '#333' : '#aaa', fontSize: 16 }}
          >
            {iller.map((item) => (
              <List.Item
                key={item}
                title={item}
                onPress={() => {
                  setFormData({ ...formData, il: item, ilce: '' });
                  setOpenDropdown(null);
                }}
              />
            ))}
          </List.Accordion>
          {errors.il && <Text style={styles.errorText}>{errors.il}</Text>}
          <Divider />

          {/* İlçe Dropdown */}
          <List.Accordion
            title={formData.ilce || 'İlçe Seçin'}
            expanded={openDropdown === 'ilce'}
            onPress={() => setOpenDropdown(openDropdown === 'ilce' ? null : 'ilce')}
            style={{ ...styles.inputContainer, borderColor: errors.ilce ? 'red' : '#ddd', marginBottom: 5, opacity: formData.il ? 1 : 0.5 }}
            titleStyle={{ color: formData.ilce ? '#333' : '#aaa', fontSize: 16 }}
            disabled={!formData.il}
          >
            {filteredIlceler.map((item) => (
              <List.Item
                key={item}
                title={item}
                onPress={() => {
                  setFormData({ ...formData, ilce: item });
                  setOpenDropdown(null);
                }}
              />
            ))}
          </List.Accordion>
          {errors.ilce && <Text style={styles.errorText}>{errors.ilce}</Text>}
          <Divider />

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleRegister}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Kayıt Yapılıyor...' : 'Kayıt Ol'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.loginLink}
            onPress={() => navigation.navigate('Login')}
          >
            <Text style={styles.loginText}>
              Zaten hesabınız var mı? Giriş yapın
            </Text>
          </TouchableOpacity>
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
  scrollView: {
    flex: 1,
  },
  header: {
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
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
    marginBottom: 20,
  },
  form: {
    padding: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 10,
    backgroundColor: '#f8f9fa',
    height: 50,
  },
  pickerContainer: {
    marginBottom: 5,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    height: '100%',
  },
  eyeIcon: {
    padding: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
    marginLeft: 5,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginLink: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 30,
  },
  loginText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default RegisterScreen; 