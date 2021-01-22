import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper'

function WaitingList () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Waiting List </Text>
      <ScrollView style={styles.waitingList}>
        <Card style={styles.personCard}>
          <Card.Content style={styles.person}>
            <Avatar.Image style={styles.avatarContainer} size={54} color="orange">Coba</Avatar.Image>
            <View style={styles.nameContainer}>
              <Text style={{ fontSize: 21, fontWeight: '700', color: '#f48924' }}>John Doe</Text>
            </View>
            <Card.Actions style={styles.personAction}>
              <Button icon="close-thick"></Button>
              <Button icon="check-bold"></Button>
            </Card.Actions>          
          </Card.Content>
        </Card>
        <Card style={styles.personCard}>
          <Card.Content style={styles.person}>
            <Avatar.Image style={styles.avatarContainer} size={54} color="orange">Coba</Avatar.Image>
            <View style={styles.nameContainer}>
              <Text style={{ fontSize: 21, fontWeight: '700', color: '#f48924' }}>John Doe</Text>
            </View>
            <Card.Actions style={styles.personAction}>
              <Button icon="close-thick"></Button>
              <Button icon="check-bold"></Button>
            </Card.Actions>          
          </Card.Content>
        </Card>
        <Card style={styles.personCard}>
          <Card.Content style={styles.person}>
            <Avatar.Image style={styles.avatarContainer} size={54} color="orange">Coba</Avatar.Image>
            <View style={styles.nameContainer}>
              <Text style={{ fontSize: 21, fontWeight: '700', color: '#f48924' }}>John Doe</Text>
            </View>
            <Card.Actions style={styles.personAction}>
              <Button icon="close-thick"></Button>
              <Button icon="check-bold"></Button>
            </Card.Actions>          
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
  waitingList: {
    height: '70%',
    width: (Dimensions.get('window').width - 36),
    backgroundColor: '#32363e',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  personCard: {
    marginTop: 10,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 20,
    backgroundColor: '#32363e',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.40,
    shadowRadius: 2.50,
    elevation: 2,
  },
  person: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatarContainer: {
    marginRight: 10,
  },
  nameContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  personAction: {
    flex: 1,
    flexDirection: 'row-reverse'
  }
})

export default WaitingList