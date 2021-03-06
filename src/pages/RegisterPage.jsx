import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button, HelperText, TextInput, Headline } from "react-native-paper";

function Register({ navigation }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const hasErrors = () => {
    return email.length > 2 && !email.includes("@");
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Register</Headline>

      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 20 }}
      >
        <View
          style={{
            flex: 1,
            height: 0.5,
            width: Dimensions.get("window").height - 75,
            backgroundColor: "white",
          }}
        />
      </View>

      <TextInput
        label="Name"
        value={name}
        onChangeText={(name) => setName(name)}
        mode="flat"
        selectionColor="#FA8135"
        underlineColor="#FA8135"
        style={styles.formField}
        theme={{
          colors: {
            placeholder: "white",
            text: "white",
            primary: "orange",
            background: "#242424",
          },
        }}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        mode="flat"
        selectionColor="#FA8135"
        underlineColor="#FA8135"
        style={styles.formField}
        theme={{
          colors: {
            placeholder: "white",
            text: "white",
            primary: "orange",
            background: "#242424",
          },
        }}
      />
      <HelperText type="error" visible={hasErrors()}>
        Email address is invalid!
      </HelperText>
      <TextInput
        label="Password"
        value={password}
        onChangeText={(password) => setPassword(password)}
        mode="outlined"
        selectionColor="#FA8135"
        underlineColor="#FA8135"
        style={styles.formField}
        secureTextEntry={true}
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
        style={styles.signUpButton}
        color="#FA8135"
        dark={true}
        mode="contained"
        onPress={() => {
          console.log(name, email, password);
          navigation.replace("Login");
        }}
      >
        Sign Up
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#242424",
  },
  signUpButton: {
    marginTop: 50,
    width: 300,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#FA8135",
  },
  formField: {
    width: Dimensions.get("window").width - 75,
    margin: 5,
  },
  headline: {
    marginBottom: 30,
    fontFamily: "Jost",
    color: "white",
  },
});

export default Register;
