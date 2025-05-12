// Admin paneli: Mevzuat yönetimi için ekran
import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Button, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { MevzuatService } from '../../services/MevzuatService';
import { MevzuatMadde } from '../../types/database';

const AdminPanelScreen = () => {
  const [maddeler, setMaddeler] = useState<MevzuatMadde[]>([]);
  const [baslik, setBaslik] = useState('');
  const [icerik, setIcerik] = useState('');
  const [kategori, setKategori] = useState('Genel');
  const [loading, setLoading] = useState(false);

  const fetchMaddeler = async () => {
    setLoading(true);
    const data = await MevzuatService.getAll();
    setMaddeler(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchMaddeler();
  }, []);

  const handleAdd = async () => {
    if (!baslik || !icerik) {
      Alert.alert('Hata', 'Başlık ve içerik zorunlu!');
      return;
    }
    await MevzuatService.add({ baslik, icerik, kategori });
    setBaslik('');
    setIcerik('');
    fetchMaddeler();
  };

  const handleDelete = async (id: string) => {
    await MevzuatService.delete(id);
    fetchMaddeler();
  };

  return (
    <View style={styles.container}>
      <Text style={{color:'red', fontWeight:'bold', marginBottom:8}}>Sadece admin kullanıcılar erişebilir</Text>
      <Text style={styles.title}>Mevzuat Maddeleri</Text>
      <FlatList
        data={maddeler}
        keyExtractor={item => item.id!}
        refreshing={loading}
        onRefresh={fetchMaddeler}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={styles.itemTitle}>{item.baslik}</Text>
            <Text style={styles.itemContent}>{item.icerik}</Text>
            <Text style={styles.itemCategory}>{item.kategori}</Text>
            <TouchableOpacity onPress={() => handleDelete(item.id!)} style={styles.deleteBtn}>
              <Text style={{ color: 'white' }}>Sil</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Başlık"
          value={baslik}
          onChangeText={setBaslik}
        />
        <TextInput
          style={styles.input}
          placeholder="İçerik"
          value={icerik}
          onChangeText={setIcerik}
          multiline
        />
        <TextInput
          style={styles.input}
          placeholder="Kategori"
          value={kategori}
          onChangeText={setKategori}
        />
        <Button title="Ekle" onPress={handleAdd} />
        <Button title="Örnek Mevzuat Ekle" onPress={async () => {
          await MevzuatService.add({
            baslik: 'Becayiş Şartları',
            icerik: '657 sayılı Devlet Memurları Kanunu\'na göre becayiş için temel şartlar: 1) Aynı sınıf, 2) Kadro uyumu, 3) Kurum muvafakati.',
            kategori: 'Becayiş',
          });
          fetchMaddeler();
        }} color="#007AFF" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, backgroundColor: '#fff' },
  title: { fontSize: 22, fontWeight: 'bold', marginBottom: 12 },
  item: { backgroundColor: '#f2f2f2', padding: 12, marginBottom: 8, borderRadius: 8 },
  itemTitle: { fontWeight: 'bold', fontSize: 16 },
  itemContent: { marginTop: 4, fontSize: 14 },
  itemCategory: { marginTop: 4, fontSize: 12, color: '#888' },
  deleteBtn: { backgroundColor: 'red', padding: 6, borderRadius: 6, marginTop: 6, alignSelf: 'flex-end' },
  form: { marginTop: 16 },
  input: { borderWidth: 1, borderColor: '#ccc', borderRadius: 6, padding: 8, marginBottom: 8 },
});

export default AdminPanelScreen; 