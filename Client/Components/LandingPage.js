import React, {Component} from 'react';
import {Text, View, Image, StyleSheet, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

export default class LandingPage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: '',
            loading: true
        }
    }
    async enterApp() {
        let {email, password} = this.state;
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(() => this.setState({error: '', loading: false}))
            .catch(() => {
                firebase.auth().createUserWithEmailAndPassword(email, password)
                    .then(() => firebase.auth().getUserByEmail(email).then(person => console.log(person, 'got him!')))
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.', loading: false });
                    });
            })
    }
    render() {
        return (
            <View style={styles.container}>
            <ImageBackground style={styles.image} source={require('../../signupimg.jpg')}>
            <Text style={styles.paragraph}>Tinkle</Text>
            <Text style={styles.sub}>If you gotta go, you gotta go</Text>
            <TextInput   onChangeText={email => this.setState({ email })} value={this.state.email} placeholderTextColor='white' placeholder="email" style={[styles.textInput, styles.textInputEmail]}/>
            <TextInput   onChangeText={password => this.setState({ password })} value={this.state.password} secureTextEntry placeholderTextColor='white' placeholder="password" style={styles.textInput}/>
            <TouchableOpacity style={styles.enterButton} onPress={() => this.enterApp()}><Text style={{color: 'white', fontFamily: 'AvenirNext-UltraLight' }}>Enter</Text></TouchableOpacity>
            </ImageBackground>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      alignItems: 'stretch',
    },
    image: {
      flexGrow:1,
      height:null,
      width:null,
      display: 'flex',
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
    textInput: {
        borderBottomColor: 'white',
        borderBottomWidth: StyleSheet.hairlineWidth,
        width: '70%',
        color: 'white',
        fontFamily: 'AvenirNext-UltraLight',
    },
    textInputEmail: {
        marginTop: 40,
        marginBottom: 40
    },
    enterButton: {
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 20
    }
  });
