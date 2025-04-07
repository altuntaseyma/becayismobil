import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackNavigationProp } from '../../navigation/types';

type HomeScreenProps = {
  navigation: AuthStackNavigationProp;
};

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  return (
    <ScrollView style={styles.container}>
      {/* Üst Banner */}
      <View style={styles.banner}>
        <Text style={styles.bannerTitle}>Becayiş Portalı</Text>
        <Text style={styles.bannerSubtitle}>Kamu Personeli Becayiş Sistemi</Text>
      </View>

      {/* Hızlı İşlemler */}
      <View style={styles.quickActions}>
        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('CreateRequest')}
        >
          <Ionicons name="add-circle" size={24} color="#007AFF" />
          <Text style={styles.actionText}>Yeni Talep</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.actionButton}
          onPress={() => navigation.navigate('Matches')}
        >
          <Ionicons name="list" size={24} color="#007AFF" />
          <Text style={styles.actionText}>Taleplerim</Text>
        </TouchableOpacity>
      </View>

      {/* Son Haberler */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Son Haberler</Text>
          <TouchableOpacity onPress={() => navigation.navigate('News')}>
            <Text style={styles.seeAll}>Tümü</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.newsCard}>
          <Text style={styles.newsTitle}>Becayiş Sistemi Güncellendi</Text>
          <Text style={styles.newsDate}>24 Mart 2024</Text>
        </View>
      </View>

      {/* Forum Son Konular */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Forum Son Konular</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Forum')}>
            <Text style={styles.seeAll}>Tümü</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.forumCard}>
          <Text style={styles.forumTitle}>İstanbul Becayiş Talepleri</Text>
          <Text style={styles.forumCount}>15 yeni mesaj</Text>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  banner: {
    backgroundColor: '#007AFF',
    padding: 20,
    paddingTop: 40,
  },
  bannerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  bannerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
  },
  quickActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: -20,
    marginHorizontal: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  actionButton: {
    alignItems: 'center',
  },
  actionText: {
    marginTop: 5,
    color: '#007AFF',
    fontWeight: '500',
  },
  section: {
    backgroundColor: '#fff',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  seeAll: {
    color: '#007AFF',
    fontWeight: '500',
  },
  newsCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  newsTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  newsDate: {
    fontSize: 14,
    color: '#666',
  },
  forumCard: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  forumTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 5,
  },
  forumCount: {
    fontSize: 14,
    color: '#666',
  },
});

export default HomeScreen; 