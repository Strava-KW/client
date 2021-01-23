import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Leaderboard, WaitingList, Events, Members } from '../pages/index'

const Drawer = createDrawerNavigator()

function CommunityDrawer () {
  return (
    <Drawer.Navigator
      overlayColor="transparent"
      drawerStyle={{
        backgroundColor: '#42464e',
      }}
      drawerContentOptions={{
        activeTintColor: "#DA6115",
        labelStyle: {
          color: "#FA8135",
          fontSize: 20,
          alignSelf: 'center',
          fontWeight: 'bold'
        }
      }}
    >
      <Drawer.Screen name="Leaderboard" component={Leaderboard} />
      <Drawer.Screen name="Events" component={Events} />
      <Drawer.Screen name="Members" component={Members} />
      <Drawer.Screen name="Waiting List" component={WaitingList} />
    </Drawer.Navigator>
  )
}

export default CommunityDrawer