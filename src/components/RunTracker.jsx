import React, { useEffect, useState } from "react";
import MapView, { Polyline, Marker } from "react-native-maps";
import { StyleSheet, Text, View, Dimensions, Image } from "react-native";
import * as Location from "expo-location";
// import * as TaskManager from 'expo-task-manager'

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

  /** MAP STYLE */
  const mapStyle = [
    {
      elementType: "geometry",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#242f3e",
        },
      ],
    },
    {
      featureType: "administrative.locality",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "geometry",
      stylers: [
        {
          color: "#263c3f",
        },
      ],
    },
    {
      featureType: "poi.park",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#6b9a76",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry",
      stylers: [
        {
          color: "#38414e",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#212a37",
        },
      ],
    },
    {
      featureType: "road",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#9ca5b3",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [
        {
          color: "#746855",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "geometry.stroke",
      stylers: [
        {
          color: "#1f2835",
        },
      ],
    },
    {
      featureType: "road.highway",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#f3d19c",
        },
      ],
    },
    {
      featureType: "transit",
      elementType: "geometry",
      stylers: [
        {
          color: "#2f3948",
        },
      ],
    },
    {
      featureType: "transit.station",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#d59563",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.fill",
      stylers: [
        {
          color: "#515c6d",
        },
      ],
    },
    {
      featureType: "water",
      elementType: "labels.text.stroke",
      stylers: [
        {
          color: "#17263c",
        },
      ],
    },
  ];

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
            Distance: {location.length / 1000} km
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
