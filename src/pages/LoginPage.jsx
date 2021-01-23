import React, { useState } from "react";
import { View, Image, Dimensions, StyleSheet } from "react-native";
import {
  Button,
  Headline,
  HelperText,
  TextInput,
  Modal,
  Portal,
  Provider,
  Text,
} from "react-native-paper";

export default function LoginPage({ navigation }) {
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const hasErrors = () => {
    return email.length > 2 && !email.includes("@");
  };

  return (
    <>
      <View style={styles.container}>
        <Image source={require("../../assets/icon.png")} style={styles.icon} />
        <View style={styles.loginContainer}>
          <Text style={styles.title}>Login to Runator</Text>
          <Button
            icon="google"
            mode="contained"
            uppercase={false}
            onPress={() => alert("Google OAuth")}
            style={{
              marginBottom: 10,
              width: 300,
              alignSelf: "center",
              backgroundColor: "#42464E",
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
              backgroundColor: "#42464E",
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
                color: "#2F3238",
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
                backgroundColor: "#42464E",
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
          >
            <Headline style={styles.headline}>Sign In</Headline>
            <TextInput
              label="Email"
              value={email}
              onChangeText={(email) => setEmail(email)}
              mode="flat"
              style={{
                width: 300,
                alignSelf: "center",
                padding: 0,
              }}
              labelStyle={{ fontFamily: "Jost", fontSize: 18 }}
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
              mode="flat"
              secureTextEntry={true}
              style={{
                width: 300,
                alignSelf: "center",
                padding: 0,
              }}
              labelStyle={{ fontFamily: "Jost", fontSize: 18 }}
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
              mode="contained"
              onPress={() => navigation.navigate("Runator")}
              uppercase={false}
              style={{
                marginTop: 50,
                width: 300,
                alignSelf: "center",
                backgroundColor: "#42464E",
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
    backgroundColor: "#42464e",
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
    backgroundColor: "#FA8135",
    padding: 20,
  },
  headline: {
    marginBottom: 30,
    fontFamily: "Jost",
    color: "#242424",
    textAlign: "center",
  },
});
