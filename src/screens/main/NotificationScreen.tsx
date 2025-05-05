import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { collection, query, orderBy, getDocs, updateDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import { RootStackNavigationProp } from '../../navigation/types';

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'match' | 'message' | 'system';
  read: boolean;
  createdAt: any;
  data?: {
    matchId?: string;
    postId?: string;
  };
}

const NotificationScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();
  const navigation = useNavigation<RootStackNavigationProp>();

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const notificationsRef = collection(db, `users/${user?.uid}/notifications`);
      const q = query(notificationsRef, orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(q);
      
      const fetchedNotifications = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as Notification[];
      
      setNotifications(fetchedNotifications);
    } catch (error) {
      console.error('Bildirimler yüklenirken hata:', error);
      Alert.alert('Hata', 'Bildirimler yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationPress = async (notification: Notification) => {
    try {
      // Bildirimi okundu olarak işaretle
      if (!notification.read) {
        const notificationRef = doc(db, `users/${user?.uid}/notifications`, notification.id);
        await updateDoc(notificationRef, { read: true });
        
        setNotifications(prev =>
          prev.map(n =>
            n.id === notification.id ? { ...n, read: true } : n
          )
        );
      }

      // Bildirim tipine göre yönlendirme yap
      switch (notification.type) {
        case 'match':
          if (notification.data?.matchId) {
            navigation.navigate('ChatScreen', { matchId: notification.data.matchId });
          }
          break;
        case 'message':
          if (notification.data?.matchId) {
            navigation.navigate('ChatScreen', { matchId: notification.data.matchId });
          }
          break;
        case 'system':
          // Sistem bildirimleri için özel bir işlem yok
          break;
      }
    } catch (error) {
      console.error('Bildirim işlenirken hata:', error);
    }
  };

  const renderNotification = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
      onPress={() => handleNotificationPress(item)}
    >
      <View style={styles.notificationIcon}>
        {item.type === 'match' && (
          <Ionicons name="people" size={24} color="#007AFF" />
        )}
        {item.type === 'message' && (
          <Ionicons name="chatbubble" size={24} color="#007AFF" />
        )}
        {item.type === 'system' && (
          <Ionicons name="information-circle" size={24} color="#007AFF" />
        )}
      </View>
      
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage} numberOfLines={2}>
          {item.message}
        </Text>
        <Text style={styles.notificationTime}>
          {item.createdAt?.toDate().toLocaleDateString('tr-TR')}
        </Text>
      </View>
      
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {notifications.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="notifications-off" size={48} color="#666" />
          <Text style={styles.emptyText}>Henüz bildiriminiz yok</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={renderNotification}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666',
  },
  listContainer: {
    padding: 16,
  },
  notificationItem: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    alignItems: 'center',
  },
  unreadNotification: {
    backgroundColor: '#f0f9ff',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f0f9ff',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#007AFF',
    marginLeft: 8,
  },
});

export default NotificationScreen; 