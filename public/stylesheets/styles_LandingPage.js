import { StyleSheet, absolute } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
  },
  image: {
    flexGrow: 1,
    display: 'flex',
    height: 100,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  paragraph: {
    marginTop: 80,
    fontSize: 70,
    color: 'silver',
    fontFamily: 'AvenirNext-UltraLight'
  },
  sub: {
    color: 'silver',
    fontFamily: 'AvenirNext-UltraLight',
    fontSize: 25
  },
  text: {
    color: 'white',
    fontFamily: 'AvenirNext-UltraLight',
  },
  enterButton: {
    borderColor: 'white',
    borderWidth: StyleSheet.hairlineWidth,
    paddingRight: 10,
    paddingLeft: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginTop: 220,
  }
});
