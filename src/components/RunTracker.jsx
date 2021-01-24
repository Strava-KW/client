import React, {useEffect, useState} from 'react'
import MapView, {Polyline, Marker } from 'react-native-maps'
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import * as Location from 'expo-location';
// import * as TaskManager from 'expo-task-manager'
import {mapStyle} from '../constant/mapStyle.json'

export default function RunTracker() {
  const [initialLocation, setInitialLocation] = useState(null)
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState([]);
  const [locationNow, setLocationNow] = useState(null)
  // const TASK_FETCH = 'runInBackground'
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      } else {
        const initialLoc = await Location.getCurrentPositionAsync({})
        setInitialLocation(initialLoc)
      }
      
      // await Location.startLocationUpdatesAsync(TASK_FETCH, {
      //   accuracy: Location.Accuracy.Highest,
      //   distanceInterval: 1
      // })

      await Location.watchPositionAsync(
      {
        accuracy: Location.Accuracy.Highest,
        distanceInterval: 1
      }, (loc) => {
        setLocationNow({
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        })
        setLocation(data => [...data, {
          latitude: loc.coords.latitude,
          longitude: loc.coords.longitude
        }])})
    })();

  }, []);

  let text = 'Waiting..';
  if (errorMsg) {
    text = errorMsg;
  } else if (initialLocation) {
    text = JSON.stringify(initialLocation);
  }

  // TaskManager.defineTask(TASK_FETCH, ({ data, error }) => {
  //   if (error) {
  //     // Error occurred - check `error.message` for more details.
  //     return;
  //   }
  //   if (data) {
  //     console.log(data)
  //   }
  // });


  if (location && initialLocation && locationNow) {
    return (
      <View>
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          showUserLocation={true}
          initialRegion={
            {
              latitude: initialLocation?.coords?.latitude,
              longitude: initialLocation?.coords?.longitude,
              latitudeDelta: 0.015,
              longitudeDelta: 0.01
            }
          }
        > 
          <Marker
            coordinate={locationNow}
          />
          <Polyline 
            coordinates={location}
            strokeWidth={6}
            strokeColor="#00a8ff"
            lineCap="round"
            lineJoin="miter"
          />
        </MapView>
        <View
          style={{
            position: "absolute",
            top: "1%",
            backgroundColor: 'rgba(52, 52, 52, 0.7)',
            alignSelf: "center",
            justifyContent: 'center',
            width: (Dimensions.get("window").width - 100),
            height: 40
          }}
        >
          <Text style={{ alignSelf: 'center', color: "#FA8135" }}>Distance: {location.length/1000} km</Text>
        </View>
      </View>
    )
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.paragraph}>{text}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});