import React, { useEffect } from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Avatar, Button, Card, Title, Paragraph } from 'react-native-paper';
import { StyleSheet, Dimensions } from 'react-native';
import EventLocation from '../components/EventLocation';
import { useSelector, useDispatch } from 'react-redux'
import { fetchCommunity } from '../store/actions'

function Events () {
  const dispatch = useDispatch()
  const communities = useSelector(state => state.communities)
  const access_token = useSelector(state => state.access_token)

  useEffect(() => {
    if (access_token) {
      dispatch(fetchCommunity(access_token))
    }
  }, [access_token])

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Events</Title>
      <ScrollView style={styles.eventContainer}>
        {
          communities?.events?.map(eventElement => (
            <Card style={styles.eventCard}>
              <Card.Content style={styles.mapContainer}>
                <EventLocation location={eventElement.hashed}/>
              </Card.Content>
              <Card.Content style={styles.cardContent}>
                <Title style={styles.cardName}>EventName</Title>
                <View style={{display: "flex", flexDirection: "row"}}>
                  <Paragraph style={styles.cardLocation}>{eventElement.location}</Paragraph>
                  <Paragraph style={styles.cardDate}>{eventElement.date.slice(0, 10)}</Paragraph>
                </View>
              </Card.Content>
            </Card>
          ))
        }
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#323232',
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
    backgroundColor: '#242424',
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
    fontSize: 18,
    alignContent: 'center',
    // paddingTop: 10,
    color: "#242424",
    fontFamily: 'Jost'
  },
  cardLocation: {
    fontSize: 16,
    flex: 3,
    color: "#242424",
    fontFamily: 'Jost'
  },
  cardDate: {
    fontSize: 14,
    flex: 1,
    color: "#242424",
    fontFamily: 'Jost'
  }
});


export default Events