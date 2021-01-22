import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

function Events () {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Events</Title>
      <ScrollView style={styles.eventContainer}>
        <Card style={styles.eventCard}>
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
            <Title style={styles.cardName}>Event Name</Title>
            <View style={{display: "flex", flexDirection: "row"}}>
              <Paragraph style={styles.cardLocation}>Location</Paragraph>
              <Paragraph style={styles.cardDate}>22/1/2021</Paragraph>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.eventCard}>
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
            <Title style={styles.cardName}>Event Name</Title>
            <View style={{display: "flex", flexDirection: "row"}}>
              <Paragraph style={styles.cardLocation}>Location</Paragraph>
              <Paragraph style={styles.cardDate}>22/1/2021</Paragraph>
            </View>
          </Card.Content>
        </Card>
        <Card style={styles.eventCard}>
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
            <Title style={styles.cardName}>Event Name</Title>
            <View style={{display: "flex", flexDirection: "row"}}>
              <Paragraph style={styles.cardLocation}>Location</Paragraph>
              <Paragraph style={styles.cardDate}>22/1/2021</Paragraph>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
      {/* <BottomNav /> */}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#52565e',
  },
  mapContainer: {
    width : '100%',
    height : '70%',
    paddingTop : 0,
    paddingRight : 0,
    paddingLeft : 0,
    borderRadius: 10
  },
  eventContainer: {
    height: '70%',
    backgroundColor: '#32363e',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    alignSelf: "center",
    padding: 15,
    color: "#f48924"
  },  
  map: {
    flex: 1,
    borderRadius: 10
  },
  eventCard: {
    height: 240,
    width: 320,
    borderRadius: 10,
    marginHorizontal: 25,
    marginTop: 40,
    marginBottom: 10,
    resizeMode: 'cover',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.40,
    shadowRadius: 2.50,
    elevation: 2,
  },
  cardContent: {
    backgroundColor: "#f48924",
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  cardName: {
    color: "#42464e"
  },
  cardLocation: {
    flex: 2,
    color: "#42464e"
  },
  cardDate: {
    flex: 1,
    color: "#42464e",
  }
});


export default Events