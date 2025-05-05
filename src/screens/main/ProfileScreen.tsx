import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackNavigationProp } from '../../navigation/types';
import { useAuth } from '../../hooks/useAuth';
import { db } from '../../config/firebase';
import { collection, query, where, getDocs } from 'firebase/firestore';

type ProfileScreenProps = {
  navigation: AuthStackNavigationProp;
};

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { user, getUserData, logout } = useAuth();
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ aktif: 0, eslesme: 0, tamamlanan: 0 });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      if (!user) return;
      // Kullanıcı profil verisi
      const userData = await getUserData();
      setProfile(userData);
      // Aktif talep sayısı
      const qAktif = query(collection(db, 'exchangeRequests'), where('userId', '==', user.uid), where('isActive', '==', true));
      const aktifSnap = await getDocs(qAktif);
      // Tamamlanan talep sayısı
      const qTamam = query(collection(db, 'exchangeRequests'), where('userId', '==', user.uid), where('isActive', '==', false));
      const tamamSnap = await getDocs(qTamam);
      // Eşleşme sayısı (matches koleksiyonunda userId1 veya userId2 eşit olanlar)
      const qEslesme1 = query(collection(db, 'matches'), where('userId1', '==', user.uid));
      const qEslesme2 = query(collection(db, 'matches'), where('userId2', '==', user.uid));
      const eslesmeSnap1 = await getDocs(qEslesme1);
      const eslesmeSnap2 = await getDocs(qEslesme2);
      setStats({
        aktif: aktifSnap.size,
        tamamlanan: tamamSnap.size,
        eslesme: eslesmeSnap1.size + eslesmeSnap2.size,
      });
      setLoading(false);
    };
    fetchData();
  }, [user]);

  const menuItems = [
    {
      id: 'profile',
      title: 'Profil Bilgileri',
      icon: 'person-outline' as const,
      onPress: () => navigation.navigate('EditProfile'),
    },
    {
      id: 'notifications',
      title: 'Bildirimler',
      icon: 'notifications-outline' as const,
      onPress: () => navigation.navigate('Notifications'),
    },
    {
      id: 'security',
      title: 'Güvenlik',
      icon: 'shield-checkmark-outline' as const,
      onPress: () => navigation.navigate('Security'),
    },
    {
      id: 'preferences',
      title: 'Tercihler',
      icon: 'settings-outline' as const,
      onPress: () => navigation.navigate('Preferences'),
    },
    {
      id: 'help',
      title: 'Yardım ve Destek',
      icon: 'help-circle-outline' as const,
      onPress: () => navigation.navigate('Help'),
    },
    {
      id: 'about',
      title: 'Hakkında',
      icon: 'information-circle-outline' as const,
      onPress: () => navigation.navigate('About'),
    },
  ];

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {/* Profil Başlığı */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {profile?.avatar ? (
            <Image
              source={{ uri: profile.avatar }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
          )}
        </View>
        <Text style={styles.name}>{profile?.displayName || profile?.name || '-'}</Text>
        <Text style={styles.title}>{profile?.department || '-'}</Text>
        <Text style={styles.location}>
          <Ionicons name="location-outline" size={16} color="#666" />
          {profile?.il || profile?.location || '-'}
        </Text>
      </View>

      {/* İstatistikler */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.aktif}</Text>
          <Text style={styles.statLabel}>Aktif Talep</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.eslesme}</Text>
          <Text style={styles.statLabel}>Eşleşme</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>{stats.tamamlanan}</Text>
          <Text style={styles.statLabel}>Tamamlanan</Text>
        </View>
      </View>

      {/* Menü Öğeleri */}
      <View style={styles.menuContainer}>
        {menuItems.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.menuItem}
            onPress={item.onPress}
          >
            <View style={styles.menuItemLeft}>
              <Ionicons name={item.icon} size={24} color="#666" />
              <Text style={styles.menuItemText}>{item.title}</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color="#666" />
          </TouchableOpacity>
        ))}
      </View>

      {/* Çıkış Yap Butonu */}
      <TouchableOpacity style={styles.logoutButton} onPress={logout}>
        <Text style={styles.logoutText}>Çıkış Yap</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    overflow: 'hidden',
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  avatarPlaceholder: {
    width: '100%',
    height: '100%',
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  title: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
    color: '#666',
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 20,
    marginBottom: 15,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 14,
    color: '#666',
  },
  menuContainer: {
    backgroundColor: '#fff',
    marginBottom: 15,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 16,
    marginLeft: 15,
    color: '#333',
  },
  logoutButton: {
    backgroundColor: '#ff3b30',
    margin: 15,
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 