import * as React from 'react';
import { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeStackScreen from './screens/HomeStack';
import ProfileScreen from './screens/Profile';
import LoginScreen from './login/LoginScreen';
import SignUpScreen from './login/SignUpScreen';
import VerificationScreen from './login/VerificationScreen';
import AuthContext, { AuthProvider } from './contexts/AuthContext';
import { GeneDataProvider } from './contexts/GeneDataContext';
import { View, ActivityIndicator } from 'react-native';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AppContent = () => {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
          <Tab.Screen name="HomeStack" component={HomeStackScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ headerShown: false, animationEnabled: false }} />
          <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false, animationEnabled: false }} />
          <Stack.Screen name="Verification" component={VerificationScreen} options={{ headerShown: true, title: 'Verify your Email' }} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <GeneDataProvider>
        <AppContent />
      </GeneDataProvider>
    </AuthProvider>
  );
}