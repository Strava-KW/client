// @refresh reset
import React, {useEffect, useState, useCallback} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { GiftedChat } from 'react-native-gifted-chat'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { useSelector, useDispatch } from 'react-redux'
import { fetchCommunity } from '../store/actions'

var firebaseConfig = {
  apiKey: "AIzaSyBQkRqgO6jXK6aEGk0KWFJm5nb0fffv9Xc",
  authDomain: "runator-chat.firebaseapp.com",
  databaseURL: "https://runator-chat-default-rtdb.firebaseio.com",
  projectId: "runator-chat",
  storageBucket: "runator-chat.appspot.com",
  messagingSenderId: "783820234678",
  appId: "1:783820234678:web:03bb37b05762277b0ceb17",
  databaseURL: "https://runator-chat-default-rtdb.firebaseio.com/"
};

if (firebase.apps.length === 0 ){
  firebase.initializeApp(firebaseConfig);
} 

export default function Chat() {
  
  const db = firebase.firestore()
  const dispatch = useDispatch()
  const communities = useSelector(state => state.communities)
  const access_token = useSelector(state => state.access_token)
  const profile = useSelector(state => state.profile)
  const [user, setUser] = useState({id: null, name: null})
  const [messages, setMessages] = useState([])
  let chatsRef;

  if (communities) {
    if (communities._id) {
        chatsRef = db.collection(communities._id.toString())
    }
  }
  
  useEffect(() => {
    if (access_token) {
      dispatch(fetchCommunity(access_token))
    }
    if (profile) {
      setUser({_id: profile._id.toString(), name: profile.fullname})
    }
  }, [])

  useEffect(() => {
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
  }, [])

  const appendMessages = useCallback((messages) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages))
    },
    [messages]
  )
  async function handleSend(messages) {
    const writes = messages.map((m) => chatsRef.add(m))
    await Promise.all(writes)
  }

  return(
    <GiftedChat messages={messages} user={user} onSend={handleSend} />
  )

}
