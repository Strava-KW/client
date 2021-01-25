import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { StyleSheet, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { setProfile } from "../store/actions";
import axios from "../../config/axios";
import MapView from "react-native-maps";

function History() {
  const profile = useSelector((state) => state.profile);
  const access_token = useSelector((state) => state.access_token);
  const [history, setHistory] = useState([]);

  useEffect(() => {
    setHistory(profile.history);
  }, [profile]);

  if (profile) {
    console.log(profile);
  }

  return (
    <ScrollView style={styles.container}>
      {/* <Card style={styles.eventCard}>
        <Card.Content style={styles.mapContainer}>
          <MapView
            style={styles.map}
            initialRegion={{
              latitude: 37.78825,
              longitude: -122.4324,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.0421,
            }}
          ></MapView>
        </Card.Content>
        <Card.Content style={styles.cardContent}>
          <Title style={styles.cardName}>Activity Name</Title>
          <View style={{display: "flex", flexDirection: "row"}}>
            <Paragraph style={styles.cardLocation}>Distance: </Paragraph>
            <Paragraph style={styles.cardDate}>22/1/2021</Paragraph>
          </View>
        </Card.Content>
      </Card> */}
      {history?.map((track, idx) => (
        <Card key={idx} style={styles.eventCard}>
          <Card.Content style={styles.cardContent}>
            {/* <Title style={styles.cardName}>Activity Name</Title> */}
            <View style={{ display: "flex", flexDirection: "row" }}>
              <Paragraph style={styles.cardLocation}>
                Distance: {track.distance}
              </Paragraph>
              <Paragraph style={styles.cardDate}>
                {track.date.slice(0, 10)}
              </Paragraph>
            </View>
          </Card.Content>
        </Card>
      ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#242424",
  },
  mapContainer: {
    width: "100%",
    height: "70%",
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    borderRadius: 10,
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  eventCard: {
    width: 320,
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 10,
    marginBottom: 10,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
    elevation: 2,
    backgroundColor: "#323232",
  },
  cardContent: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },
  cardName: {
    color: "#FA8135",
    fontFamily: "Jost",
    fontSize: 21,
    paddingTop: 5,
  },
  cardLocation: {
    flex: 3,
    color: "#FA8135",
    fontFamily: "Jost",
  },
  cardDate: {
    flex: 1,
    color: "#FA8135",
    fontFamily: "Jost",
  },
});

export default History;
