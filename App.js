import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {
  Login,
  Register,
  StartRun,
  Leaderboard,
  History,
  Events,
  CreateEvent,
  Community,
  CreateCommunity,
  WaitingList
<<<<<<< HEAD
} from './pages/index'
import BottomNav from './navigations/BottomNav'
=======
} from './pages/index.jsx'
>>>>>>> 42d92b53e2ccc9b566c5236c4d49599071eb0628

const Stack = createStackNavigator()

export default function App() {
  return (
    <PaperProvider>
<<<<<<< HEAD
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Login" component={Login}></Stack.Screen>
          <Stack.Screen name="Register" component={Register}></Stack.Screen>
          <Stack.Screen name="Main" component={BottomNav}></Stack.Screen>
=======
      <NavigationContainer >
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} ></Stack.Screen>
          <Stack.Screen name="Register" component={Register} options={{ headerTitleAlign: 'center' }} ></Stack.Screen>
          <Stack.Screen name="Start Run" component={StartRun}></Stack.Screen>
          <Stack.Screen name="History" component={History}></Stack.Screen>
          <Stack.Screen name="Community" component={Community}></Stack.Screen>
          <Stack.Screen name="Create Community" component={CreateCommunity}></Stack.Screen>
          <Stack.Screen name="Leaderboard" component={Leaderboard}></Stack.Screen>
          <Stack.Screen name="Events" component={Events}></Stack.Screen>
          <Stack.Screen name="Create Event" component={CreateEvent}></Stack.Screen>
          <Stack.Screen name="Waiting List" component={WaitingList}></Stack.Screen>
>>>>>>> 42d92b53e2ccc9b566c5236c4d49599071eb0628
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}