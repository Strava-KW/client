import React, { useEffect, useState } from "react";
import MapView, { Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions } from "react-native";
import * as Location from "expo-location";
import mapStyle from "../constant/mapStyle.json";
import axios from "axios";

export default function EventMap(props) {
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

      axios
        .get(
          `https://maps.googleapis.com/maps/api/geocode/json?address=${props.location}&key=AIzaSyC_bUeG0cXpov1tAARI3M8T1r9-uTD0h4g`
        )
        .then((res) => {
          setEventLocation({
            latitude: res.data.results[0].geometry.location.lat,
            longitude: res.data.results[0].geometry.location.lng,
          });
          setLoading(false)
        });
    })();
  }, []);

  if (loading) return <View><Text>Loading ...</Text></View>
  return (
    <MapView
      style={styles.map}
      customMapStyle={mapStyle}
      showUserLocation={true}
      initialRegion={{
        latitude: eventLocation?.latitude,
        longitude: eventLocation?.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.01,
      }}
    >
      <Marker coordinate={eventLocation} />
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
    width: "100%",
    height: "100%",
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    borderRadius: 30,
  },
});
