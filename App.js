import React from "react";
import { Provider as PaperProvider } from "react-native-paper";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import theme from "./config/theme";
import { useFonts } from "expo-font";
import { BottomNav } from "./src/components";
import { LoginPage, RegisterPage } from "./src/pages/index";

const Stack = createStackNavigator();
export default function App() {
  const [loaded] = useFonts({
    Jost: require("./assets/Jost.ttf"),
  });

  if (!loaded) {
    return null;
  }

  return (
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
            options={{
              headerStyle: {
                backgroundColor: "#42464E",
              },
              headerTintColor: "#FA8135",
              headerTitleStyle: {
                alignSelf: "center",
                fontFamily: "Jost",
                fontSize: 24,
              },
            }}
          ></Stack.Screen>
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
