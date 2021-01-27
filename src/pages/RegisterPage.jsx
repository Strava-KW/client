import React, { useState } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { Button, HelperText, TextInput, Headline } from "react-native-paper";
import axios from "../../config/axios";
import { useSelector, useDispatch } from "react-redux";
import { setError } from "../store/actions";
import Toast from "react-native-toast-message";

function Register({ navigation }) {
  const [fullname, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);
  const error = useSelector((state) => state.error);
  const dispatch = useDispatch();

  const hasErrors = () => {
    return email.length > 2 && !email.includes("@");
  };

  if (error) {
    Toast.show({
      type: "error",
      position: "top",
      text1: error,
      visibilityTime: 3000,
      autoHide: true,
      onHide: () => {
        dispatch(setError(null));
      },
      topOffset: 30,
      bottomOffset: 40,
    });
  }

  return (
    <View style={styles.container}>
      <Headline style={styles.headline}>Register</Headline>
      <Toast ref={(ref) => Toast.setRef(ref)} />
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
        label="Full Name"
        value={fullname}
        onChangeText={(fullname) => setFullName(fullname)}
        mode="outlined"
        selectionColor="#FA8135"
        underlineColor="#FA8135"
        style={styles.formField}
        theme={{
          colors: {
            placeholder: "orange",
            text: "d8d8d8",
            primary: "orange",
            background: "#242424",
          },
        }}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={(email) => setEmail(email)}
        mode="outlined"
        selectionColor="#FA8135"
        underlineColor="#FA8135"
        style={styles.formField}
        theme={{
          colors: {
            placeholder: "orange",
            text: "d8d8d8",
            primary: "orange",
            background: "#242424",
          },
        }}
      />
      <HelperText
        type="error"
        visible={hasErrors()}
        style={{
          color: "#e76f51",
          alignSelf: "flex-start",
          marginLeft: 25,
        }}
      >
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
            text: "#d8d8d8",
            primary: "orange",
            background: "#242424",
          },
        }}
      />

      <Button
        style={styles.signUpButton}
        color="#d8d8d8"
        dark={true}
        mode="contained"
        onPress={(e) => {
          const data = { fullname, email, password };
          console.log(data);
          axios({
            url: "/users/register",
            method: "POST",
            data: data,
          })
            .then((res) => {
              console.log(res.data);
              navigation.navigate("Login");
            })
            .catch((err) => dispatch(setError(err.response.data.message)));
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
    width: 250,
    height: 40,
    alignSelf: "center",
    // backgroundColor: "#FA8135",
    backgroundColor: "#AC3E05",
  },
  formField: {
    width: Dimensions.get("window").width - 75,
    margin: 5,
  },
  headline: {
    marginBottom: 30,
    fontFamily: "Jost",
    color: "#d8d8d8", //Color Option: #A9A9A9,#d8d8d8
  },
});

export default Register;
