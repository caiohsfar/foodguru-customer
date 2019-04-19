import React, { Component } from 'react';
import {
  View, ActivityIndicator, StatusBar, Text
} from 'react-native';
import firebase from 'react-native-firebase';
/*
    Tela que aparecerá e decidirá
    se o usuário deve ir pra tela de login ou pra Home;
    Pode ser a Splash screen
*/

export default class Splash extends Component {
  navigate = () => {
    setTimeout(() => {
      if (firebase.auth().currentUser) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    },
    2000);
  }

  render() {
    this.navigate();
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
        <Text> Splashhhh! </Text>
      </View>
    );
  }
}
