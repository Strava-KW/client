import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import {BottomNav} from './src/components'
import { LoginPage , RegisterPage} from './src/pages/index'



const Stack = createStackNavigator()
export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator  initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage}></Stack.Screen>
          <Stack.Screen name="Register" component={RegisterPage}></Stack.Screen>
          <Stack.Screen name="Main" component={BottomNav}  options={{ title: 'Runator' }}></Stack.Screen> 
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}