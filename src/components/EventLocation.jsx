import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import Loader from './Loader';
import * as Location from "expo-location";
// import * as TaskManager from 'expo-task-manager'
import mapStyle from "../constant/mapStyle.json";
import axios from "axios";
import MapViewDirections from "react-native-maps-directions";
import Toast from 'react-native-toast-message';

export default function EventLocation(props) {
  const [location, setLocation] = useState([]);
  const [locationNow, setLocationNow] = useState({latitude: 0, longitude:0});
  const [loading, setLoading] = useState(true)
  const [eventLocation, setEventLocation] = useState({
    latitude: 0,
    longitude: 0,
    latitudeDelta: 0.015,
    longitudeDelta: 0.01
  });

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }
      await Location.watchPositionAsync(
        {
          accuracy: Location.Accuracy.Highest,
          distanceInterval: 10,
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
          `https://maps.googleapis.com/maps/api/geocode/json?address=${props.route.params.location}&key=AIzaSyC_bUeG0cXpov1tAARI3M8T1r9-uTD0h4g`
        )
        .then((res) => {
          setEventLocation({
            latitude: res.data.results[0].geometry.location.lat,
            longitude: res.data.results[0].geometry.location.lng,
          });
          setLoading(false)
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

  if (props.route.params) {
    console.log(props.route.params)
    console.log(eventLocation)
  }

  if (loading) return <Loader /> // styling

  return (
    <MapView
      style={styles.map}
      customMapStyle={mapStyle}
      showUserLocation={true}
      region={{
        latitude: locationNow?.latitude,
        longitude: locationNow?.longitude,
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
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
