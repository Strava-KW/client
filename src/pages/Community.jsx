import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { setCommunities } from '../store/actions'
import axios from '../../config/axios'

function Community ({ navigation }) {
  const dispatch = useDispatch()
  const access_token = useSelector(state => state.access_token)
  const communities = useSelector(state => state.communities)

  useEffect(() => {
    if (access_token) {
      axios({
        url: '/community/',
        method: 'GET',
        headers: {
          access_token
        }
      })
        .then(res => {
          dispatch(setCommunities(res.data))
          console.log(res.data, '<== dari community')
        })
        .catch(err => {
          console.log(err.response.data.message, '<== error')
        })
    }
  }, [access_token])

  function handleJoin (id) {
    axios({
      url: `/community/${id}`,
      method: 'PATCH',
      headers: {
        access_token
      }
    })
      .then(res => {
        console.log(res.data)
        return axios({
          url: '/community/',
          method: 'GET',
          headers: {
            access_token
          }
        })
      })
      .then(res => {
        dispatch(setCommunities(res.data))
      })
      .catch(err => {
        console.log(err.response.data.message)
      })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}> Create a Community </Text>
      <Button icon="plus" mode="contained" color="#FA8135" onPress={() => {navigation.navigate('Create Community')}}>Create</Button>
      { communities.length > 0 && <Text style={styles.subtitle}>or Join a Community</Text> }
      <ScrollView>
        {
          // communities?.message ? <Text>{communities}</Text> :
          communities?.map(community => (
              <Card style={styles.communityCard} key={community._id}>
                <Card.Content style={styles.communityCardContent}>
                  <Title style={{color:'#FA8135', fontFamily: 'Jost', fontSize: 21}}>{community.name}</Title>
                  <Paragraph style={{color:'#FA8135', fontFamily: 'Jost', fontSize: 16}}>Members: {community.members.length}</Paragraph>
                </Card.Content>
                <Card.Actions style={{ flexDirection: 'row-reverse', marginLeft: 10 }}>
                  <Button color="#FA8135" onPress={() => handleJoin(community._id)}>Join</Button>
                </Card.Actions>
              </Card>
            )  
          ) 
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
    backgroundColor: '#242424',
  },
  subtitle: {
    padding: 15,
    fontSize: 18,
    paddingTop: 30,
    color: '#fff',
    fontFamily: 'Jost'
  },
  communityCard: {
    width: (Dimensions.get('window').width - 75),
    backgroundColor: '#323232',
    borderRadius: 20,
    margin: 5
  },
  communityCardContent: {
    alignItems: "center",
    color: '#42464e'
  }
})

export default Community