import React, { useState, useEffect } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import {
  Button,
  Headline,
  HelperText,
  TextInput,
  Modal,
  Portal,
  Text,
} from "react-native-paper";
import * as Google from "expo-google-app-auth";
import { useDispatch, useSelector } from "react-redux";
import {
  setAccessToken,
  setError,
  setGoogleAccessToken,
} from "../store/actions";
import Toast from "react-native-toast-message";
import axios from "../../config/axios";

export default function LoginPage({ navigation }) {
  const config = {
    androidClientId:
      "33938517114-lsqdhqjb66cu4l7qs7nlo7d7oaj14qfv.apps.googleusercontent.com",
    iosClientId:
      "33938517114-n48rrc12e3c9ub1d0320lvcc9eal3fmp.apps.googleusercontent.com",
    scopes: ["profile", "email"],
  };

  const googleLogin = async () => {
    try {
      const { type, accessToken, user, idToken } = await Google.logInAsync(
        config
      );
      if (type === "success") {
        // navigation.replace("Runator", { user, accessToken });
        axios({
          url: "/users/googleLogin",
          method: "POST",
          data: {
            google_token: idToken,
          },
        })
          .then((res) => {
            dispatch(setAccessToken(res.data.access_token));
            dispatch(setGoogleAccessToken(accessToken));
            navigation.replace("Runator");
          })
          .catch((err) => {
            throw {
              message: err.response.data.message,
            };
          });
      }
    } catch ({ message }) {
      dispatch(setError(message));
      alert(`login: ${message}`);
    }
  };

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const dispatch = useDispatch();
  const error = useSelector((state) => state.error);
  const access_token = useSelector((state) => state.access_token);

  useEffect(() => {
    return () => {
      dispatch(setError(null));
    };
  }, [error]);

  if (error) {
    console.log(error);
    Toast.show({
      type: "error",
      position: "top",
      text1: error,
      visibilityTime: 3000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    });
    dispatch(setError(null));
  }

  const hasErrors = () => {
    return email.length > 2 && !email.includes("@");
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={require("../../assets/icon.png")} style={styles.icon} />
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Login to Runator</Text>
          <Button
            icon="google"
            mode="contained"
            uppercase={false}
            onPress={() => googleLogin()}
            style={{
              marginBottom: 10,
              width: 250,
              alignSelf: "center",
              backgroundColor: "#242424",
              fontColor: " #A9A9A9", //Color Option: #A9A9A9,#2F3238,#d8d8d8
            }}
            labelStyle={{ fontFamily: "Jost", fontSize: 18 }}
          >
            Sign in with Google
          </Button>
          <Button
            icon="email"
            mode="contained"
            uppercase={false}
            onPress={() => navigation.navigate("Register")}
            style={{
              marginBottom: 10,
              width: 250,
              alignSelf: "center",
              backgroundColor: "#242424",
            }}
            labelStyle={{ fontFamily: "Jost", fontSize: 18 }}
          >
            Sign up with Email
          </Button>
          <View>
            <Text
              style={{
                alignSelf: "center",
                paddingBottom: 10,
                paddingTop: 15,
                fontFamily: "Jost",
                // color: "#242424",
                color: "white",
                fontSize: 16,
              }}
            >
              {" "}
              already a member ?
            </Text>
            <Button
              mode="contained"
              onPress={showModal}
              uppercase={false}
              style={{
                marginBottom: 10,
                width: 250,
                alignSelf: "center",
                backgroundColor: "#242424",
              }}
              labelStyle={{ fontFamily: "Jost", fontSize: 18 }}
            >
              Sign In
            </Button>
          </View>
        </View>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
            animationType={"fade"}
            transparent={true}
          >
            <Headline style={styles.headline}>Sign In</Headline>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
              }}
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
              label="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              mode="flat"
              selectionColor="#FA8135"
              underlineColor="#FA8135"
              style={styles.formField}
              theme={{
                colors: {
                  placeholder: "orange",
                  text: "#d8d8d8",
                  primary: "orange",
                  background: "#242424",
                },
              }}
            />
            <HelperText
              type="error"
              visible={hasErrors()}
              style={{ color: "#e76f51" }}
            >
              Email address is invalid!
            </HelperText>
            <TextInput
              label="Password"
              value={password}
              onChangeText={(password) => setPassword(password)}
              mode="flat"
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
              style={styles.signInButton}
              color="#d8d8d8" // #d8d8d8,#FA8135
              uppercase={false}
              dark={true}
              mode="contained"
              onPress={() => {
                hideModal();
                axios({
                  url: "/users/login",
                  method: "POST",
                  data: {
                    email,
                    password,
                  },
                })
                  .then((res) => {
                    console.log(res.data, "login");
                    dispatch(setAccessToken(res.data.access_token));
                    Toast.show({
                      type: "success",
                      position: "top",
                      text1: "Logged In!",
                      visibilityTime: 3000,
                      autoHide: true,
                      onHide: () => {
                        navigation.replace("Runator");
                      },
                      topOffset: 30,
                      bottomOffset: 40,
                    });
                    setEmail("");
                    setPassword("");
                  })
                  .catch((err) => {
                    console.log(err.response.data.message, "login");
                    dispatch(setError(err.response.data.message));
                    setEmail("");
                    setPassword("");
                  });
              }}
              labelStyle={{ fontFamily: "Jost", fontSize: 18 }}
            >
              Sign In
            </Button>
          </Modal>
        </Portal>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#242424",
  },
  icon: {
    width: 250,
    height: 250,
    margin: 15,
  },
  title: {
    alignSelf: "center",
    fontSize: 30,
    fontFamily: "Jost",
    marginBottom: 15,
    marginTop: 15,
    padding: 10,
    color: "white", //Color Option: #A9A9A9,#2F3238,#d8d8d8
  },
  loginContainer: {
    backgroundColor: "#e36414", // Color Option: #e36414",#FA8135, #AC3E05
    width: Dimensions.get("window").width,
    height: "70%",
  },
  modal: {
    backgroundColor: "#242424",
    padding: 20,
  },
  headline: {
    marginBottom: 30,
    fontFamily: "Jost",
    color: "#d8d8d8", //Color Option: #A9A9A9
    textAlign: "center",
  },
  formField: {
    width: Dimensions.get("window").width - 75,
    margin: 5,
    alignSelf: "center",
  },
  signInButton: {
    marginVertical: 50,
    width: 250,
    height: 40,
    alignSelf: "center",
    // backgroundColor: "#FA8135",
    backgroundColor: "#AC3E05",
  },
});
