import { NavigatorScreenParams } from '@react-navigation/native';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  MainTabs: undefined;
  News: undefined;
  Forum: undefined;
  CreatePost: undefined;
  PostDetail: { postId: string };
  CreateRequest: undefined;
  EditProfile: undefined;
  Matches: undefined;
  ChatScreen: { matchId: string };
  ChatbotScreen: undefined;
  NotificationScreen: undefined;
};

export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  MainTabs: undefined;
};

export type MainTabParamList = {
  'Ana Sayfa': undefined;
  'Değişim': undefined;
  'Talepler': undefined;
  'Profil': undefined;
};

export type AuthStackNavigationProp = NativeStackNavigationProp<AuthStackParamList>;
export type MainTabNavigationProp = BottomTabNavigationProp<MainTabParamList>;

export type RegisterScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Register'>;
};

export type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

export type HomeScreenProps = NativeStackScreenProps<RootStackParamList, 'Home'>;
export type ProfileScreenProps = {
  navigation: NativeStackNavigationProp<MainTabParamList, 'Profile'>;
};

export type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

export type EditProfileScreenProps = {
  navigation: NativeStackNavigationProp<MainTabParamList, 'Profile'>;
};

export type RootStackNavigationProp = NativeStackNavigationProp<RootStackParamList>; 