import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { Events } from "../pages";
import EventLocation from "./EventLocation";

const Stack = createStackNavigator()

function EventStack () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Events" component={Events} options={{ headerShown: false }}></Stack.Screen>
      <Stack.Screen name="Event Location" component={EventLocation} options={{ headerShown: false }}></Stack.Screen>
    </Stack.Navigator>
  )
}

export default EventStack