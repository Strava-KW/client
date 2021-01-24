import React, { useState } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { RunTracker } from "../components";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector } from 'react-redux'

function StartRun({ route, Navigation }) {
  const [ showMap, setShowMap ] = useState(false)
  
  if (showMap) {
    return (
      <View>
        <RunTracker />
        <View
          style={{
            position: "absolute",
            top: "60%",
            alignSelf: "center",
          }}
        >
          <Button
            mode="contained"
            color="#FA8135"
            compact={true}
            style={styles.playButton}
            contentStyle={{
              height: 80,
              width: 80,
            }}
            labelStyle={{
              fontFamily: "Jost",
              fontSize: 16,
            }}
            onPress={() => setShowMap(false)}
          >
            STOP
          </Button>
        </View>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Image source={require("../../assets/icon.png")} style={styles.icon} />
      <View
        style={{
          position: "absolute", //use absolute position to show button on top of the map
          top: "80%", //for center align
          alignSelf: "center", //for align to right
        }}
      >
        <Button
          mode="contained"
          color="#FA8135"
          compact={true}
          style={styles.playButton}
          contentStyle={{
            height: 80,
            width: 80,
          }}
          labelStyle={{
            fontFamily: "Jost",
            fontSize: 16,
          }}
          onPress={() => setShowMap(true)}
        >
          START
        </Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#242424',
  },
  playButton: {
    borderRadius: 100,
  },
  icon: {
    width: 250,
    height: 250,
    margin: 15,
  },
});

export default StartRun;
