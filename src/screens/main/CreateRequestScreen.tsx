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

type CreateRequestScreenProps = {
  navigation: AuthStackNavigationProp;
};

const CreateRequestScreen = ({ navigation }: CreateRequestScreenProps) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fromLocation: '',
    toLocation: '',
    department: '',
    institution: '',
  });

  const handleSubmit = () => {
    // Form validasyonu
    if (Object.values(formData).some(value => !value)) {
      Alert.alert('Hata', 'Lütfen tüm alanları doldurun.');
      return;
    }

    // Form gönderme işlemi burada yapılacak
    console.log('Form data:', formData);
    navigation.goBack();
  };

  const renderInput = (
    label: string,
    value: string,
    key: keyof typeof formData,
    placeholder: string,
    multiline: boolean = false
  ) => (
    <View style={styles.inputContainer}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, multiline && styles.textArea]}
        value={value}
        onChangeText={(text) => setFormData({ ...formData, [key]: text })}
        placeholder={placeholder}
        multiline={multiline}
        numberOfLines={multiline ? 4 : 1}
      />
    </View>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.content}>
        {renderInput(
          'Başlık',
          formData.title,
          'title',
          'Becayiş talebiniz için başlık girin'
        )}

        {renderInput(
          'Açıklama',
          formData.description,
          'description',
          'Becayiş talebiniz hakkında detaylı bilgi verin',
          true
        )}

        {renderInput(
          'Mevcut Konum',
          formData.fromLocation,
          'fromLocation',
          'Şu anki görev yeriniz'
        )}

        {renderInput(
          'İstenen Konum',
          formData.toLocation,
          'toLocation',
          'Gitmek istediğiniz yer'
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
          'Çalıştığınız kurum türü'
        )}

        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Talebi Oluştur</Text>
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
  textArea: {
    height: 120,
    textAlignVertical: 'top',
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

export default CreateRequestScreen; 