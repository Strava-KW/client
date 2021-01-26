import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { Leaderboard, WaitingList, Events, Members } from '../pages/index'
import { useSelector } from 'react-redux'
import EventStack from './EventStack';

const Drawer = createDrawerNavigator()

function CommunityDrawer () {
  const profile = useSelector(state => state.profile)

  return (
    <Drawer.Navigator
      overlayColor="transparent"
      drawerStyle={{
        backgroundColor: '#323232',
      }}
      drawerContentOptions={{
        activeTintColor: "#DA6115",
        labelStyle: {
          color: "#FA8135",
          fontSize: 20,
          alignSelf: 'center',
          fontFamily: 'Jost'
        }
      }}
    >
      <Drawer.Screen name="Leaderboard" component={Leaderboard} />
      <Drawer.Screen name="Events" component={EventStack} />
      <Drawer.Screen name="Members" component={Members} />
      {
        profile?.role === 'admin' && <Drawer.Screen name="Waiting List" component={WaitingList} /> 
      }
    </Drawer.Navigator>
  )
}

export default CommunityDrawer