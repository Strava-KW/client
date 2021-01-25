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
import { StyleSheet, Dimensions } from "react-native";
import EventLocation from "../components/EventLocation";
import { useSelector, useDispatch } from "react-redux";
import { fetchCommunity } from "../store/actions";
import AlgoliaPlaces from "algolia-places-react";
// import ReactNativeAlgoliaPlaces from "react-native-algolia-places";

function Events() {
  const dispatch = useDispatch();
  const communities = useSelector((state) => state.communities);
  const access_token = useSelector((state) => state.access_token);
  const [eventName, setEventName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [visible, setVisible] = useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

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
          <TextInput
            label="Date"
            value={date}
            onChangeText={(date) => setDate(date)}
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
          <TextInput
            label="Time"
            value={time}
            onChangeText={(time) => setTime(time)}
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
          {/* <ReactNativeAlgoliaPlaces
            appId={"YHR3Y7AR19"}
            appKey={"bcdcb7e00c995b262100ad6d278f43b8"}
            itemList={(item, i, textSearch) => (
              <Text key={i + "item"}>item.locale_names[0]</Text>
            )}
          /> */}
          <AlgoliaPlaces
            placeholder="Write an address here"
            options={{
              appId: "YHR3Y7AR19",
              apiKey: "bcdcb7e00c995b262100ad6d278f43b8",
              language: "en",
              countries: ["id"],
              type: "city",
              // Other options from https://community.algolia.com/places/documentation.html#options
            }}
            // onChange={({ query, rawAnswer, suggestion, suggestionIndex }) =>
            //   console.log(
            //     "Fired when suggestion selected in the dropdown or hint was validated."
            //   )
            // }
            // onSuggestions={({ rawAnswer, query, suggestions }) =>
            //   console.log(
            //     "Fired when dropdown receives suggestions. You will receive the array of suggestions that are displayed."
            //   )
            // }
            // onCursorChanged={({
            //   rawAnswer,
            //   query,
            //   suggestion,
            //   suggestonIndex,
            // }) =>
            //   console.log(
            //     "Fired when arrows keys are used to navigate suggestions."
            //   )
            // }
            // onClear={() => console.log("Fired when the input is cleared.")}
            // onLimit={({ message }) =>
            //   console.log("Fired when you reached your current rate limit.")
            // }
            // onError={({ message }) =>
            //   console.log(
            //     "Fired when we could not make the request to Algolia Places servers for any reason but reaching your rate limit."
            //   )
            // }
          />

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
    // height: '70%',
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
  },
});

export default Events;
