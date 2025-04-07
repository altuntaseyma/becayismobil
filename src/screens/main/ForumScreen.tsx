import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackNavigationProp } from '../../navigation/types';
import { ForumPost } from '../../types';

type ForumScreenProps = {
  navigation: AuthStackNavigationProp;
};

// Örnek veri
const DUMMY_POSTS: ForumPost[] = [
  {
    id: '1',
    title: 'Becayiş Deneyimleriniz',
    content: 'Becayiş sürecinde yaşadığınız deneyimleri paylaşır mısınız?',
    author: 'Ahmet Y.',
    date: '24 Mart 2024',
    likes: 15,
    comments: 8,
    tags: ['deneyim', 'becayiş', 'süreç'],
  },
  {
    id: '2',
    title: 'İl Dışı Becayiş İmkanları',
    content: 'İl dışı becayiş için hangi şartlar gerekiyor?',
    author: 'Ayşe K.',
    date: '23 Mart 2024',
    likes: 10,
    comments: 5,
    tags: ['il dışı', 'şartlar'],
  },
  {
    id: '3',
    title: 'Yeni Düzenlemeler Hakkında',
    content: 'Becayiş sistemindeki yeni düzenlemeler nasıl olacak?',
    author: 'Mehmet S.',
    date: '22 Mart 2024',
    likes: 20,
    comments: 12,
    tags: ['düzenleme', 'yenilik'],
  },
];

const ForumScreen = ({ navigation }: ForumScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const renderPost = ({ item }: { item: ForumPost }) => (
    <TouchableOpacity
      style={styles.postCard}
      onPress={() => console.log('Post detayına git:', item.id)}
    >
      <View style={styles.postHeader}>
        <Text style={styles.postTitle}>{item.title}</Text>
        <Text style={styles.postAuthor}>{item.author}</Text>
      </View>
      <Text style={styles.postContent} numberOfLines={2}>
        {item.content}
      </Text>
      <View style={styles.tagsContainer}>
        {item.tags.map((tag: string) => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
      <View style={styles.postFooter}>
        <Text style={styles.postDate}>{item.date}</Text>
        <View style={styles.interactions}>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="heart-outline" size={20} color="#666" />
            <Text style={styles.interactionText}>{item.likes}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.interactionButton}>
            <Ionicons name="chatbubble-outline" size={20} color="#666" />
            <Text style={styles.interactionText}>{item.comments}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* Arama Çubuğu */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Forum içinde ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Post Listesi */}
      <FlatList
        data={DUMMY_POSTS}
        renderItem={renderPost}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* Yeni Post Butonu */}
      <TouchableOpacity
        style={styles.fab}
        onPress={() => console.log('Yeni gönderi oluştur')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 10,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  listContainer: {
    padding: 16,
  },
  postCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  postHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    flex: 1,
  },
  postAuthor: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  postContent: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 8,
  },
  tagsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginBottom: 8,
  },
  tag: {
    backgroundColor: '#e8f0fe',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginRight: 8,
    marginBottom: 4,
  },
  tagText: {
    color: '#1a73e8',
    fontSize: 12,
  },
  postFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  postDate: {
    fontSize: 12,
    color: '#666',
  },
  interactions: {
    flexDirection: 'row',
  },
  interactionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  interactionText: {
    marginLeft: 4,
    color: '#666',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default ForumScreen; 