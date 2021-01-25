import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

function CreateEvent({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}> Create Events</Text>
      <Button icon="plus" mode="contained" color="#FA8135" onPress={showModal}>
        Create
      </Button>
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
    padding: 15,
    fontSize: 18,
    paddingTop: 30,
    color: "#fff",
    fontFamily: "Jost",
  },
});

export default CreateEvent;
