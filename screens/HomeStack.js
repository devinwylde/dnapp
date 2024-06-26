import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './Home';
import GeneDetails from './GeneDetails';

const HomeStack = createStackNavigator();

export default function HomeStackScreen() {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false }}
      />
      <HomeStack.Screen
        name="GeneDetails"
        component={GeneDetails}
        options={{ headerShown: true, title: 'Gene Details' }}
      />
    </HomeStack.Navigator>
  );
}