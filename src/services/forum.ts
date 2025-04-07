import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  startAfter,
  DocumentData,
} from 'firebase/firestore';
import { db } from './firebase';

export interface Topic {
  id: string;
  title: string;
  content: string;
  authorId: string;
  authorName: string;
  replies: number;
  lastReply: string;
  createdAt: string;
  updatedAt: string;
}

export interface Reply {
  id: string;
  content: string;
  authorId: string;
  authorName: string;
  topicId: string;
  createdAt: string;
  updatedAt: string;
}

export const getTopics = async (
  lastVisible?: DocumentData,
  pageSize: number = 10
): Promise<{ topics: Topic[]; lastVisible: DocumentData | null }> => {
  try {
    let q = query(
      collection(db, 'topics'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    if (lastVisible) {
      q = query(
        collection(db, 'topics'),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const topics = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Topic[];

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { topics, lastVisible: lastVisibleDoc };
  } catch (error) {
    throw error;
  }
};

export const getTopic = async (topicId: string): Promise<Topic | null> => {
  try {
    const docRef = doc(db, 'topics', topicId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Topic;
  } catch (error) {
    throw error;
  }
};

export const createTopic = async (topic: Omit<Topic, 'id' | 'createdAt' | 'updatedAt' | 'replies' | 'lastReply'>): Promise<Topic> => {
  try {
    const docRef = await addDoc(collection(db, 'topics'), {
      ...topic,
      replies: 0,
      lastReply: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...topic,
      replies: 0,
      lastReply: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    throw error;
  }
};

export const updateTopic = async (topicId: string, topic: Partial<Topic>): Promise<void> => {
  try {
    const docRef = doc(db, 'topics', topicId);
    await updateDoc(docRef, {
      ...topic,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

export const deleteTopic = async (topicId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'topics', topicId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

export const getReplies = async (topicId: string): Promise<Reply[]> => {
  try {
    const q = query(
      collection(db, 'replies'),
      where('topicId', '==', topicId),
      orderBy('createdAt', 'asc')
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Reply[];
  } catch (error) {
    throw error;
  }
};

export const createReply = async (reply: Omit<Reply, 'id' | 'createdAt' | 'updatedAt'>): Promise<Reply> => {
  try {
    const docRef = await addDoc(collection(db, 'replies'), {
      ...reply,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    // Update topic's reply count and last reply
    const topicRef = doc(db, 'topics', reply.topicId);
    const topicSnap = await getDoc(topicRef);
    if (topicSnap.exists()) {
      const topic = topicSnap.data() as Topic;
      await updateDoc(topicRef, {
        replies: topic.replies + 1,
        lastReply: new Date().toISOString(),
      });
    }

    return {
      id: docRef.id,
      ...reply,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    throw error;
  }
};

export const updateReply = async (replyId: string, reply: Partial<Reply>): Promise<void> => {
  try {
    const docRef = doc(db, 'replies', replyId);
    await updateDoc(docRef, {
      ...reply,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

export const deleteReply = async (replyId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'replies', replyId);
    const replySnap = await getDoc(docRef);
    
    if (replySnap.exists()) {
      const reply = replySnap.data() as Reply;
      await deleteDoc(docRef);

      // Update topic's reply count
      const topicRef = doc(db, 'topics', reply.topicId);
      const topicSnap = await getDoc(topicRef);
      if (topicSnap.exists()) {
        const topic = topicSnap.data() as Topic;
        await updateDoc(topicRef, {
          replies: topic.replies - 1,
        });
      }
    }
  } catch (error) {
    throw error;
  }
}; 