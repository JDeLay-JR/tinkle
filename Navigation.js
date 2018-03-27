import React, {Component} from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import { StackNavigator } from 'react-navigation';
//Import all components here
import { Home, Toilet, LandingPage, SignUp } from './Client/Components';
import firebase from 'firebase'


class LogOut extends Component {
  render() {
    return (
      <View><Button title="logout" onPress={async () => {
          // await firebase.auth().signOut()
          console.log('Signed Out', this.props)
        }
      }>Logout</Button></View>
    )
  }
}

//Add Components to Navigation Prop
const RootNavigator = StackNavigator({
  LandingPage: {
    screen: LandingPage
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Tinkle',
      headerRight: (<LogOut props={this} />)
    },
  },
  Toilet: {
    screen: Toilet,
    navigationOptions: {
      headerTitle: 'Toilet',
      headerTitleStyle: { alignSelf: 'center' },
      headerRight: (<View />)
    }
  },
  SignUp: {
    screen: SignUp
  }
});

export default RootNavigator
