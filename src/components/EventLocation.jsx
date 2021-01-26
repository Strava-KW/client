import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
// import * as TaskManager from 'expo-task-manager'
import mapStyle from "../constant/mapStyle.json";
import axios from "axios";
import MapViewDirections from "react-native-maps-directions";
import Toast from 'react-native-toast-message';

export default function EventLocation(props, { navigation }) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState([]);
  const [locationNow, setLocationNow] = useState(null);
  // const TASK_FETCH = 'runInBackground'
  const [eventLocation, setEventLocation] = useState({});

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      // await Location.startLocationUpdatesAsync(TASK_FETCH, {
      //   accuracy: Location.Accuracy.Highest,
      //   distanceInterval: 1
      // })

      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 1,
        },
        (loc) => {
          setLocationNow({
            latitude: loc.coords.latitude,
            longitude: loc.coords.longitude,
          });
          setLocation((data) => [
            ...data,
            {
              latitude: loc.coords.latitude,
              longitude: loc.coords.longitude,
            },
          ]);
        }
      );
      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${props.location}&key=AIzaSyC_bUeG0cXpov1tAARI3M8T1r9-uTD0h4g`
        )
        .then((res) => {
          setEventLocation({
            latitude: res.data.results[0].geometry.location.lat,
            longitude: res.data.results[0].geometry.location.lng,
          });
        })
        .catch(err => {
          Toast.show({
            type: 'error',
            position: 'top',
            text1: "Event location is not found on the map",
            visibilityTime: 2000,
            autoHide: true,
            topOffset: 30,
            bottomOffset: 40,
          }); 
          navigation.navigate("Runator")
        });
    })();
  }, []);

  let text = "Waiting..";
  if (errorMsg) {
    text = errorMsg;
  } else if (locationNow) {
    text = JSON.stringify(locationNow);
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

  if (location && locationNow) {
    return (
      <MapView
        style={styles.map}
        customMapStyle={mapStyle}
        showUserLocation={true}
        region={{
          latitude: locationNow.latitude,
          longitude: locationNow.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.01,
        }}
      >
        <Marker coordinate={eventLocation} />
        <Marker coordinate={locationNow} />
        <MapViewDirections
          origin={locationNow}
          destination={eventLocation}
          apikey="AIzaSyC_bUeG0cXpov1tAARI3M8T1r9-uTD0h4g"
          strokeWidth={2}
          strokeColor="#FA8135"
        />
      </MapView>
    );
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
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    borderRadius: 30,
  },
});
