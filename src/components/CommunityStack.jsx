import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommunityDrawer from "./CommunityDrawer";
import { Community } from "../pages";

const Stack = createStackNavigator();

function CommunityStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Community"
        component={Community}
        options={{ headerShown: false }}
      />

      <Stack.Screen
        name="Community Drawer"
        component={CommunityDrawer}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

export default CommunityStack;
