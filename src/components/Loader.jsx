import * as React from 'react';
import { ActivityIndicator } from 'react-native-paper';
import { View, StyleSheet } from 'react-native'

const Loader = () => (
  <View style={styles.container}>
    <ActivityIndicator animating={true} color='#fa8135' size='large'/>
  </View>
);

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#161616',
    alignContent:'center',
    justifyContent:'center',
    flex: 1
  }
})

export default Loader;