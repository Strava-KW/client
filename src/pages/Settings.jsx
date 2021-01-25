import React from 'react';
import { IconButton, Portal, Modal, Button, Divider } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'
import { useDispatch, useSelector } from 'react-redux';
import { setAccessToken } from '../store/actions';
import Toast from 'react-native-toast-message' 

function Settings ({ navigation }) {
  const access_token = useSelector(state => state.access_token)
  const dispatch = useDispatch()

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
          onPress={() => {
            dispatch(setAccessToken(null))
            Toast.show({
              type: 'success',
              position: 'top',
              text1: 'Logged Out',
              visibilityTime: 3000,
              autoHide: true,
              onHide: () => {navigation.replace('Login');},
              topOffset: 30,
              bottomOffset: 40,
            }); 
          }}
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