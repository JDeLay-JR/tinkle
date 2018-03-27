import { StackNavigator } from 'react-navigation';
import { Home, Toilet, LandingPage, SignUp } from './client/components';

const RootNavigator = StackNavigator({
  LandingPage: {
    screen: LandingPage
  },
  Home: {
    screen: Home,
    navigationOptions: {
      headerTitle: 'Tinkle'
    },
  },
  Toilet: {
    screen: Toilet,
    navigationOptions: {
      headerTitle: 'Toilet',
      headerTitleStyle: { alignSelf: 'center' }
    }
  },
  SignUp: {
    screen: SignUp
  }
});

export default RootNavigator
