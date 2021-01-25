<<<<<<< HEAD
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, ScrollView, Dimensions } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommunity, joinCommunity } from "../store/actions";
=======
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Dimensions } from 'react-native'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCommunity, joinCommunity, setError } from '../store/actions'
>>>>>>> development
import {
  Button,
  Card,
  Title,
  Paragraph,
  Headline,
  TextInput,
  Modal,
  Portal,
} from "react-native-paper";
<<<<<<< HEAD
import axios from "../../config/axios";
=======
import axios from '../../config/axios';
import Toast from 'react-native-toast-message';
>>>>>>> development

function Community({ navigation }) {
  const dispatch = useDispatch();
  const access_token = useSelector((state) => state.access_token);
  const communities = useSelector((state) => state.communities);
  const [visible, setVisible] = useState(false);
  const [communityName, setCommunityName] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const error = useSelector(state => state.error)
  const profile = useSelector(state => state.profile)

  useEffect(() => {
    if (access_token) {
      dispatch(fetchCommunity(access_token));
    }
  }, [access_token]);

  function handleJoin(id) {
    dispatch(joinCommunity(id, access_token));
  }

  if (error) {
    Toast.show({
      type: 'error',
      position: 'top',
      text1: error,
      visibilityTime: 3000,
      autoHide: true,
      onHide: () => {dispatch(setError(null))},
      topOffset: 30,
      bottomOffset: 40,
    }); 
  }

  if(profile) {
    console.log(profile)
  }

  return (
    <View style={styles.container}>
<<<<<<< HEAD
      {!communities.message && (
        <View>
          <Text style={styles.subtitle}> Create a Community </Text>
          <Button
            icon="plus"
            mode="contained"
            color="#FA8135"
            onPress={showModal}
          >
            {" "}
            Create{" "}
          </Button>
        </View>
      )}
      {communities.length > 0 && (
=======
      <Toast ref={(ref) => Toast.setRef(ref)} />
      {
        communities && !communities.message && (
          <View>
            <Text style={styles.subtitle}> Create a Community </Text>
            <Button icon="plus" mode="contained" color="#FA8135" onPress={showModal}> Create </Button>
          </View>
        )
      }
      { communities && communities.length > 0 && (
>>>>>>> development
        <Text style={styles.subtitle}>or Join a Community</Text>
      )}
      <ScrollView>
        {communities?.message ? (
          <Text style={styles.subtitle}>{communities.message}</Text>
        ) : (
          communities?.map((community) => (
            <Card style={styles.communityCard} key={community._id}>
              <Card.Content style={styles.communityCardContent}>
                <Title
                  style={{ color: "#FA8135", fontFamily: "Jost", fontSize: 21 }}
                >
                  {community.name}
                </Title>
                <Paragraph
                  style={{ color: "#FA8135", fontFamily: "Jost", fontSize: 16 }}
                >
                  Members: {community.members.length}
                </Paragraph>
              </Card.Content>
              <Card.Actions
                style={{ flexDirection: "row-reverse", marginLeft: 10 }}
              >
                <Button
                  color="#FA8135"
                  onPress={() => handleJoin(community._id)}
                >
                  Join
                </Button>
              </Card.Actions>
            </Card>
          ))
        )}
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {
            hideModal(), setCommunityName("");
          }}
          contentContainerStyle={styles.modal}
          animationType={"fade"}
          transparent={true}
        >
          <Headline style={styles.headline}>Community Name</Headline>
          <TextInput
            label="e.g. Depok Runner"
            value={communityName}
            onChangeText={(communityName) => setCommunityName(communityName)}
            mode="outlined"
            selectionColor="#FA8135"
            underlineColor="#FA8135"
            style={styles.formField}
            theme={{
              colors: {
                placeholder: "orange",
                text: "white",
                primary: "orange",
                background: "#242424",
              },
            }}
          />
          <Button
            style={styles.createCommunityButton}
            color="#FA8135"
            uppercase={false}
            dark={true}
            mode="contained"
            onPress={() => {
              console.log(communityName);
              setCommunityName("");
              hideModal();
              axios({
                url: "/community",
                method: "POST",
                data: {
                  name: communityName,
                },
                headers: {
                  access_token,
                },
              })
                .then((res) => {
                  console.log(res.data);
                  setCommunityName("");
                  navigation.replace("Runator", { screen: "Start" });
                })
                .catch((err) => {
<<<<<<< HEAD
                  dispatch(setError(err.response.data.message));
                  console.log(
                    err.response.data.message,
                    "<==== ini dari catch"
                  );
=======
                  dispatch(setError(err.response.data.message))
                  navigation.replace('Runator', { screen: 'Start' })
                  console.log(err.response.data.message, '<==== ini dari catch')
>>>>>>> development
                  setCommunityName("");
                });
            }}
            labelStyle={{ fontFamily: "Jost", fontSize: 18 }}
          >
            Create
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#242424",
  },
  subtitle: {
    textAlign: "center",
    padding: 15,
    fontSize: 18,
    paddingTop: 30,
    color: "#fff",
    fontFamily: "Jost",
  },
  communityCard: {
    width: Dimensions.get("window").width - 75,
    backgroundColor: "#323232",
    borderRadius: 20,
    margin: 5,
  },
  communityCardContent: {
    alignItems: "center",
    color: "#42464e",
  },
  modal: {
    backgroundColor: "#242424",
    padding: 20,
  },
  headline: {
    marginBottom: 30,
    fontFamily: "Jost",
    color: "white",
    textAlign: "center",
  },
  formField: {
    width: Dimensions.get("window").width - 75,
    margin: 5,
    alignSelf: "center",
  },
  createCommunityButton: {
    marginTop: 50,
    width: 300,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#FA8135",
  },
});

export default Community;
