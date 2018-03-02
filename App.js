import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Home, Toilet, Signup, Login, Logout } from './Client/Components';
import firebase from 'firebase';
var config = {
  apiKey: "AIzaSyBi6NksjjFC7txajSPi7Bjqqc_dYJGUMmA",
  authDomain: "tinkle-465a9.firebaseapp.com",
  databaseURL: "https://tinkle-465a9.firebaseio.com",
  projectId: "tinkle-465a9",
  storageBucket: "tinkle-465a9.appspot.com",
  messagingSenderId: "598058718515"
};
firebase.initializeApp(config);
const RootNavigator = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Tinkle'
    },
  },
  Toilet: {
    screen: Toilet,
    navigationOptions: {
      headerTitle: 'Toilet',
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: (<View />)
    }
  }
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <RootNavigator />
      </View>
    );
  }
}

