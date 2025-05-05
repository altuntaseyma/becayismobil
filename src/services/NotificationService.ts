import { collection, addDoc, query, where, getDocs, updateDoc, doc, Timestamp } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Notification } from '../types/database';
import * as Notifications from 'expo-notifications';

export class NotificationService {
  private readonly NOTIFICATIONS_COLLECTION = 'notifications';

  constructor() {
    this.configureNotifications();
  }

  private async configureNotifications() {
    await Notifications.setNotificationHandler({
      handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: true,
        shouldSetBadge: true,
      }),
    });
  }

  async requestPermissions() {
    const { status: existingStatus } = await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    
    if (existingStatus !== 'granted') {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    
    if (finalStatus !== 'granted') {
      throw new Error('Bildirim izni verilmedi');
    }
  }

  async createNotification(notification: Omit<Notification, 'id' | 'createdAt'>): Promise<string> {
    try {
      const notificationRef = await addDoc(collection(db, this.NOTIFICATIONS_COLLECTION), {
        ...notification,
        read: false,
        createdAt: Timestamp.now()
      });

      // Yerel bildirim gönder
      await this.showLocalNotification(notification.title, notification.content);

      return notificationRef.id;
    } catch (error) {
      console.error('Error creating notification:', error);
      throw error;
    }
  }

  private async showLocalNotification(title: string, body: string) {
    try {
      await Notifications.scheduleNotificationAsync({
        content: {
          title,
          body,
          sound: true,
          priority: Notifications.AndroidNotificationPriority.HIGH,
        },
        trigger: null, // Hemen göster
      });
    } catch (error) {
      console.error('Error showing local notification:', error);
    }
  }

  async getUserNotifications(userId: string): Promise<Notification[]> {
    try {
      const q = query(
        collection(db, this.NOTIFICATIONS_COLLECTION),
        where('userId', '==', userId)
      );

      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Notification));
    } catch (error) {
      console.error('Error getting user notifications:', error);
      throw error;
    }
  }

  async markAsRead(notificationId: string): Promise<void> {
    try {
      const notificationRef = doc(db, this.NOTIFICATIONS_COLLECTION, notificationId);
      await updateDoc(notificationRef, {
        read: true
      });
    } catch (error) {
      console.error('Error marking notification as read:', error);
      throw error;
    }
  }

  async createMatchNotification(
    userId: string,
    matchId: string,
    matchScore: number
  ): Promise<string> {
    const notification: Omit<Notification, 'id' | 'createdAt'> = {
      userId,
      title: 'Yeni Becayiş Eşleşmesi!',
      content: `%${(matchScore * 100).toFixed(1)} uyumlu yeni bir becayiş eşleşmeniz var.`,
      type: 'match',
      relatedId: matchId,
      read: false
    };

    return this.createNotification(notification);
  }

  async createMessageNotification(
    userId: string,
    messageId: string,
    senderName: string
  ): Promise<string> {
    const notification: Omit<Notification, 'id' | 'createdAt'> = {
      userId,
      title: 'Yeni Mesaj',
      content: `${senderName} size yeni bir mesaj gönderdi.`,
      type: 'message',
      relatedId: messageId,
      read: false
    };

    return this.createNotification(notification);
  }

  async createDocumentNotification(
    userId: string,
    documentId: string,
    documentType: string
  ): Promise<string> {
    const notification: Omit<Notification, 'id' | 'createdAt'> = {
      userId,
      title: 'Yeni Belge',
      content: `${documentType} belgesi yüklendi.`,
      type: 'document',
      relatedId: documentId,
      read: false
    };

    return this.createNotification(notification);
  }
} 