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

export interface Post {
  id: string;
  title: string;
  description: string;
  currentLocation: string;
  targetLocation: string;
  department: string;
  position: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export const getPosts = async (
  lastVisible?: DocumentData,
  pageSize: number = 10
): Promise<{ posts: Post[]; lastVisible: DocumentData | null }> => {
  try {
    let q = query(
      collection(db, 'posts'),
      orderBy('createdAt', 'desc'),
      limit(pageSize)
    );

    if (lastVisible) {
      q = query(
        collection(db, 'posts'),
        orderBy('createdAt', 'desc'),
        startAfter(lastVisible),
        limit(pageSize)
      );
    }

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    const lastVisibleDoc = querySnapshot.docs[querySnapshot.docs.length - 1] || null;

    return { posts, lastVisible: lastVisibleDoc };
  } catch (error) {
    throw error;
  }
};

export const getPost = async (postId: string): Promise<Post | null> => {
  try {
    const docRef = doc(db, 'posts', postId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...docSnap.data(),
    } as Post;
  } catch (error) {
    throw error;
  }
};

export const createPost = async (post: Omit<Post, 'id' | 'createdAt' | 'updatedAt'>): Promise<Post> => {
  try {
    const docRef = await addDoc(collection(db, 'posts'), {
      ...post,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });

    return {
      id: docRef.id,
      ...post,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
  } catch (error) {
    throw error;
  }
};

export const updatePost = async (postId: string, post: Partial<Post>): Promise<void> => {
  try {
    const docRef = doc(db, 'posts', postId);
    await updateDoc(docRef, {
      ...post,
      updatedAt: new Date().toISOString(),
    });
  } catch (error) {
    throw error;
  }
};

export const deletePost = async (postId: string): Promise<void> => {
  try {
    const docRef = doc(db, 'posts', postId);
    await deleteDoc(docRef);
  } catch (error) {
    throw error;
  }
};

export const searchPosts = async (
  searchTerm: string,
  location?: string,
  department?: string
): Promise<Post[]> => {
  try {
    let q = query(collection(db, 'posts'));

    if (location) {
      q = query(q, where('currentLocation', '==', location));
    }

    if (department) {
      q = query(q, where('department', '==', department));
    }

    const querySnapshot = await getDocs(q);
    const posts = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
    })) as Post[];

    // Client-side search for title and description
    return posts.filter(post =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    throw error;
  }
}; 