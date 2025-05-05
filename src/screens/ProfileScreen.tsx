import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { useAuth } from '../hooks/useAuth';
import { ProfileScreenProps } from '../navigation/types';
import { Ionicons } from '@expo/vector-icons';

interface UserProfile {
  displayName: string;
  email: string;
  kurumKategori: string;
  kurum: string;
  il: string;
  ilce: string;
  isVerified: boolean;
  verificationStatus: 'pending' | 'approved' | 'rejected';
}

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
  const { getUserData, logout } = useAuth();
  const [userData, setUserData] = useState<UserProfile | null>(null);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const data = await getUserData();
      if (data) {
        setUserData(data as UserProfile);
      }
    } catch (error) {
      console.error('Kullanıcı bilgileri yüklenirken hata:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigation.replace('Login');
    } catch (error) {
      console.error('Çıkış yapılırken hata:', error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved':
        return '#34C759';
      case 'rejected':
        return '#FF3B30';
      default:
        return '#FF9500';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'approved':
        return 'Onaylandı';
      case 'rejected':
        return 'Reddedildi';
      default:
        return 'Onay Bekliyor';
    }
  };

  if (!userData) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Yükleniyor...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.profileImageContainer}>
          <Ionicons name="person" size={60} color="#007AFF" />
        </View>
        <Text style={styles.name}>{userData.displayName}</Text>
        <Text style={styles.email}>{userData.email}</Text>
        
        <View style={[styles.verificationStatus, { backgroundColor: getStatusColor(userData.verificationStatus) }]}>
          <Text style={styles.verificationText}>
            {getStatusText(userData.verificationStatus)}
          </Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Kurum Kategorisi</Text>
          <Text style={styles.infoValue}>{userData.kurumKategori}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Kurum</Text>
          <Text style={styles.infoValue}>{userData.kurum}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>İl</Text>
          <Text style={styles.infoValue}>{userData.il}</Text>
        </View>

        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>İlçe</Text>
          <Text style={styles.infoValue}>{userData.ilce}</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.logoutButton}
        onPress={handleLogout}
      >
        <Ionicons name="log-out-outline" size={24} color="#fff" style={styles.buttonIcon} />
        <Text style={styles.buttonText}>Çıkış Yap</Text>
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
  },
  header: {
    alignItems: 'center',
    padding: 20,
    marginTop: 40,
  },
  profileImageContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
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
    marginBottom: 15,
  },
  verificationStatus: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
    marginBottom: 20,
  },
  verificationText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  infoSection: {
    padding: 20,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    margin: 20,
    padding: 15,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonIcon: {
    marginRight: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProfileScreen; 