import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert
} from 'react-native';
import { Match } from '../types/database';
import { MatchingService } from '../services/MatchingService';
import { useAuth } from '../hooks/useAuth';

const matchingService = new MatchingService();

export const MatchScreen: React.FC<{ exchangeRequestId: string }> = ({ exchangeRequestId }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchMatches = async () => {
      try {
        setLoading(true);
        const potentialMatches = await matchingService.findPotentialMatches(exchangeRequestId);
        setMatches(potentialMatches);
      } catch (error) {
        Alert.alert('Hata', 'Eşleşmeler yüklenirken bir hata oluştu.');
        console.error('Error fetching matches:', error);
      } finally {
        setLoading(false);
      }
    };

    if (exchangeRequestId) {
      fetchMatches();
    }
  }, [exchangeRequestId]);

  const handleAcceptMatch = async (match: Match) => {
    try {
      await matchingService.updateMatchStatus(match.id, 'accepted');
      setMatches(prevMatches =>
        prevMatches.map(m =>
          m.id === match.id ? { ...m, status: 'accepted' } : m
        )
      );
    } catch (error) {
      Alert.alert('Hata', 'Eşleşme kabul edilirken bir hata oluştu.');
      console.error('Error accepting match:', error);
    }
  };

  const handleRejectMatch = async (match: Match) => {
    try {
      await matchingService.updateMatchStatus(match.id, 'rejected');
      setMatches(prevMatches =>
        prevMatches.map(m =>
          m.id === match.id ? { ...m, status: 'rejected' } : m
        )
      );
    } catch (error) {
      Alert.alert('Hata', 'Eşleşme reddedilirken bir hata oluştu.');
      console.error('Error rejecting match:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (matches.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>Henüz potansiyel eşleşme bulunamadı.</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      {matches.map((match) => (
        <View key={match.id} style={styles.matchCard}>
          <View style={styles.matchHeader}>
            <Text style={styles.matchScore}>
              Eşleşme Skoru: %{(match.matchScore * 100).toFixed(1)}
            </Text>
          </View>
          
          <View style={styles.scoreDetails}>
            <Text style={styles.scoreText}>
              Konum Uyumu: %{(match.matchDetails.locationScore * 100).toFixed(1)}
            </Text>
            <Text style={styles.scoreText}>
              Kurum Uyumu: %{(match.matchDetails.institutionScore * 100).toFixed(1)}
            </Text>
            <Text style={styles.scoreText}>
              Departman Uyumu: %{(match.matchDetails.departmentScore * 100).toFixed(1)}
            </Text>
            <Text style={styles.scoreText}>
              Pozisyon Uyumu: %{(match.matchDetails.positionScore * 100).toFixed(1)}
            </Text>
          </View>

          {match.status === 'pending' && (
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={[styles.button, styles.acceptButton]}
                onPress={() => handleAcceptMatch(match)}
              >
                <Text style={styles.buttonText}>Kabul Et</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, styles.rejectButton]}
                onPress={() => handleRejectMatch(match)}
              >
                <Text style={styles.buttonText}>Reddet</Text>
              </TouchableOpacity>
            </View>
          )}

          {match.status === 'accepted' && (
            <View style={[styles.statusBadge, styles.acceptedBadge]}>
              <Text style={styles.statusText}>Kabul Edildi</Text>
            </View>
          )}

          {match.status === 'rejected' && (
            <View style={[styles.statusBadge, styles.rejectedBadge]}>
              <Text style={styles.statusText}>Reddedildi</Text>
            </View>
          )}
        </View>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 16,
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
    padding: 20,
  },
  emptyText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
  },
  matchCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  matchHeader: {
    marginBottom: 12,
  },
  matchScore: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  scoreDetails: {
    marginBottom: 16,
  },
  scoreText: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 8,
  },
  button: {
    flex: 1,
    paddingVertical: 12,
    borderRadius: 8,
    marginHorizontal: 4,
  },
  acceptButton: {
    backgroundColor: '#4CAF50',
  },
  rejectButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
  },
  statusBadge: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginTop: 8,
  },
  acceptedBadge: {
    backgroundColor: '#E8F5E9',
  },
  rejectedBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '600',
  },
}); 