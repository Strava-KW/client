import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Leaderboard, WaitingList, Events, Members } from '../pages/index'
import { useSelector } from 'react-redux'
import EventStack from './EventStack';
import Chat from '../pages/Chat'

const Drawer = createDrawerNavigator()

function CommunityDrawer () {
  const profile = useSelector(state => state.profile)

  return (
    <Drawer.Navigator
      overlayColor="rgba(0, 0, 0, 0.6)"
      drawerStyle={{
        backgroundColor: '#E66E2F',
        borderColor: '#666666'
      }}
      drawerContentOptions={{
        activeTintColor: "black",
        inactiveTintColor: "black",
        labelStyle: {
          color: "#161616",
          fontSize: 20,
          alignSelf: 'center',
          fontFamily: 'Jost',
        }
      }}
    >
      <Drawer.Screen name="Leaderboard" component={Leaderboard} />
      <Drawer.Screen name="Events" component={EventStack} />
      <Drawer.Screen name="Members" component={Members} />
      <Drawer.Screen name="Chat" component={Chat} />
      {/* <Drawer.Screen name="Chat" component={Chat} /> */}
      {
        profile?.role === 'admin' && <Drawer.Screen name="Waiting List" component={WaitingList} /> 
      }
    </Drawer.Navigator>
  )
}

export default CommunityDrawer