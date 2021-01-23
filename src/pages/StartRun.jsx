import React from 'react';
import { View, Text, StyleSheet } from 'react-native'
import { RunTracker } from '../components'
import { Button } from 'react-native-paper'
import { MaterialIcons } from '@expo/vector-icons'; 

function StartRun () {
  return (
    <>
      <View>
        <RunTracker/>
        <View
          style={{
              position: 'absolute',//use absolute position to show button on top of the map
              top: '60%', //for center align
              alignSelf: 'center' //for align to right
          }}
        >
          <Button
            mode="contained"
            color="#FA8135"
            compact={true} 
            style={styles.playButton}
            contentStyle={{
              height: 70,
              width: 70
            }}
            labelStyle={{
              fontFamily: 'Jost',
              fontSize: 16
            }}
          >
            START
          </Button>
        </View>
      </View>
    </>
  )
}

const styles = StyleSheet.create({
  playButton: {
    borderRadius: 100
  }
})

export default StartRun