import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ExchangeRequest } from '../types/database';
import { useAuth } from '../hooks/useAuth';
import { db } from '../config/firebase';
import { collection, addDoc, Timestamp } from 'firebase/firestore';

export const ExchangeRequestForm: React.FC = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    currentCity: '',
    currentDistrict: '',
    targetCities: [{ il: '', ilce: '', priority: 1 }],
    institution: '',
    department: '',
    position: '',
    notes: ''
  });

  const handleAddTargetCity = () => {
    setFormData(prev => ({
      ...prev,
      targetCities: [
        ...prev.targetCities,
        { il: '', ilce: '', priority: prev.targetCities.length + 1 }
      ]
    }));
  };

  const handleRemoveTargetCity = (index: number) => {
    setFormData(prev => ({
      ...prev,
      targetCities: prev.targetCities.filter((_, i) => i !== index)
    }));
  };

  const updateTargetCity = (index: number, field: 'il' | 'ilce', value: string) => {
    setFormData(prev => ({
      ...prev,
      targetCities: prev.targetCities.map((city, i) =>
        i === index ? { ...city, [field]: value } : city
      )
    }));
  };

  const handleSubmit = async () => {
    if (!user) {
      Alert.alert('Hata', 'Oturum açmanız gerekiyor.');
      return;
    }

    // Form validasyonu
    if (!formData.currentCity || !formData.currentDistrict || !formData.institution || 
        !formData.department || !formData.position || formData.targetCities.some(city => !city.il || !city.ilce)) {
      Alert.alert('Hata', 'Lütfen tüm zorunlu alanları doldurun.');
      return;
    }

    setLoading(true);

    try {
      const exchangeRequest: Omit<ExchangeRequest, 'id'> = {
        userId: user.uid,
        currentCity: formData.currentCity,
        currentDistrict: formData.currentDistrict,
        targetCities: formData.targetCities,
        institution: formData.institution,
        department: formData.department,
        position: formData.position,
        notes: formData.notes,
        isActive: true,
        documents: [],
        matches: [],
        createdAt: Timestamp.now() as any,
        updatedAt: Timestamp.now() as any
      };

      await addDoc(collection(db, 'exchangeRequests'), exchangeRequest);
      Alert.alert('Başarılı', 'Becayiş talebiniz başarıyla oluşturuldu.');
      
      // Formu sıfırla
      setFormData({
        currentCity: '',
        currentDistrict: '',
        targetCities: [{ il: '', ilce: '', priority: 1 }],
        institution: '',
        department: '',
        position: '',
        notes: ''
      });
    } catch (error) {
      console.error('Error creating exchange request:', error);
      Alert.alert('Hata', 'Becayiş talebi oluşturulurken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>Becayiş Talebi Oluştur</Text>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mevcut İl</Text>
        <TextInput
          style={styles.input}
          value={formData.currentCity}
          onChangeText={(text) => setFormData(prev => ({ ...prev, currentCity: text }))}
          placeholder="Mevcut ilinizi girin"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Mevcut İlçe</Text>
        <TextInput
          style={styles.input}
          value={formData.currentDistrict}
          onChangeText={(text) => setFormData(prev => ({ ...prev, currentDistrict: text }))}
          placeholder="Mevcut ilçenizi girin"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Hedef İller</Text>
        {formData.targetCities.map((city, index) => (
          <View key={index} style={styles.targetCityContainer}>
            <TextInput
              style={[styles.input, styles.targetCityInput]}
              value={city.il}
              onChangeText={(text) => updateTargetCity(index, 'il', text)}
              placeholder="İl"
            />
            <TextInput
              style={[styles.input, styles.targetCityInput]}
              value={city.ilce}
              onChangeText={(text) => updateTargetCity(index, 'ilce', text)}
              placeholder="İlçe"
            />
            {index > 0 && (
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveTargetCity(index)}
              >
                <Text style={styles.removeButtonText}>X</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
        <TouchableOpacity style={styles.addButton} onPress={handleAddTargetCity}>
          <Text style={styles.addButtonText}>+ Hedef İl Ekle</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Kurum</Text>
        <TextInput
          style={styles.input}
          value={formData.institution}
          onChangeText={(text) => setFormData(prev => ({ ...prev, institution: text }))}
          placeholder="Kurumunuzu girin"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Departman</Text>
        <TextInput
          style={styles.input}
          value={formData.department}
          onChangeText={(text) => setFormData(prev => ({ ...prev, department: text }))}
          placeholder="Departmanınızı girin"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Pozisyon</Text>
        <TextInput
          style={styles.input}
          value={formData.position}
          onChangeText={(text) => setFormData(prev => ({ ...prev, position: text }))}
          placeholder="Pozisyonunuzu girin"
        />
      </View>

      <View style={styles.formGroup}>
        <Text style={styles.label}>Notlar (Opsiyonel)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          value={formData.notes}
          onChangeText={(text) => setFormData(prev => ({ ...prev, notes: text }))}
          placeholder="Eklemek istediğiniz notları girin"
          multiline
          numberOfLines={4}
        />
      </View>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Talebi Oluştur</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#333',
  },
  formGroup: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: '#333',
    fontWeight: '500',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#ddd',
    fontSize: 16,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  targetCityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  targetCityInput: {
    flex: 1,
    marginRight: 8,
  },
  removeButton: {
    backgroundColor: '#ff3b30',
    borderRadius: 16,
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  removeButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#007aff',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
    marginTop: 8,
  },
  addButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  submitButton: {
    backgroundColor: '#34c759',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 16,
    marginBottom: 32,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 