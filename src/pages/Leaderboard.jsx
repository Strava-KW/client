import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Button, Card, Title, Paragraph, Avatar } from 'react-native-paper'
import { useSelector, useDispatch } from 'react-redux'
import { setCommunities } from '../store/actions'
import axios from '../../config/axios'

function Leaderboard () {
  const dispatch = useDispatch()
  const communities = useSelector(state => state.communities)
  const access_token = useSelector(state => state.access_token)

  useEffect(() => {
    if (access_token) {
      axios({
        url: '/community/community',
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Leaderboard </Text>
      <ScrollView style={styles.leaderboard}>
        {
          communities?.members?.map((member, index) => (
            <Card style={styles.rankCard} key={member._id}>
              <Card.Content style={styles.rank}>
                <View style={styles.posContainer}>
                  <Text style={{ fontSize: 32, alignSelf: 'center', justifyContent: 'center', fontWeight: '600', fontFamily: 'Jost', color: '#FA8135'}}>{index + 1}.</Text>
                </View>
                <Avatar.Text style={styles.avatarContainer} size={54} color="orange" label={member.fullname[0]}></Avatar.Text>
                <View style={styles.detailContainer}>
                  <Text style={{ fontSize: 21, fontWeight: '600', fontFamily: 'Jost', color: '#FA8135' }}>{member.fullname}</Text>
                  <Text style={{ fontSize: 14, fontWeight: '400', fontFamily: 'Jost', color: '#FA8135' }}>Distances total: {member.totalRange} km</Text>
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
    fontWeight: '800',
    fontFamily: 'Jost'
  },
  leaderboard: {
    height: '70%',
    width: (Dimensions.get('window').width - 24),
    backgroundColor: '#242424',
    // alignItems: 'center',
    // justifyContent: 'center',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  rankCard: {
    marginTop: 8,
    marginVertical: 5,
    marginHorizontal: 10,
    borderRadius: 25,
    backgroundColor: '#323232'
  },
  rank: {
    display: 'flex',
    flexDirection: 'row'
  },
  posContainer: {
    marginRight: 15,
    justifyContent: 'center'
  },
  avatarContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 15
  },
  detailContainer: {
    flex: 3,
    justifyContent: 'center'
  }
})

export default Leaderboard