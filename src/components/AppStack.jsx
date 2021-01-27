import React from 'react'
import BottomNav from "./BottomNav";
import { LoginPage, RegisterPage, Settings } from "../pages/index";
import { IconButton } from "react-native-paper";
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setError, setGoogleAccessToken, setCommunities, setProfile } from '../store/actions';
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import * as Google from "expo-google-app-auth";

const Stack = createStackNavigator();

function AppStack () {
  const access_token = useSelector(state => state.access_token)
  const dispatch = useDispatch()
  const google_access_token = useSelector(state => state.google_access_token)
  const androidClientId = "33938517114-lsqdhqjb66cu4l7qs7nlo7d7oaj14qfv.apps.googleusercontent.com"
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginPage}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Register"
          component={RegisterPage}
          options={{
            headerShown: false,
          }}
        ></Stack.Screen>
        <Stack.Screen
          name="Runator"
          component={BottomNav}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#161616",
            },
            headerTintColor: "#FA8135",
            headerTitleStyle: {
              paddingLeft: 60,
              alignSelf: "center",
              fontFamily: "Jost",
              fontSize: 24,
            },
            headerRight: () => (
              <IconButton
                icon="logout"
                color="grey"
                size={28}
                onPress={ async () => {
                  try {
                    // dispatch(setCommunities(null))
                    // dispatch(setProfile(null))
                    if (google_access_token) {
                      await Google.logOutAsync({ accessToken: google_access_token, androidClientId })
                      dispatch(setGoogleAccessToken(null))
                      dispatch(setAccessToken(null))
                    }
                    else {
                      dispatch(setAccessToken(null))
                    }
                    dispatch(setError(null))
                    console.log('logout with no error')
                    await navigation.replace('Login')
                  }
                  catch(err) {
                    console.log(err, '<=== logout with error')
                    dispatch(setError(err))
                  }
                }}
              />
            ),
          })}
        ></Stack.Screen>
        {/* <Stack.Screen
          name="Settings"
          component={Settings}
          options={({ navigation }) => ({
            headerStyle: {
              backgroundColor: "#323232",
            },
            headerTintColor: "#FA8135",
            headerTitleStyle: {
              alignSelf: "center",
              fontFamily: "Jost",
              fontSize: 24,
            },
          })}
        ></Stack.Screen> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default AppStack