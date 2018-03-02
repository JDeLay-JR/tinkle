import React, {Component} from 'react';
import {Text, View} from 'react-native';
import firebase from 'firebase';


export default class Signup extends Component {
    constructor(props) {
        super(props)
    }
    render() {
        return (
            <View>
                <Text>This is the signup page</Text>
            </View>
        )
    }
}