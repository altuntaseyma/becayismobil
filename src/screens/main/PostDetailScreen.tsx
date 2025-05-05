import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useRoute, RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../navigation/types';
import { doc, getDoc, collection, addDoc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { useAuth } from '../../hooks/useAuth';
import { Ionicons } from '@expo/vector-icons';

type PostDetailRouteProp = RouteProp<RootStackParamList, 'PostDetail'>;

interface Comment {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  createdAt: any;
}

const PostDetailScreen = () => {
  const route = useRoute<PostDetailRouteProp>();
  const { postId } = route.params;
  const { user } = useAuth();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchPostAndComments();
  }, [postId]);

  const fetchPostAndComments = async () => {
    try {
      const postDoc = await getDoc(doc(db, 'forumPosts', postId));
      if (postDoc.exists()) {
        setPost({ id: postDoc.id, ...postDoc.data() });
      }

      const commentsSnapshot = await getDoc(doc(db, `forumPosts/${postId}/comments`, 'all'));
      if (commentsSnapshot.exists()) {
        setComments(commentsSnapshot.data().items || []);
      }
    } catch (error) {
      console.error('Gönderi detayları yüklenirken hata:', error);
      Alert.alert('Hata', 'Gönderi detayları yüklenirken bir hata oluştu.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) {
      Alert.alert('Hata', 'Lütfen bir yorum yazın.');
      return;
    }

    setSubmitting(true);
    try {
      const comment = {
        content: newComment.trim(),
        authorId: user?.uid,
        authorName: user?.displayName || 'İsimsiz Kullanıcı',
        createdAt: serverTimestamp(),
      };

      const commentsRef = doc(db, `forumPosts/${postId}/comments`, 'all');
      await updateDoc(commentsRef, {
        items: [...comments, comment],
      });

      await updateDoc(doc(db, 'forumPosts', postId), {
        comments: (post.comments || 0) + 1,
      });

      setComments([...comments, comment]);
      setNewComment('');
      setPost({ ...post, comments: (post.comments || 0) + 1 });
    } catch (error) {
      console.error('Yorum eklenirken hata:', error);
      Alert.alert('Hata', 'Yorum eklenirken bir hata oluştu.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007AFF" />
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>Gönderi bulunamadı.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.postContainer}>
          <Text style={styles.title}>{post.title}</Text>
          <View style={styles.authorInfo}>
            <Text style={styles.authorName}>{post.authorName}</Text>
            <Text style={styles.date}>
              {post.createdAt?.toDate().toLocaleDateString('tr-TR')}
            </Text>
          </View>
          <Text style={styles.content}>{post.content}</Text>
        </View>

        <View style={styles.commentsSection}>
          <Text style={styles.commentsTitle}>Yorumlar ({comments.length})</Text>
          {comments.map((comment, index) => (
            <View key={index} style={styles.commentItem}>
              <View style={styles.commentHeader}>
                <Text style={styles.commentAuthor}>{comment.authorName}</Text>
                <Text style={styles.commentDate}>
                  {comment.createdAt?.toDate().toLocaleDateString('tr-TR')}
                </Text>
              </View>
              <Text style={styles.commentContent}>{comment.content}</Text>
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.commentInputContainer}>
        <TextInput
          style={styles.commentInput}
          value={newComment}
          onChangeText={setNewComment}
          placeholder="Yorum yazın..."
          multiline
        />
        <TouchableOpacity
          style={[styles.sendButton, submitting && styles.sendButtonDisabled]}
          onPress={handleAddComment}
          disabled={submitting}
        >
          <Ionicons name="send" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  scrollView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 16,
    color: '#666',
  },
  postContainer: {
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  authorInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  authorName: {
    fontSize: 14,
    color: '#666',
  },
  date: {
    fontSize: 14,
    color: '#666',
  },
  content: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333',
  },
  commentsSection: {
    padding: 16,
  },
  commentsTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
  },
  commentItem: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  commentAuthor: {
    fontSize: 14,
    fontWeight: '500',
  },
  commentDate: {
    fontSize: 12,
    color: '#666',
  },
  commentContent: {
    fontSize: 14,
    color: '#333',
  },
  commentInputContainer: {
    flexDirection: 'row',
    padding: 8,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  commentInput: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    maxHeight: 100,
  },
  sendButton: {
    width: 40,
    height: 40,
    backgroundColor: '#007AFF',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default PostDetailScreen; 