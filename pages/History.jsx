import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';
import MapView from 'react-native-maps';

function History () {
  return (
    <ScrollView style={styles.container}>
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
          <Title style={styles.cardName}>Activity Name</Title>
          <View style={{display: "flex", flexDirection: "row"}}>
            <Paragraph style={styles.cardLocation}>Distance: </Paragraph>
            <Paragraph style={styles.cardDate}>22/1/2021</Paragraph>
          </View>
        </Card.Content>
      </Card>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#42464E',
  },
  mapContainer: {
    width : '100%',
    height : '70%',
    paddingTop : 0,
    paddingRight : 0,
    paddingLeft : 0,
    borderRadius: 10
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
    alignSelf: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.40,
    shadowRadius: 2.50,
    elevation: 2,
    backgroundColor: "#2F3238",
  },
  cardContent: {
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10
  },
  cardName: {
    color: "#FA8135"
  },
  cardLocation: {
    flex: 3,
    color: "#FA8135"
  },
  cardDate: {
    flex: 1,
    color: "#FA8135",
  }
})

export default History