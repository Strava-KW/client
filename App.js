import React from 'react';
import { Provider as PaperProvider } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
<<<<<<< HEAD
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
} from './pages/index';
import BottomNav from './navigations/BottomNav';
import theme from './config/theme'
import { useFonts } from 'expo-font'
=======
>>>>>>> 55dffb66fcc9787c2a1ee10ff3e35a17a1a4a5eb

import {BottomNav} from './src/components'
import { LoginPage , RegisterPage} from './src/pages/index'



const Stack = createStackNavigator()
export default function App() {
  const [loaded] = useFonts({
    'Jost': require('./assets/Jost.ttf'),
  });

  if (!loaded) {
    return null;
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
<<<<<<< HEAD
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={Login}
            options={{
              headerShown: false
            }}
          ></Stack.Screen>
          <Stack.Screen 
            name="Register" 
            component={Register}
            options={{
              headerShown: false
            }}
          ></Stack.Screen>
          <Stack.Screen 
            name="Runator" 
            component={BottomNav}
            options={{
              headerStyle: {
                backgroundColor: '#42464E'
              },
              headerTintColor: '#FA8135',
              headerTitleStyle: {
                alignSelf: 'center',
                fontFamily: 'Jost',
                fontSize: 24
              }
            }}
          ></Stack.Screen>
=======
        <Stack.Navigator  initialRouteName="Login">
          <Stack.Screen name="Login" component={LoginPage}></Stack.Screen>
          <Stack.Screen name="Register" component={RegisterPage}></Stack.Screen>
          <Stack.Screen name="Main" component={BottomNav}  options={{ title: 'Runator' }}></Stack.Screen> 
>>>>>>> 55dffb66fcc9787c2a1ee10ff3e35a17a1a4a5eb
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>

  );
}