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
              <Text style={{ fontSize: 21, fontWeight: '700', color: '#f48924' }}>John Doe</Text>
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
    backgroundColor: '#42464E',
  },
  title: {
    padding: 25,
    fontSize: 25,
    color: '#FA8135',
    fontWeight: "bold"
  },
  waitingList: {
    height: '70%',
    width: (Dimensions.get('window').width - 36),
    backgroundColor: '#2F3238',
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