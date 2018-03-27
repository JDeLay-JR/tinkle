import React from 'react'
import firebase from 'firebase'
import { View } from 'react-native'
import RootNavigator from './Navigation'
import {firebaseConfig} from '../tinkle/secrets'
import {styles} from './public/stylesheets/styles_App'

export default class App extends React.Component {
  componentDidMount() {
    firebase.initializeApp(firebaseConfig)
  }

  render() {
        return (
          <View style={styles.container}>
            <RootNavigator />
          </View>
        );
  }
}
