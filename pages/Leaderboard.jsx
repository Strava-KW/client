import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper'

function Leaderboard () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Leaderboard </Text>
      <ScrollView style={styles.leaderboard}>
        <Card style={styles.rankCard}>
          <Card.Content style={styles.rank}>
            <View style={styles.posContainer}>
              <Text style={{ fontSize: 32, alignSelf: 'center', justifyContent: 'center', fontWeight: '700', color: '#f48924'}}>1</Text>
            </View>
            <Avatar.Image style={styles.avatarContainer} size={54} color="orange">Coba</Avatar.Image>
            <View style={styles.detailContainer}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#f48924' }}>John Doe</Text>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#f48924' }}>Distance: 70 km</Text>
            </View>           
          </Card.Content>
        </Card>
        <Card style={styles.rankCard}>
          <Card.Content style={styles.rank}>
            <View style={styles.posContainer}>
              <Text style={{ fontSize: 32, alignSelf: 'center', justifyContent: 'center', fontWeight: '700', color: '#f48924'}}>1</Text>
            </View>
            <Avatar.Image style={styles.avatarContainer} size={54} color="orange">Coba</Avatar.Image>
            <View style={styles.detailContainer}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#f48924' }}>John Doe</Text>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#f48924' }}>Distance: 70 km</Text>
            </View>           
          </Card.Content>
        </Card>
        <Card style={styles.rankCard}>
          <Card.Content style={styles.rank}>
            <View style={styles.posContainer}>
              <Text style={{ fontSize: 32, alignSelf: 'center', justifyContent: 'center', fontWeight: '700', color: '#f48924'}}>1</Text>
            </View>
            <Avatar.Image style={styles.avatarContainer} size={54} color="orange">Coba</Avatar.Image>
            <View style={styles.detailContainer}>
              <Text style={{ fontSize: 20, fontWeight: '700', color: '#f48924' }}>John Doe</Text>
              <Text style={{ fontSize: 14, fontWeight: '400', color: '#f48924' }}>Distance: 70 km</Text>
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
    justifyContent: 'flex-start',
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: '#52565e',
  },
  title: {
    padding: 25,
    fontSize: 20,
    color: '#f48924',
    fontWeight: "bold"
  },
  leaderboard: {
    height: '70%',
    width: (Dimensions.get('window').width - 36),
    backgroundColor: '#f48924',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  rankCard: {
    marginTop: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#32363e'
  },
  rank: {
    display: 'flex',
    flexDirection: 'row'
  },
  posContainer: {
    marginRight: 15
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  detailContainer: {
    flex: 3,
  }
})

export default Leaderboard