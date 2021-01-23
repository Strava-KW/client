import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

function Events () {
  return (
    <View style={styles.container}>
      <Title style={styles.title}>Events</Title>
      <ScrollView style={styles.eventContainer}>
        <Card style={styles.eventCard}>
          <Card.Content style={styles.mapContainer}>
            <MapView
              style={styles.map}
              region={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              scrollEnabled={false}
              pitchEnabled={false}
              minZoomLevel={13}
              zoomEnabled={true}
            >
              <Marker 
                coordinate={{
                  latitude: 37.78825,
                  longitude: -122.4324,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
              />
            </MapView>
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
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#42464e',
  },
  mapContainer: {
    width : '100%',
    height : '70%',
    paddingTop : 0,
    paddingRight : 0,
    paddingLeft : 0,
    borderRadius: 30
  },
  eventContainer: {
    height: '70%',
    backgroundColor: '#2F3238',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    alignSelf: "center",
    padding: 15,
    fontSize: 25,
    color: "#FA8135",
    fontFamily: 'Jost'
  },  
  map: {
    flex: 1,
    borderRadius: 10
  },
  eventCard: {
    height: 240,
    width: 320,
    borderRadius: 20,
    marginHorizontal: 25,
    marginTop: 30,
    marginBottom: 5,
    alignSelf: 'center',
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
    backgroundColor: "#FA8135",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30
  },
  cardName: {
    fontSize: 24,
    alignContent: 'center',
    paddingTop: 10,
    color: "#2F3238",
    fontFamily: 'Jost'
  },
  cardLocation: {
    fontSize: 16,
    flex: 3,
    color: "#2F3238",
    fontFamily: 'Jost'
  },
  cardDate: {
    fontSize: 14,
    flex: 1,
    color: "#2F3238",
    fontFamily: 'Jost'
  }
});


export default Events