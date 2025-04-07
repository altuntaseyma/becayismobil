import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { AuthStackNavigationProp } from '../../navigation/types';
import { Match } from '../../types';

type MatchesScreenProps = {
  navigation: AuthStackNavigationProp;
};

const DUMMY_MATCHES: Match[] = [
  {
    id: '1',
    title: 'İstanbul -> Ankara Becayiş',
    matchTitle: 'Ankara -> İstanbul Becayiş',
    fromLocation: 'İstanbul, Kadıköy',
    toLocation: 'Ankara, Merkez',
    department: 'Matematik',
    institution: 'Anadolu Lisesi',
    date: '24 Mart 2024',
    status: 'Eşleşme Bekliyor',
    matchPercentage: 95,
  },
  {
    id: '2',
    title: 'İzmir -> Antalya Becayiş',
    matchTitle: 'Antalya -> İzmir Becayiş',
    fromLocation: 'İzmir, Bornova',
    toLocation: 'Antalya, Muratpaşa',
    department: 'Fizik',
    institution: 'Fen Lisesi',
    date: '23 Mart 2024',
    status: 'Eşleşme Bulundu',
    matchPercentage: 85,
  },
];

const MatchesScreen = ({ navigation }: MatchesScreenProps) => {
  const [selectedTab, setSelectedTab] = useState('matches');

  const renderMatch = ({ item }: { item: Match }) => (
    <TouchableOpacity
      style={styles.matchCard}
      onPress={() => console.log('Eşleşme detayına git:', item.id)}
    >
      <View style={styles.matchHeader}>
        <View style={styles.matchTitles}>
          <Text style={styles.matchTitle}>{item.title}</Text>
          <Text style={styles.matchSubtitle}>{item.matchTitle}</Text>
        </View>
        <View style={styles.matchPercentage}>
          <Text style={styles.percentageText}>{item.matchPercentage}%</Text>
          <Text style={styles.matchText}>Eşleşme</Text>
        </View>
      </View>

      <View style={styles.detailsContainer}>
        <View style={styles.detailItem}>
          <Ionicons name="location" size={16} color="#666" />
          <Text style={styles.detailText}>{item.fromLocation} → {item.toLocation}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="school" size={16} color="#666" />
          <Text style={styles.detailText}>{item.department}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="business" size={16} color="#666" />
          <Text style={styles.detailText}>{item.institution}</Text>
        </View>
        <View style={styles.detailItem}>
          <Ionicons name="calendar" size={16} color="#666" />
          <Text style={styles.detailText}>{item.date}</Text>
        </View>
      </View>

      <View style={styles.statusContainer}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: item.status === 'Eşleşme Bulundu' ? '#4CAF50' : '#FFC107' }
        ]}>
          <Text style={styles.statusText}>{item.status}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'matches' && styles.activeTab]}
          onPress={() => setSelectedTab('matches')}
        >
          <Text style={[styles.tabText, selectedTab === 'matches' && styles.activeTabText]}>
            Eşleşmeler
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'requests' && styles.activeTab]}
          onPress={() => setSelectedTab('requests')}
        >
          <Text style={[styles.tabText, selectedTab === 'requests' && styles.activeTabText]}>
            Taleplerim
          </Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={DUMMY_MATCHES}
        renderItem={renderMatch}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fab}
        onPress={() => navigation.navigate('CreateRequest')}
      >
        <Ionicons name="add" size={24} color="#fff" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 4,
    margin: 16,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 6,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  tabText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
  },
  activeTabText: {
    color: '#fff',
  },
  listContainer: {
    padding: 16,
    paddingTop: 0,
  },
  matchCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  matchHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 16,
  },
  matchTitles: {
    flex: 1,
    marginRight: 16,
  },
  matchTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
  },
  matchSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  matchPercentage: {
    alignItems: 'center',
  },
  percentageText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
  },
  matchText: {
    fontSize: 12,
    color: '#666',
  },
  detailsContainer: {
    gap: 8,
    marginBottom: 16,
  },
  detailItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  statusContainer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingTop: 16,
  },
  statusBadge: {
    alignSelf: 'flex-start',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  statusText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  fab: {
    position: 'absolute',
    right: 16,
    bottom: 16,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#007AFF',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
});

export default MatchesScreen; 