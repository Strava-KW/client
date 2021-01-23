import React, { useState } from 'react';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { StartRun, History, Community } from '../pages'


const Tab = createMaterialBottomTabNavigator()

function BottomNav () {
  return (
    <Tab.Navigator
      initialRouteName="Start"
      activeColor="#f48924"
      labelStyle={{ fontSize: 12 }}
      style={{ backgroundColor: '#e91e63' }}
    >
      <Tab.Screen
        name="Community"
        component={Community}
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
          tabBarLabel:'History',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="history" color={color} size={26} />
          ),
        }}
      />
    </Tab.Navigator>
  )
}

export default BottomNav