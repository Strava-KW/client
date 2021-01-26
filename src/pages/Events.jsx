import React, { useEffect, useState } from "react";
import {
  ScrollView,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import {
  Avatar,
  Button,
  Card,
  Title,
  Paragraph,
  Headline,
  TextInput,
  Modal,
  Portal,
} from "react-native-paper";
import axios from "axios";

import { EventLocation } from "../components";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommunity } from "../store/actions";

function Events({ navigation }) {
  const dispatch = useDispatch();
  const communities = useSelector((state) => state.communities);
  const access_token = useSelector((state) => state.access_token);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const API_KEY = "AIzaSyC_bUeG0cXpov1tAARI3M8T1r9-uTD0h4g";
  const [searchKeyword, setSearchKeyword] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isShowingResults, setIsShowingResults] = useState(false);

  useEffect(() => {
    if (access_token) {
      dispatch(fetchCommunity(access_token));
    }
  }, [access_token]);

  searchLocation = async (text) => {
    try {
      setSearchKeyword(text);
      axios
        .request({
          method: "post",
          url: `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${API_KEY}&input=${searchKeyword}`,
        })
        .then((response) => {
          console.log(response.data);
          setSearchResults(response.data.predictions);
          setIsShowingResults(true);
        });
    } catch (error) {
      console.log(error.response);
    }
  };

  return (
    <View style={styles.container}>
      <Title style={styles.title}>Events</Title>
      <Button
        icon="plus"
        uppercase={false}
        mode="contained"
        color="#FA8135"
        style={styles.createButton}
        onPress={showModal}
        // onPress={() => navigation.navigate("GoogleSearch")}
      >
        Create Event
      </Button>
      <ScrollView style={styles.eventContainer}>
        {
          communities?.events?.map(eventElement => (
            <Card style={styles.eventCard}>
              <Card.Content style={styles.mapContainer}>
                <EventLocation location={eventElement.hashed}/>
              </Card.Content>
              <Card.Content style={styles.cardContent}>
                <Title style={styles.cardName}>{eventElement.name}</Title>
                <View style={{display: "flex", flexDirection: "row"}}>
                  <Paragraph style={styles.cardLocation}>{eventElement.location}</Paragraph>
                  <Paragraph style={styles.cardDate}>{eventElement.date.slice(0, 10)}</Paragraph>
                </View>
              </Card.Content>
            </Card>
          ))
        }
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {
            hideModal(), setEventName(""), setEventName("");
            setDate("");
            setTime("");
          }}
          contentContainerStyle={styles.modal}
          animationType={"fade"}
          transparent={true}
        >
          <Headline style={styles.headline}>Event Name</Headline>
          <TextInput
            label="Event Name"
            placeholder="e.g. Happy Run at Monas"
            value={eventName}
            onChangeText={(eventName) => setEventName(eventName)}
            mode="flat"
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
          <TextInput
            label="Date"
            placeholder="e.g. 14/02/2021"
            value={date}
            onChangeText={(date) => setDate(date)}
            mode="flat"
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
          <TextInput
            label="Time"
            placeholder="e.g. 08.30"
            value={time}
            onChangeText={(time) => setTime(time)}
            mode="flat"
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

          <View>
            <TextInput
              placeholder="Search for an address"
              style={styles.formField}
              mode="outlined"
              onChangeText={(text) => {
                searchLocation(text);
              }}
              label="Meeting Point"
              value={searchKeyword}
              theme={{
                colors: {
                  placeholder: "orange",
                  text: "white",
                  primary: "orange",
                  background: "#242424",
                },
              }}
            />
            {isShowingResults && (
              <FlatList
                data={searchResults}
                renderItem={({ item, index }) => {
                  return (
                    <TouchableOpacity
                      style={styles.resultItem}
                      onPress={() => {
                        setSearchKeyword(item.structured_formatting.main_text);
                        setIsShowingResults(false);
                      }}
                    >
                      <Text>{item.structured_formatting.main_text}</Text>
                    </TouchableOpacity>
                  );
                }}
                keyExtractor={(item) => item.id}
                style={styles.searchResultsContainer}
              />
            )}
          </View>

          <Button
            style={styles.createEventButton}
            color="#FA8135"
            uppercase={false}
            dark={true}
            mode="contained"
            onPress={() => {
              console.log(eventName);
              setEventName("");
              setDate("");
              setTime("");
              hideModal();
              // axios({
              //   url: "/community",
              //   method: "POST",
              //   data: {
              //     name: communityName,
              //   },
              //   headers: {
              //     access_token,
              //   },
              // })
              //   .then((res) => {
              //     console.log(res.data);
              //     setCommunityName("");
              //     navigation.replace("Runator", { screen: "Start" });
              //   })
              //   .catch((err) => {
              //     dispatch(setError(err.response.data.message));
              //     console.log(
              //       err.response.data.message,
              //       "<==== ini dari catch"
              //     );
              //     setCommunityName("");
              //   });
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#323232",
  },
  mapContainer: {
    width: "100%",
    height: "60%",
    paddingTop: 0,
    paddingRight: 0,
    paddingLeft: 0,
    borderRadius: 30,
  },
  createButton: {
    width: 150,
    alignSelf: "center",
    marginBottom: 15,
  },
  eventContainer: {
    width: Dimensions.get("window").width - 24,
    // height: '70%',
    backgroundColor: "#242424",
    // alignItems: "center",
    // justifyContent: "center",
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  title: {
    alignSelf: "center",
    padding: 15,
    fontSize: 25,
    color: "#FA8135",
    fontFamily: "Jost",
  },
  map: {
    flex: 1,
    borderRadius: 10,
  },
  eventCard: {
    height: 240,
    width: 340,
    borderRadius: 20,
    marginHorizontal: 15,
    marginTop: 20,
    marginBottom: 5,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    backgroundColor: "#FA8135",
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
    elevation: 2,
  },
  cardContent: {
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
  },
  cardName: {
    fontSize: 18,
    alignContent: "center",
    // paddingTop: 10,
    color: "#242424",
    fontFamily: "Jost",
  },
  cardLocation: {
    fontSize: 16,
    flex: 3,
    color: "#242424",
    fontFamily: "Jost",
  },
  cardDate: {
    fontSize: 14,
    flex: 1,
    color: "#242424",
    fontFamily: "Jost",
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
  createEventButton: {
    marginTop: 50,
    width: 300,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#FA8135",
    zIndex: 0,
  },
  searchResultsContainer: {
    width: 320,
    height: 200,
    backgroundColor: "#fff",
    zIndex: 1,
    alignSelf: "center",
  },

  resultItem: {
    width: "100%",
    justifyContent: "center",
    height: 40,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    paddingLeft: 15,
    zIndex: 2,
  },
  searchBox: {
    width: 320,
    height: 50,
    fontSize: 18,
    borderRadius: 8,
    borderColor: "#aaa",
    color: "#000",
    backgroundColor: "#fff",
    borderWidth: 1.5,
    paddingLeft: 15,
    alignSelf: "center",
  },
});

export default Events;
