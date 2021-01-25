import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
// import * as TaskManager from 'expo-task-manager'
import mapStyle from '../constant/mapStyle.json'

export default function RunTracker( props ) {
  const [errorMsg, setErrorMsg] = useState(null);
  const [location, setLocation] = useState([]);
  const [locationNow, setLocationNow] = useState(null);
  // const TASK_FETCH = 'runInBackground'
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
    })();
  }, []);

  useEffect(() => {
    props.setLocation(location)
  }, [location])

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
      <View>
        <MapView
          style={styles.map}
          customMapStyle={mapStyle}
          showUserLocation={true}
          region={
            {
              latitude: locationNow?.latitude,
              longitude: locationNow?.longitude,
              latitudeDelta: 0.01,
              longitudeDelta: 0.001
            }
          }
        > 
          <Marker coordinate={locationNow}>
            <Image
              source={require("../../assets/runningwomen.png")}
              style={{ height: 35, width: 35 }}
            />
          </Marker>
          <Polyline
            coordinates={location}
            strokeWidth={2}
            strokeColor="#107869" //98D7C2,167D7F,107869,08313A,1A5653
            lineCap="round"
            lineJoin="miter"
          />
        </MapView>
        <View
          style={{
            position: "absolute",
            top: "1%",
            backgroundColor: "rgba(52, 52, 52, 0.7)",
            alignSelf: "center",
            justifyContent: "center",
            width: Dimensions.get("window").width - 100,
            height: 40,
          }}
        >
          <Text style={{ alignSelf: "center", color: "#FA8135" }}>
            Distance: {((location.length / 100) - 0.01).toFixed(2)} km
          </Text>
        </View>
      </View>
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
    width: Dimensions.get("window").width,
    height: Dimensions.get("window").height,
  },
});
