import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../hooks/useAuth';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

interface UserProfile {
  name: string;
  email: string;
  kurumKategori: string;
  kurum: string;
  il: string;
  ilce: string;
  createdAt: Date;
  updatedAt: Date;
}

const ProfileScreen = () => {
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const { user, logout } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      if (!user?.uid) return;

      try {
        const docRef = doc(db, 'users', user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProfile({
            ...docSnap.data() as UserProfile,
            createdAt: docSnap.data().createdAt?.toDate(),
            updatedAt: docSnap.data().updatedAt?.toDate(),
          });
        }
      } catch (error) {
        console.error('Profil bilgileri alınamadı:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [user]);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Çıkış yapılırken hata oluştu:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          <Ionicons name="person" size={60} color="#007AFF" />
        </View>
        <Text style={styles.name}>{profile?.name}</Text>
        <Text style={styles.email}>{profile?.email}</Text>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Ionicons name="business" size={24} color="#666" style={styles.icon} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Kurum Kategorisi</Text>
            <Text style={styles.infoValue}>{profile?.kurumKategori}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="business" size={24} color="#666" style={styles.icon} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Kurum</Text>
            <Text style={styles.infoValue}>{profile?.kurum}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="location" size={24} color="#666" style={styles.icon} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>İl</Text>
            <Text style={styles.infoValue}>{profile?.il}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="location" size={24} color="#666" style={styles.icon} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>İlçe</Text>
            <Text style={styles.infoValue}>{profile?.ilce}</Text>
          </View>
        </View>

        <View style={styles.infoItem}>
          <Ionicons name="calendar" size={24} color="#666" style={styles.icon} />
          <View style={styles.infoContent}>
            <Text style={styles.infoLabel}>Kayıt Tarihi</Text>
            <Text style={styles.infoValue}>
              {profile?.createdAt?.toLocaleDateString('tr-TR')}
            </Text>
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out" size={24} color="#fff" style={styles.logoutIcon} />
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  header: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  infoSection: {
    padding: 20,
  },
  infoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 15,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
  },
  logoutButton: {
    flexDirection: 'row',
    backgroundColor: '#007AFF',
    marginHorizontal: 20,
    marginBottom: 30,
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    marginRight: 10,
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 