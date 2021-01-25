import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, Image, Dimensions } from "react-native";
import { RunTracker } from "../components";
import { Button } from "react-native-paper";
import { MaterialIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from 'react-redux';
import { setProfile, setError } from '../store/actions'
import axios from '../../config/axios'

function StartRun({ route, Navigation }) {
  const [ showMap, setShowMap ] = useState(false)
  const [ locationRun, setLocationRun ] = useState([])
  const dispatch = useDispatch()
  const access_token = useSelector(state => state.access_token)


  useEffect(() => {
    axios({
      url: '/profile',
      method: 'GET',
      headers: {
        access_token
      }
    })
      .then(res => {
        dispatch(setProfile(res.data))
      })
      .catch(err => {
        dispatch(setError(err.response.data))
      })
  }, [])

  function setLocation (location) {
    setLocationRun(location)
  }

  function trackRun () {
    axios({
      url: '/history',
      method: 'POST',
      headers: {
        access_token
      },
      data: {
        distance: (locationRun.length/100),
        date: new Date()
      }
    })
      .then(res => {
        return axios({
          url: '/profile',
          method: 'GET',
          headers: {
            access_token
          }
        })
      })
      .then(res => {
        dispatch(setProfile(res.data))
        setShowMap(false)
      })
      .catch(err => {
        setShowMap(false)
      })
  }

  if (showMap) {
    return (
      <View>
        <RunTracker 
          setLocation={setLocation}
        />
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
            onPress={() => trackRun()}
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
