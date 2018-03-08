import React from 'react';
import { View, StyleSheet} from 'react-native';
import firebase from 'firebase';
import {firebaseConfig} from '../tinkle/secrets'
import RootNavigator from './Navigation'

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true
    }
  }
  componentDidMount() {
    firebase.initializeApp(firebaseConfig)
    this.authSubscription = firebase.auth().onAuthStateChanged((user) => {
      this.setState({
        loading: false,
        user
      })
    })
  }
  componentWillUnmount() {
    this.authSubscription();
  }

  render() {
        return (
          <View style={styles.container}>
            <RootNavigator />
          </View>
        );
  }
}

//Stylesheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
