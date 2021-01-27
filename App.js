import React, { useState } from "react";
import { Provider } from "react-redux";
import store from "./src/store/index";

import { Provider as PaperProvider } from "react-native-paper";
import theme from "./config/theme";
import { useFonts } from "expo-font";
import AppStack from './src/components/AppStack'


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
        <AppStack />
      </PaperProvider>
    </Provider>
  );
}
