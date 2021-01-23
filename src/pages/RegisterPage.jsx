import React, { useState } from 'react';
import { View, Text, Image } from 'react-native';
import {
  Button,
  Divider,
  HelperText,
  TextInput
} from 'react-native-paper';

function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const hasErrors = () => {
    return email.length > 2 && !email.includes('@')

  };

  return (
    <>
      <View style={{ flex: 1, justifyContent: 'center', alignContent: 'center' }}>
        <TextInput
          label="Name"
          value={name}
          onChangeText={name => setName(name)}
          mode='outlined'
        />
        <TextInput
          label="Email"
          value={email}
          onChangeText={email => setEmail(email)}
          mode='outlined'
        />
        <HelperText type="error" visible={hasErrors()}>
          Email address is invalid!
        </HelperText>
        <TextInput
          label="Password"
          value={password}
          onChangeText={password => setPassword(password)}
          mode='outlined'
        />
      </View>
    </>
  )
}

export default Register