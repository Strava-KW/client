import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import CommunityDrawer from "./CommunityDrawer";
import GooglePlacesInput from "./GooglePlacesInput";
import { Community } from "../pages";
import { useSelector } from "react-redux";

const Stack = createStackNavigator();

function CommunityStack() {
  const profile = useSelector((state) => state.profile);

  if (profile) {
    return (
      <Stack.Navigator>
        {profile.communityId ? (
          <Stack.Screen
            name="Community Drawer"
            component={CommunityDrawer}
            options={{ headerShown: false }}
          />
        ) : (
          <Stack.Screen
            name="Community"
            component={Community}
            options={{ headerShown: false }}
          />
        )}
        <Stack.Screen
          name="GoogleSearch"
          component={GooglePlacesInput}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    );
  }
}

export default CommunityStack;
