import React, { useState } from 'react';
import { View, Image } from 'react-native';
import {
  Button,
  Divider,
  HelperText,
  TextInput,
  Modal,
  Portal,
  Provider,
  Text
} from 'react-native-paper';

export default function Login({ navigation }) {

  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const containerStyle = { backgroundColor: 'white', padding: 20 };

  const hasErrors = () => {
    return email.length > 2 && !email.includes('@')
  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'center' }}>
        <Image source={require('../assets/icon.png')}
          style={{ width: 300, height: 300 }} />

        <View>
          <Button icon="google" mode="outlined" onPress={() => alert('Google OAuth')}>
            Sign in with Google
        </Button>
          <Button icon="email" mode="outlined" onPress={() => navigation.navigate('Register')}>
            Sign up with Email
        </Button>
        </View>
        <View>
          <Text> already a member ?</Text>
          <Button mode="outlined" onPress={showModal}>
            Sign In
        </Button>
        </View>
        <Provider>
          <Portal>
            <Modal visible={visible} onDismiss={hideModal} contentContainerStyle={containerStyle}>
              <Text>Example Modal.  Click outside this area to dismiss.</Text>
            </Modal>
          </Portal>
        </Provider>
      </View>
    </>
  )
}