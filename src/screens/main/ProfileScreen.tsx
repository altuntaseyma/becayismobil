import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackNavigationProp } from '../../navigation/types';

type ProfileScreenProps = {
  navigation: AuthStackNavigationProp;
};

// Örnek kullanıcı verisi
const DUMMY_USER = {
  name: 'Ahmet Yılmaz',
  email: 'ahmet.yilmaz@example.com',
  phone: '0555 555 55 55',
  institution: 'Milli Eğitim',
  department: 'Öğretmen',
  location: 'İstanbul',
  avatar: null,
};

const ProfileScreen = ({ navigation }: ProfileScreenProps) => {
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

  return (
    <ScrollView style={styles.container}>
      {/* Profil Başlığı */}
      <View style={styles.header}>
        <View style={styles.avatarContainer}>
          {DUMMY_USER.avatar ? (
            <Image
              source={{ uri: DUMMY_USER.avatar }}
              style={styles.avatar}
            />
          ) : (
            <View style={styles.avatarPlaceholder}>
              <Ionicons name="person" size={40} color="#fff" />
            </View>
          )}
        </View>
        <Text style={styles.name}>{DUMMY_USER.name}</Text>
        <Text style={styles.title}>{DUMMY_USER.department}</Text>
        <Text style={styles.location}>
          <Ionicons name="location-outline" size={16} color="#666" />
          {DUMMY_USER.location}
        </Text>
      </View>

      {/* İstatistikler */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Aktif Talep</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>5</Text>
          <Text style={styles.statLabel}>Eşleşme</Text>
        </View>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
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
      <TouchableOpacity style={styles.logoutButton}>
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