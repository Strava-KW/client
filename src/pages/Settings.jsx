import React from 'react';
import { IconButton, Portal, Modal, Button, Divider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken, setCommunities, setError, setGoogleAccessToken, setProfile } from '../store/actions';
import Toast from 'react-native-toast-message' 
import * as Google from "expo-google-app-auth";

function Settings ({ navigation }) {
  const access_token = useSelector(state => state.access_token)
  const dispatch = useDispatch()
  const google_access_token = useSelector(state => state.google_access_token)
  const androidClientId = "33938517114-lsqdhqjb66cu4l7qs7nlo7d7oaj14qfv.apps.googleusercontent.com"
  const error = useSelector(state => state.error)

  const logout =  async () => {
    try {
      // dispatch(setCommunities(null))
      // dispatch(setProfile(null))
      if (google_access_token) {
        await Google.logOutAsync({ accessToken: google_access_token, androidClientId })
        dispatch(setGoogleAccessToken(null))
        dispatch(setAccessToken(null))
        dispatch(setProfile({}))
        dispatch(setCommunities([]))
      }
      else {
        dispatch(setAccessToken(null))
        dispatch(setProfile({}))
        dispatch(setCommunities([]))
      }
      dispatch(setError(null))
      // Toast.show({
      // type: 'success',
      // position: 'top',
      // text1: 'Logged Out',
      // visibilityTime: 3000,
      // autoHide: true,
      // // onHide: () => {navigation.replace('Login');},
      // topOffset: 30,
      // bottomOffset: 40,
      // }); 
      await navigation.replace('Login')
    }
    catch(err) {
      console.log(err)
      dispatch(setError(err))
    }
  }
  if (error) {
    console.log(JSON.stringify(error) + " <<<<<< ERORRRRR")
    Toast.show({
      type: 'error',
      position: 'top',
      text1: JSON.stringify(error),
      visibilityTime: 3000,
      autoHide: true,
      onHide: () => {dispatch(setError(null))},
      topOffset: 30,
      bottomOffset: 40,
    }); 
  }

  return (
      <View
        style={styles.container}
      >
        <Toast ref={(ref) => Toast.setRef(ref)} />
        <Button
          style={styles.signOutButton}
          color="#FA8135"
          uppercase={false}
          dark={true}
          mode="contained"
          onPress={() => logout()}
          labelStyle={{ fontFamily: "Jost", fontSize: 18 }}
        >
          Sign Out
        </Button>
        <Divider />
      </View>
  )
}

export default Settings

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#242424',
  },
  signOutButton: {
    marginTop: 50,
    width: 300,
    height: 40,
    alignSelf: "center",
    backgroundColor: "#FA8135",
  },
});