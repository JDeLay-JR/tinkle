import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Home, Toilet, LandingPage, Logout } from './Client/Components';
import firebase from 'firebase';

firebase.initializeApp({
  apiKey: "AIzaSyBi6NksjjFC7txajSPi7Bjqqc_dYJGUMmA",
  authDomain: "tinkle-465a9.firebaseapp.com",
  databaseURL: "https://tinkle-465a9.firebaseio.com",
  projectId: "tinkle-465a9",
  storageBucket: "tinkle-465a9.appspot.com",
  messagingSenderId: "598058718515"
});
const RootNavigator = StackNavigator({
  Main: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Tinkle',
      headerRight: (<View><Button title="logout" onPress={() => firebase.auth().signOut().then(a => console.log(a))}></Button></View>)
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
  componentDidMount() {
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user
      })
    })
    console.log(this.state.user)
  }
  componentWillUnmount() {
    this.authSubscription();
  }
  render() {
      console.log(this.state.user, 'user')
      if(this.state.loading) return <Text>Welcome</Text>;
      if(this.state.user) {
        return (
          <View style={styles.container}>
            <RootNavigator />
          </View>
        );
      }
     return <LandingPage />
  }
}

