import React, {Component} from 'react';
import {Text, View, StyleSheet, ImageBackground, TextInput, TouchableOpacity} from 'react-native';
import firebase from 'firebase';

export default class SignUp extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }
    async createUser() {
        let {email, password} = this.state;
        try {
            await firebase.auth().createUserWithEmailAndPassword(email, password)
            this.props.navigation.navigate('Home')
        } catch (error){
            console.log('Error on login', error)
            this.setState({ error: 'Authentication failed.'})
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ImageBackground style={styles.image} source={require('../../public/signupimg.jpg')}>
                    {/* Header and Sub-Header */}
                    <Text style={styles.paragraph}>Tinkle</Text>
                    <Text style={styles.sub}>Create an Account</Text>

                    {/* Email and Password Inputs */}

                    <TextInput   onChangeText={email => this.setState({ email })} value={this.state.email} placeholderTextColor='white' placeholder="email" style={[styles.textInput, styles.textInputEmail]} />

                    <TextInput   onChangeText={password => this.setState({ password })} value={this.state.password} secureTextEntry placeholderTextColor='white' placeholder="password" style={styles.textInput} />

                    {/* Sign In Button */}
                    <TouchableOpacity style={styles.signUpButton} onPress={() => this.createUser()}><Text style={{color: 'white', fontFamily: 'AvenirNext-UltraLight' }}>Sign Up</Text></TouchableOpacity>

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
    signUpButton: {
        borderColor: 'white',
        borderWidth: StyleSheet.hairlineWidth,
        paddingRight: 10,
        paddingLeft: 10,
        paddingTop: 5,
        paddingBottom: 5,
        marginTop: 20
    }
  });
