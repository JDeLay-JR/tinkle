import { StackNavigator } from 'react-navigation';
import {StyleSheet} from 'react-native'
import { Home, LandingPage} from './client/components';

const style = StyleSheet.create({
  header: {
    shadowColor: 'transparent'
  }
})

const RootNavigator = StackNavigator({
  LandingPage: {
    screen: LandingPage,
    navigationOptions: {
      headerTransparent: true,
      headerStyle: style.header
    }
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Tinkle'
    }
  }
});
export default RootNavigator
