import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Home, Toilet, LandingPage, Logout } from './Client/Components';
import firebase from 'firebase';
// import * as firebaseui from 'firebaseui';

firebase.initializeApp({
  apiKey: "AIzaSyDojhscgLe7sTB3g9FgE9ybjJCvbCZ1JJw",
  authDomain: "tinkle-8fdd8.firebaseapp.com",
  databaseURL: "https://tinkle-8fdd8.firebaseio.com",
  projectId: "tinkle-8fdd8",
  storageBucket: "tinkle-8fdd8.appspot.com",
  messagingSenderId: "1009503027788"
});
require("firebase/auth");


const firestore = require("firebase/firestore");
const db = firebase.firestore();

// db.collection("users").add({
//   first: "Ada",
//   last: "Lovelace",
//   born: 1815
// })
// .then(function(docRef) {
//   console.log("Document written with ID: ", docRef.id);
// })
// .catch(function(error) {
//   console.error("Error adding document: ", error);
// });

const RootNavigator = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Tinkle',
      // headerRight: (<View><Button title="logout" onPress={() => firebase.auth().signOut().then(a => console.log(a))}></Button></View>)
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
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  // componentDidMount() {
  //   this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
  //     this.setState({
  //       loading: false,
  //       user
  //     })
  //   })
  //   console.log(this.state.user)
  // }
  // componentWillUnmount() {
  //   this.authSubscription();
  // }
  render() {
      // console.log(this.state.user, 'user')
      // if(this.state.loading) return <Text>Welcome</Text>;
      // if(this.state.user) {
        return (
          <View style={styles.container}>
            <RootNavigator />
          </View>
        );
    //   }
    //  return (
    //    <LandingPage />
    //  )
  }
}

