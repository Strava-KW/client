import React from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Card, Title, Paragraph, Avatar } from 'react-native-paper'

function Members () {
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Community Members </Text>
      <ScrollView style={styles.waitingList}>
        <Card style={styles.personCard}>
          <Card.Content style={styles.person}>
            <Avatar.Image style={styles.avatarContainer} size={48} color="orange">Coba</Avatar.Image>
            <View style={styles.nameContainer}>
              <Text style={{ fontSize: 21, fontWeight: '600', fontFamily: 'Jost', color: '#f48924' }}>John Doe</Text>
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
    backgroundColor: '#323232',
  },
  title: {
    padding: 25,
    fontSize: 25,
    color: '#FA8135',
    fontFamily: 'Jost'
  },
  waitingList: {
    height: '70%',
    width: (Dimensions.get('window').width - 36),
    backgroundColor: '#242424',
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
    backgroundColor: '#242424',
    shadowColor: "#000",
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.60,
    shadowRadius: 5.50,
    elevation: 5,
  },
  person: {
    flexDirection: 'row',
    justifyContent: 'center'
  },
  avatarContainer: {
    justifyContent: 'center',
    marginRight: 20,
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

export default Members