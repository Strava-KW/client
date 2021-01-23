import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StartRun, History, Community } from '../pages/index'
import CommunityStack from './CommunityStack'

const Tab = createMaterialBottomTabNavigator()

function BottomNav () {
  return (
    <Tab.Navigator
      initialRouteName="Start"
      activeColor="#FA8135"
      labelStyle={{ fontSize: 10 }}
      barStyle={{ 
        backgroundColor: "#42464e",
        paddingBottom: 5,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: -5,
        },
        shadowOpacity: 0.5,
        shadowRadius: 6.5,
        
        elevation: 10,
      }}
    >
      <Tab.Screen
        name="Community"
        component={CommunityStack}
        options={{
          tabBarLabel:'Community',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="account-multiple" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="Start"
        component={StartRun}
        options={{
          tabBarLabel:'Start',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="play-circle" color={color} size={26} />
          ),
        }}
      />
      <Tab.Screen
        name="History"
        component={History}
        options={{
          title: 'History',
          tabBarLabel: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNav