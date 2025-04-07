import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackNavigationProp } from '../../navigation/types';
import { NewsItem } from '../../types';

type NewsScreenProps = {
  navigation: AuthStackNavigationProp;
};

// Örnek veri
const DUMMY_NEWS: NewsItem[] = [
  {
    id: '1',
    title: 'Yeni Becayiş Sistemi Aktif!',
    description: 'Becayiş sistemimiz artık daha kolay ve hızlı. Yeni özelliklerle tanışın.',
    image: 'https://picsum.photos/300/200',
    date: '24 Mart 2024',
    category: 'Duyuru',
  },
  {
    id: '2',
    title: 'Becayiş Başvuruları Başladı',
    description: 'İl içi ve il dışı becayiş başvuruları için son tarih 15 Nisan 2024.',
    image: 'https://picsum.photos/300/200',
    date: '23 Mart 2024',
    category: 'Başvuru',
  },
  {
    id: '3',
    title: 'Yeni Eğitim-Öğretim Yılı Planlaması',
    description: '2024-2025 eğitim öğretim yılı için becayiş planlaması açıklandı.',
    image: 'https://picsum.photos/300/200',
    date: '22 Mart 2024',
    category: 'Bilgilendirme',
  },
];

const NewsScreen = ({ navigation }: NewsScreenProps) => {
  const renderNewsItem = ({ item }: { item: NewsItem }) => (
    <TouchableOpacity
      style={styles.newsCard}
      onPress={() => console.log('Haber detayına git:', item.id)}
    >
      <Image
        source={{ uri: item.image }}
        style={styles.newsImage}
      />
      <View style={styles.newsContent}>
        <View style={styles.categoryContainer}>
          <Text style={styles.category}>{item.category}</Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={DUMMY_NEWS}
        renderItem={renderNewsItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  listContainer: {
    padding: 16,
  },
  newsCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  newsImage: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
  },
  newsContent: {
    padding: 16,
  },
  categoryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  category: {
    color: '#007AFF',
    fontSize: 14,
    fontWeight: '600',
  },
  date: {
    color: '#666',
    fontSize: 14,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default NewsScreen; 