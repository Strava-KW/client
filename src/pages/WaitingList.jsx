import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Dimensions, Image } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import { IconButton, Card, Title, Paragraph, Avatar } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { acceptMember, fetchCommunity, rejectMember } from '../store/actions'
import Toast from 'react-native-toast-message';

function WaitingList () {
  const dispatch = useDispatch()
  const communities = useSelector(state => state.communities)
  const access_token = useSelector(state => state.access_token)

  // useEffect(() => {
  //   if (access_token) {
  //     dispatch(fetchCommunity(access_token))
  //   }
  // }, [access_token])

  function handleAccept (id) {
    dispatch(acceptMember(id, access_token))
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Added new member to the community',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }

  function handleReject (id) {
    dispatch(rejectMember(id, access_token))
    Toast.show({
      type: 'success',
      position: 'top',
      text1: 'Removed user from the waiting list',
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
  }

  if (communities.waitingList.length === 0) {
    return (
      <View style={styles.placeholder}>
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <Image
          style={styles.placeholderImage}
          source={require('../../assets/waiting-list.png')}
        ></Image>
        <Text style={styles.placeholderTitle}>No user on the waiting list!</Text>
      </View>
    )
  }
  return (
    <View style={styles.container}>
      <Text style={styles.title}> Waiting List </Text>
      <ScrollView style={styles.waitingList}>
        {
          communities?.waitingList?.map(person => 
            <Card style={styles.personCard} key={person._id}>
              <Card.Content style={styles.person}>
                <View style={styles.avatarContainer}>
                {
                  person.picture ? 
                  <Avatar.Image
                    style={styles.avatarContainer}
                    size={54}
                    // color="#242424"
                    color="white"
                    source={{uri: person.picture}}
                  /> : 
                  <Avatar.Text
                    style={styles.avatarContainer}
                    size={54}
                    // color="#242424"
                    color="white"
                    label={person.fullname[0]}
                  >
                  </Avatar.Text>
                }
                </View>
                <View style={styles.nameContainer}>
                  <Text style={{ fontSize: 21, fontWeight: '600', color: '#FA8135', fontFamily: 'Jost' }}>{person.fullname}</Text>
                </View>
                <Card.Actions style={styles.personAction}>
                  <IconButton icon="check-bold" color="green" size={20} onPress={() => handleAccept(person._id)}></IconButton>
                  <IconButton icon="close-thick" color="red" size={20} onPress={() => handleReject(person._id)}></IconButton>
                </Card.Actions>          
              </Card.Content>
            </Card>
          )
        }
      </ScrollView>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </View>
  )
}

const styles = StyleSheet.create({
  placeholder:{
    flex: 1,
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
    backgroundColor: "#242424",
  },
  placeholderImage:{
    width: 200,
    height: 200
  },
  placeholderTitle:{
    fontSize: 25,
    color: "#FA8135",
    fontFamily: "Jost",
  }, 
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
    backgroundColor: '#323232',
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
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15,
  },
  avatar: {
    backgroundColor: '#FA8135'
  },  
  nameContainer: {
    flex: 2,
    justifyContent: 'center'
  },
  personAction: {
    flex: 1,
    flexDirection: 'row',
    alignContent: 'flex-start'
  }
})

export default WaitingList