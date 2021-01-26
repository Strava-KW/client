import React, {useEffect, useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'
import 'firebase/firestore'
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
  // const [user, setUser] = useState(null)

  useEffect(() => {
    if (access_token) {
      dispatch(fetchCommunity(access_token))
    }
    // axios users
    // Name and setName with initial useSelector from axios 
    // if (communities && users) {
    //   const chatsRef = db.collection('chats')
    // }
    if (chatsRef) {
      const unsubscribe = chatsRef.onSnapshot((querySnapshot) => {
        const messagesFirestore = querySnapshot
            .docChanges()
            .filter(({ type }) => type === 'added')
            .map(({ doc }) => {
                const message = doc.data()
                return { ...message, createdAt: message.createdAt.toDate() }
            })
            .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
        appendMessages(messagesFirestore)
    })
    return () => unsubscribe()
    }
  }, [access_token])

  const appendMessages = useCallback(
    (messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )

  function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m))
    await Promise.all(writes)
  }

  return(
    <GiftedChat messages={messages} user={user} onSend={handleSend} />
  )

}
