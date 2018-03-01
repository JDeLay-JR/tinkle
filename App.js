import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { Home, Toilet } from './Client/Components';
console.log('hello');
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

