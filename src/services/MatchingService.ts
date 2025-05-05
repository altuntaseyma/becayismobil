import { collection, query, where, getDocs, addDoc, Timestamp, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ExchangeRequest, Match } from '../types/database';

export class MatchingService {
  private readonly MATCH_COLLECTION = 'matches';
  private readonly EXCHANGE_REQUEST_COLLECTION = 'exchangeRequests';

  private calculateLocationScore(request1: ExchangeRequest, request2: ExchangeRequest): number {
    const isTargetMatch = request1.targetCities.some(target => 
      target.il === request2.currentCity && target.ilce === request2.currentDistrict
    );
    const isReverseMatch = request2.targetCities.some(target => 
      target.il === request1.currentCity && target.ilce === request1.currentDistrict
    );

    if (isTargetMatch && isReverseMatch) return 1;
    if (isTargetMatch || isReverseMatch) return 0.7;
    return 0;
  }

  private calculateInstitutionScore(request1: ExchangeRequest, request2: ExchangeRequest): number {
    return request1.institution === request2.institution ? 1 : 0;
  }

  private calculateDepartmentScore(request1: ExchangeRequest, request2: ExchangeRequest): number {
    return request1.department === request2.department ? 1 : 0;
  }

  private calculatePositionScore(request1: ExchangeRequest, request2: ExchangeRequest): number {
    return request1.position === request2.position ? 1 : 0;
  }

  private calculateTotalScore(scores: { [key: string]: number }): number {
    const weights = {
      location: 0.4,
      institution: 0.3,
      department: 0.2,
      position: 0.1
    };

    return Object.entries(scores).reduce((total, [key, score]) => {
      return total + (score * weights[key as keyof typeof weights]);
    }, 0);
  }

  async findPotentialMatches(requestId: string): Promise<Match[]> {
    try {
      const requestDoc = await getDoc(doc(db, this.EXCHANGE_REQUEST_COLLECTION, requestId));
      if (!requestDoc.exists()) throw new Error('Exchange request not found');
      
      const request = requestDoc.data() as ExchangeRequest;
      
      const activeRequestsQuery = query(
        collection(db, this.EXCHANGE_REQUEST_COLLECTION),
        where('isActive', '==', true),
        where('userId', '!=', request.userId)
      );
      
      const activeRequests = await getDocs(activeRequestsQuery);
      const potentialMatches: Match[] = [];

      activeRequests.forEach(doc => {
        const potentialMatch = doc.data() as ExchangeRequest;
        
        const scores = {
          location: this.calculateLocationScore(request, potentialMatch),
          institution: this.calculateInstitutionScore(request, potentialMatch),
          department: this.calculateDepartmentScore(request, potentialMatch),
          position: this.calculatePositionScore(request, potentialMatch)
        };

        const totalScore = this.calculateTotalScore(scores);
        
        if (totalScore >= 0.7) {
          potentialMatches.push({
            id: '',
            requestId1: requestId,
            requestId2: doc.id,
            userId1: request.userId,
            userId2: potentialMatch.userId,
            status: 'pending',
            matchScore: totalScore,
            matchDetails: {
              locationScore: scores.location,
              institutionScore: scores.institution,
              departmentScore: scores.department,
              positionScore: scores.position
            },
            createdAt: new Date(),
            updatedAt: new Date()
          });
        }
      });

      return potentialMatches;
    } catch (error) {
      console.error('Error finding potential matches:', error);
      throw error;
    }
  }

  async createMatch(match: Omit<Match, 'id'>): Promise<string> {
    try {
      const matchRef = await addDoc(collection(db, this.MATCH_COLLECTION), {
        ...match,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      
      return matchRef.id;
    } catch (error) {
      console.error('Error creating match:', error);
      throw error;
    }
  }

  async updateMatchStatus(matchId: string, status: Match['status']): Promise<void> {
    try {
      const matchRef = doc(db, this.MATCH_COLLECTION, matchId);
      await updateDoc(matchRef, {
        status,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating match status:', error);
      throw error;
    }
  }

  async getUserMatches(userId: string): Promise<Match[]> {
    try {
      const q1 = query(
        collection(db, this.MATCH_COLLECTION),
        where('userId1', '==', userId)
      );
      const q2 = query(
        collection(db, this.MATCH_COLLECTION),
        where('userId2', '==', userId)
      );

      const [snap1, snap2] = await Promise.all([getDocs(q1), getDocs(q2)]);
      
      return [
        ...snap1.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match)),
        ...snap2.docs.map(doc => ({ id: doc.id, ...doc.data() } as Match))
      ];
    } catch (error) {
      console.error('Error getting user matches:', error);
      throw error;
    }
  }
} 