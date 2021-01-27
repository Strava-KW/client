import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./src/store/index";

import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import theme from "./config/theme";
import { useFonts } from "expo-font";
import { BottomNav } from "./src/components";
import { LoginPage, RegisterPage, Settings } from "./src/pages/index";
import { IconButton } from "react-native-paper";

const Stack = createStackNavigator();

export default function App() {
  const [loaded] = useFonts({
    Jost: require("./assets/Jost.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
    <Provider store={store}>
      <PaperProvider theme={theme}>
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
                  backgroundColor: "#323232",
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
                    icon="cog"
                    color="grey"
                    size={28}
                    onPress={() => {
                      navigation.navigate("Settings");
                    }}
                  />
                ),
              })}
            ></Stack.Screen>
            <Stack.Screen
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
            ></Stack.Screen>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
