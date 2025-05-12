// Mevzuat veritabanı servis dosyası
import { db } from '../config/firebase';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { MevzuatMadde } from '../types/database';

const MEVZUAT_COLLECTION = 'mevzuat';

export class MevzuatService {
  static async getAll(): Promise<MevzuatMadde[]> {
    const snapshot = await getDocs(collection(db, MEVZUAT_COLLECTION));
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })) as MevzuatMadde[];
  }

  static async add(madde: Omit<MevzuatMadde, 'id' | 'createdAt'>): Promise<string> {
    const docRef = await addDoc(collection(db, MEVZUAT_COLLECTION), {
      ...madde,
      createdAt: new Date(),
    });
    return docRef.id;
  }

  static async update(id: string, madde: Partial<MevzuatMadde>): Promise<void> {
    await updateDoc(doc(db, MEVZUAT_COLLECTION, id), madde);
  }

  static async delete(id: string): Promise<void> {
    await deleteDoc(doc(db, MEVZUAT_COLLECTION, id));
  }
} 