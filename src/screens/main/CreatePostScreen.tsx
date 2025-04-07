import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../navigation/types';

type CreatePostScreenProps = {
  navigation: BottomTabNavigationProp<MainTabParamList, 'CreatePost'>;
};

export default function CreatePostScreen({ navigation }: CreatePostScreenProps) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [currentLocation, setCurrentLocation] = useState('');
  const [targetLocation, setTargetLocation] = useState('');
  const [department, setDepartment] = useState('');
  const [position, setPosition] = useState('');

  const handleCreatePost = async () => {
    // TODO: Firebase'e ilan oluştur
    console.log('Creating post:', {
      title,
      description,
      currentLocation,
      targetLocation,
      department,
      position,
    });
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Yeni Becayiş İlanı Oluştur</Text>
        
        <TextInput
          label="İlan Başlığı"
          value={title}
          onChangeText={setTitle}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Açıklama"
          value={description}
          onChangeText={setDescription}
          mode="outlined"
          style={styles.input}
          multiline
          numberOfLines={4}
        />

        <TextInput
          label="Mevcut Konum"
          value={currentLocation}
          onChangeText={setCurrentLocation}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Hedef Konum"
          value={targetLocation}
          onChangeText={setTargetLocation}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Departman"
          value={department}
          onChangeText={setDepartment}
          mode="outlined"
          style={styles.input}
        />

        <TextInput
          label="Pozisyon"
          value={position}
          onChangeText={setPosition}
          mode="outlined"
          style={styles.input}
        />

        <Button
          mode="contained"
          onPress={handleCreatePost}
          style={styles.button}
        >
          İlanı Yayınla
        </Button>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    marginBottom: 16,
  },
  button: {
    marginTop: 8,
    marginBottom: 24,
  },
}); 