import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackNavigationProp } from '../../navigation/types';

type EditProfileScreenProps = {
  navigation: AuthStackNavigationProp;
};

const EditProfileScreen = ({ navigation }: EditProfileScreenProps) => {
  const [formData, setFormData] = useState({
    name: 'Ahmet Yılmaz',
    email: 'ahmet.yilmaz@example.com',
    phone: '0555 123 4567',
    department: 'Matematik',
    institution: 'Anadolu Lisesi',
    location: 'İstanbul',
  });

  const handleSubmit = () => {
    // Form validasyonu
    if (Object.values(formData).some(value => !value)) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    // Profil güncelleme işlemi burada yapılacak
    console.log('Form data:', formData);
    navigation.goBack();
  };

  const renderInput = (
    label: string,
    value: string,
    key: keyof typeof formData,
    placeholder: string,
    keyboardType: 'default' | 'email-address' | 'phone-pad' = 'default'
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        value={value}
        onChangeText={(text) => setFormData({ ...formData, [key]: text })}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        <View style={styles.avatarContainer}>
          <View style={styles.avatar}>
            <Ionicons name="person" size={40} color="#007AFF" />
          </View>
          <TouchableOpacity style={styles.changeAvatarButton}>
            <Text style={styles.changeAvatarText}>Fotoğrafı Değiştir</Text>
          </TouchableOpacity>
        </View>

        {renderInput(
          'Ad Soyad',
          formData.name,
          'name',
          'Adınız ve soyadınız'
        )}

        {renderInput(
          'E-posta',
          formData.email,
          'email',
          'E-posta adresiniz',
          'email-address'
        )}

        {renderInput(
          'Telefon',
          formData.phone,
          'phone',
          'Telefon numaranız',
          'phone-pad'
        )}

        {renderInput(
          'Departman',
          formData.department,
          'department',
          'Branşınız/Departmanınız'
        )}

        {renderInput(
          'Kurum',
          formData.institution,
          'institution',
          'Çalıştığınız kurum'
        )}

        {renderInput(
          'Konum',
          formData.location,
          'location',
          'Bulunduğunuz şehir'
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Değişiklikleri Kaydet</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#e8f0fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  changeAvatarButton: {
    padding: 8,
  },
  changeAvatarText: {
    color: '#007AFF',
    fontSize: 16,
    fontWeight: '600',
  },
  inputContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    color: '#333',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButton: {
    backgroundColor: '#007AFF',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default EditProfileScreen; 