import React from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { Button, Card, Title, Paragraph } from 'react-native-paper'

function Community () {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}> Create a Community </Text>
      <Button icon="plus" mode="contained" color="orange">Create</Button>
      <Text style={styles.subtitle}>or Join a Community</Text>
      <ScrollView>
        <Card style={styles.communityCard}>
          <Card.Content style={styles.communityCardContent}>
            <Title style={{color:'orange'}}>CommunityKu</Title>
            <Paragraph style={{color:'orange'}}>Members: 10</Paragraph>
          </Card.Content>
          <Card.Actions style={{ flexDirection: 'row-reverse', marginLeft: 10 }}>
            <Button color="orange">Join</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.communityCard}>
          <Card.Content style={styles.communityCardContent}>
            <Title style={{color:'orange'}}>CommunityKu</Title>
            <Paragraph style={{color:'orange'}}>Members: 10</Paragraph>
          </Card.Content>
          <Card.Actions style={{ flexDirection: 'row-reverse', marginLeft: 10 }}>
            <Button color="orange">Join</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.communityCard}>
          <Card.Content style={styles.communityCardContent}>
            <Title style={{color:'orange'}}>CommunityKu</Title>
            <Paragraph style={{color:'orange'}}>Members: 10</Paragraph>
          </Card.Content>
          <Card.Actions style={{ flexDirection: 'row-reverse', marginLeft: 10 }}>
            <Button color="orange">Join</Button>
          </Card.Actions>
        </Card>
        <Card style={styles.communityCard}>
          <Card.Content style={styles.communityCardContent}>
            <Title style={{color:'orange'}}>CommunityKu</Title>
            <Paragraph style={{color:'orange'}}>Members: 10</Paragraph>
          </Card.Content>
          <Card.Actions style={{ flexDirection: 'row-reverse', marginLeft: 10 }}>
            <Button color="orange">Join</Button>
          </Card.Actions>
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
  subtitle: {
    padding: 15,
    paddingTop: 30,
    color: '#fff'
  },
  communityCard: {
    width: (Dimensions.get('window').width - 75),
    backgroundColor: '#42464e',
    borderRadius: 20,
    margin: 10
  },
  communityCardContent: {
    alignItems: "center",
    color: '#42464e'
  }
})

export default Community