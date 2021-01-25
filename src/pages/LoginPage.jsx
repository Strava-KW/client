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
import { setAccessToken, setError } from "../store/actions";
import Toast from 'react-native-toast-message';
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
      const { type, accessToken, user } = await Google.logInAsync(config);
      if (type === "success") {
        // navigation.replace("Runator", { user, accessToken });
        axios({
          url: '/googleLogin',
          method: 'POST',
          data: {
            google_token: accessToken
          }
        })
          .then(res => {
            console.log(res.data)
          })
          .catch(err => {
            console.log(err.response.data.message, '<== google login')
          })
      }
    } catch ({ message }) {
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
              width: 300,
              alignSelf: "center",
              backgroundColor: "#242424",
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
              width: 300,
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
                color: "#242424",
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
                width: 300,
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
              style={styles.signInButton}
              color="#FA8135"
              uppercase={false}
              dark={true}
              mode="contained"
              onPress={() => {
                hideModal();
                axios({
                  url: '/users/login',
                  method: 'POST',
                  data: {
                    email,
                    password
                  }
                })
                  .then((res) => {
                    console.log(res.data, 'login')
                    dispatch(setAccessToken(res.data.access_token))
                    Toast.show({
                      type: 'success',
                      position: 'top',
                      text1: 'Logged In!',
                      visibilityTime: 3000,
                      autoHide: true,
                      onHide: () => {navigation.replace("Runator");},
                      topOffset: 30,
                      bottomOffset: 40,
                    });
                    setEmail("");
                    setPassword("");
                  })
                  .catch((err) => {
                    console.log(err.response.data.message, 'login')
                    dispatch(setError(err.response.data.message))
                    setEmail("");
                    setPassword("");
                  })
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
    padding: 10,
    color: "#2F3238",
  },
  loginContainer: {
    backgroundColor: "#FA8135",
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
    color: "white",
    textAlign: "center",
  },
  formField: {
    width: Dimensions.get("window").width - 75,
    margin: 5,
    alignSelf: "center",
  },
  signInButton: {
    marginTop: 50,
    width: 300,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#FA8135",
  },
});
