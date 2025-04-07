import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  News: undefined;
  Forum: undefined;
  CreateRequest: undefined;
};

export type AuthStackNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export type ExchangeRequest = {
  id: string;
  title: string;
  description: string;
  fromLocation: string;
  toLocation: string;
  department: string;
  institution: string;
  date: string;
  status: 'Aktif' | 'Beklemede' | 'Tamamlandı';
};

export type Match = {
  id: string;
  title: string;
  matchTitle: string;
  fromLocation: string;
  toLocation: string;
  department: string;
  institution: string;
  date: string;
  status: 'Eşleşme Bekliyor' | 'Eşleşme Bulundu';
  matchPercentage: number;
};

export type NewsItem = {
  id: string;
  title: string;
  description: string;
  image: string;
  date: string;
  category: string;
};

export type ForumPost = {
  id: string;
  title: string;
  content: string;
  author: string;
  date: string;
  likes: number;
  comments: number;
  tags: string[];
};

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  institution: string;
  department: string;
  location: string;
  avatar: string | null;
} 