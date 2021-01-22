import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Leaderboard, WaitingList, Events } from '../pages/index'

const Drawer = createDrawerNavigator()

function CommunityDrawer () {
  return (
    <Drawer.Navigator>
      <Drawer.Screen name="Leaderboard" component={Leaderboard} />
      <Drawer.Screen name="Events" component={Events} />
      <Drawer.Screen name="Waiting List" component={WaitingList} />
    </Drawer.Navigator>
  )
}

export default CommunityDrawer