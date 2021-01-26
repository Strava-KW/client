import React, {useEffect} from 'react'
import { StyleSheet, Text, View } from 'react-native'
// import firebase from 'firebase'
// import 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCommunity } from '../store/actions'

// const firebaseConfig = {
//   apiKey: "AIzaSyAq3OSehcmiJOgw6VC4IkolVrP4MR6L7fM",
//   authDomain: "runator-h8.firebaseapp.com",
//   projectId: "runator-h8",
//   storageBucket: "runator-h8.appspot.com",
//   messagingSenderId: "716222498981",
//   appId: "1:716222498981:web:faf4a24bc7087a1ba3e54c"
// };

// if (firebase.apps.length === 0 ){
//   firebase.initializeApp(firebaseConfig);
// } 

// const db = firebase.firestore()

export default function Chat() {
  const dispatch = useDispatch()
  const communities = useSelector(state => state.communities)
  const access_token = useSelector(state => state.access_token)

  useEffect(() => {
    if (access_token) {
      dispatch(fetchCommunity(access_token))
    }
    if (communities) {
      console.log(communities)
    }
  }, [access_token])

  return(
    <Text>lalalalala</Text>
  )

}