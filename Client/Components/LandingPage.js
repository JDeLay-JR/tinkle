import React, {Component} from 'react';
import {styles} from '../../public/stylesheets/styles_LandingPage'
import {Text, View, ImageBackground, TouchableOpacity} from 'react-native';

export default class LandingPage extends Component {
  constructor(props) {
    super(props)
      this.state = {}
  }

  render() {
    const {navigate} = this.props.navigation

    return (
      <View style={styles.container}>
        <ImageBackground style={styles.image} source={require('../../public/signupimg.jpg')}>

        <Text style={styles.paragraph}>Tinkle</Text>
        <Text style={styles.sub}>If you gotta go, you gotta go</Text>

        <TouchableOpacity style={styles.enterButton} onPress={() => navigate('Home')}>
          <Text style={styles.text}>Find me a Potty!</Text>
        </TouchableOpacity>

        </ImageBackground>
      </View>
    )
  }
}
