import React, { useState } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { TextInput, Card, Text, Button } from 'react-native-paper';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import { MainTabParamList } from '../../navigation/types';

type SearchScreenProps = {
  navigation: BottomTabNavigationProp<MainTabParamList, 'Search'>;
};

// Örnek veri
const DUMMY_SEARCH_RESULTS = [
  {
    id: '1',
    title: 'İstanbul\'dan Ankara\'ya Becayiş',
    description: 'İstanbul\'da çalışan bir öğretmenim, Ankara\'ya tayin istiyorum.',
    location: 'İstanbul',
    targetLocation: 'Ankara',
    date: '2024-03-20',
  },
  {
    id: '2',
    title: 'İzmir\'den Bursa\'ya Becayiş',
    description: 'İzmir\'de çalışan bir memurum, Bursa\'ya tayin istiyorum.',
    location: 'İzmir',
    targetLocation: 'Bursa',
    date: '2024-03-19',
  },
];

export default function SearchScreen({ navigation }: SearchScreenProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState(DUMMY_SEARCH_RESULTS);

  const handleSearch = () => {
    // TODO: Firebase'den arama yap
    console.log('Searching for:', searchQuery);
  };

  const renderSearchResult = ({ item }: { item: typeof DUMMY_SEARCH_RESULTS[0] }) => (
    <Card style={styles.card} onPress={() => console.log('Result pressed:', item.id)}>
      <Card.Content>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
        <View style={styles.cardFooter}>
          <Text style={styles.locationText}>
            {item.location} → {item.targetLocation}
          </Text>
          <Text style={styles.dateText}>{item.date}</Text>
        </View>
      </Card.Content>
    </Card>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          label="Ara..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          mode="outlined"
          style={styles.searchInput}
          onSubmitEditing={handleSearch}
        />
        <Button
          mode="contained"
          onPress={handleSearch}
          style={styles.searchButton}
        >
          Ara
        </Button>
      </View>
      <FlatList
        data={searchResults}
        renderItem={renderSearchResult}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  searchContainer: {
    flexDirection: 'row',
    padding: 16,
    backgroundColor: '#fff',
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginRight: 8,
  },
  searchButton: {
    justifyContent: 'center',
  },
  listContainer: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 12,
    color: '#666',
  },
  dateText: {
    fontSize: 12,
    color: '#999',
  },
}); 