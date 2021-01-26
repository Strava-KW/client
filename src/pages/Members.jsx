import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Card, Title, Paragraph, Avatar } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCommunity } from '../store/actions'

function Members () {
  const dispatch = useDispatch()
  const communities = useSelector(state => state.communities)
  const access_token = useSelector(state => state.access_token)

  useEffect(() => {
    if (access_token) {
      dispatch(fetchCommunity(access_token))
    }
  }, [access_token])

  if (communities) {
    console.log(communities)
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Community Members </Text>
      <ScrollView style={styles.waitingList}>
        {
          communities?.members?.map(member => (
            <Card style={styles.personCard} key={member._id}>
              <Card.Content style={styles.person}>
                <Avatar.Text style={styles.avatarContainer} size={48} color="orange" label={member.fullname[0]}></Avatar.Text>
                <View style={styles.nameContainer}>
                  <Text style={{ fontSize: 21, fontWeight: '600', fontFamily: 'Jost', color: '#f48924' }}>{member.fullname}</Text>
                  <Text style={{ fontSize: 15, fontWeight: '600', fontFamily: 'Jost', color: '#e6e6e6' }}>{member.role}</Text>
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