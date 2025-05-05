import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Text,
  Textarea,
  VStack,
  HStack,
  IconButton,
  useToast,
} from '@chakra-ui/react';
import { AddIcon, CloseIcon } from '@chakra-ui/icons';
import { collection, addDoc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ExchangeRequest } from '../types/database';
import { useAuth } from '../hooks/useAuth';

export const ExchangeRequestForm: React.FC = () => {
  const { user } = useAuth();
  const toast = useToast();
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
      toast({
        title: 'Hata',
        description: 'Oturum açmanız gerekiyor.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }

    // Form validasyonu
    if (!formData.currentCity || !formData.currentDistrict || !formData.institution || 
        !formData.department || !formData.position || formData.targetCities.some(city => !city.il || !city.ilce)) {
      toast({
        title: 'Hata',
        description: 'Lütfen tüm zorunlu alanları doldurun.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
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
      
      toast({
        title: 'Başarılı',
        description: 'Becayiş talebiniz başarıyla oluşturuldu.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });

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
      toast({
        title: 'Hata',
        description: 'Becayiş talebi oluşturulurken bir hata oluştu.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box maxW="800px" mx="auto" p={6}>
      <VStack spacing={6} align="stretch">
        <Text fontSize="2xl" fontWeight="bold">Becayiş Talebi Oluştur</Text>

        <FormControl isRequired>
          <FormLabel>Mevcut İl</FormLabel>
          <Input
            value={formData.currentCity}
            onChange={(e) => setFormData(prev => ({ ...prev, currentCity: e.target.value }))}
            placeholder="Mevcut ilinizi girin"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Mevcut İlçe</FormLabel>
          <Input
            value={formData.currentDistrict}
            onChange={(e) => setFormData(prev => ({ ...prev, currentDistrict: e.target.value }))}
            placeholder="Mevcut ilçenizi girin"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Hedef İller</FormLabel>
          <Stack spacing={4}>
            {formData.targetCities.map((city, index) => (
              <HStack key={index}>
                <Input
                  value={city.il}
                  onChange={(e) => updateTargetCity(index, 'il', e.target.value)}
                  placeholder="İl"
                />
                <Input
                  value={city.ilce}
                  onChange={(e) => updateTargetCity(index, 'ilce', e.target.value)}
                  placeholder="İlçe"
                />
                {index > 0 && (
                  <IconButton
                    aria-label="Hedef ili sil"
                    icon={<CloseIcon />}
                    onClick={() => handleRemoveTargetCity(index)}
                    colorScheme="red"
                  />
                )}
              </HStack>
            ))}
            <Button
              leftIcon={<AddIcon />}
              onClick={handleAddTargetCity}
              colorScheme="blue"
              variant="outline"
            >
              Hedef İl Ekle
            </Button>
          </Stack>
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Kurum</FormLabel>
          <Input
            value={formData.institution}
            onChange={(e) => setFormData(prev => ({ ...prev, institution: e.target.value }))}
            placeholder="Kurumunuzu girin"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Departman</FormLabel>
          <Input
            value={formData.department}
            onChange={(e) => setFormData(prev => ({ ...prev, department: e.target.value }))}
            placeholder="Departmanınızı girin"
          />
        </FormControl>

        <FormControl isRequired>
          <FormLabel>Pozisyon</FormLabel>
          <Input
            value={formData.position}
            onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
            placeholder="Pozisyonunuzu girin"
          />
        </FormControl>

        <FormControl>
          <FormLabel>Notlar (Opsiyonel)</FormLabel>
          <Textarea
            value={formData.notes}
            onChange={(e) => setFormData(prev => ({ ...prev, notes: e.target.value }))}
            placeholder="Eklemek istediğiniz notları girin"
            size="sm"
          />
        </FormControl>

        <Button
          colorScheme="green"
          size="lg"
          onClick={handleSubmit}
          isLoading={loading}
        >
          Talebi Oluştur
        </Button>
      </VStack>
    </Box>
  );
}; 