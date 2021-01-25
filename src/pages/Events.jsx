import React, { useEffect, useState } from "react";
import { ScrollView, View, Text } from "react-native";
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
import DateTimePicker from "@react-native-community/datetimepicker";
import { StyleSheet, Dimensions } from "react-native";
import EventLocation from "../components/EventLocation";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommunity } from "../store/actions";

function Events() {
  const dispatch = useDispatch();
  const communities = useSelector((state) => state.communities);
  const access_token = useSelector((state) => state.access_token);
  const [eventName, setEventName] = useState("");
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const [date, setDate] = useState(new Date(1598051730000));
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);

  const handleDate = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showTimepicker = () => {
    showMode("time");
  };

  useEffect(() => {
    if (access_token) {
      dispatch(fetchCommunity(access_token));
    }
  }, [access_token]);

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
      >
        Create Event
      </Button>
      <ScrollView style={styles.eventContainer}>
        {communities?.events?.map((eventElement) => (
          <Card style={styles.eventCard}>
            <Card.Content style={styles.mapContainer}>
              <EventLocation location={eventElement.hashed} />
            </Card.Content>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.cardName}>EventName</Title>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <Paragraph style={styles.cardLocation}>
                  {eventElement.location}
                </Paragraph>
                <Paragraph style={styles.cardDate}>
                  {eventElement.date.slice(0, 10)}
                </Paragraph>
              </View>
            </Card.Content>
          </Card>
        ))}
      </ScrollView>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {
            hideModal(), setEventName("");
          }}
          contentContainerStyle={styles.modal}
          animationType={"fade"}
          transparent={true}
        >
          <Headline style={styles.headline}>Event Name</Headline>
          <TextInput
            label="e.g. Happy Run at Monas"
            value={eventName}
            onChangeText={(eventName) => setEventName(eventName)}
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
          <View>
            <Button onPress={showDatepicker} title="Show date picker!" />
          </View>
          <View>
            <Button onPress={showTimepicker} title="Show time picker!" />
          </View>
          {show && (
            <DateTimePicker
              testID="dateTimePicker"
              value={date}
              mode={mode}
              is24Hour={true}
              display="default"
              onChange={handleDate}
            />
          )}
          <Button
            style={styles.createEventButton}
            color="#FA8135"
            uppercase={false}
            dark={true}
            mode="contained"
            onPress={() => {
              console.log(eventName);
              setEventName("");
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
    justifyContent: "center",
    backgroundColor: "#323232",
  },
  mapContainer: {
    width: "100%",
    height: "70%",
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
    height: "70%",
    backgroundColor: "#242424",
    // alignItems: 'center',
    // justifyContent: 'center',
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
    width: 320,
    borderRadius: 20,
    marginHorizontal: 25,
    marginTop: 30,
    marginBottom: 5,
    alignSelf: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 2.5,
    elevation: 2,
  },
  cardContent: {
    backgroundColor: "#FA8135",
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
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
  },
});

export default Events;
