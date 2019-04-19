import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { LoginManager } from 'react-native-fbsdk';
import {
  View, Text, Image, Button
} from 'react-native';

export default class Home extends Component {
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Image
          style={{
            width: 100,
            height: 100,
            borderRadius: 100 / 2
          }}
          source={{ uri: firebase.auth().currentUser.photoURL }}
        />
        <Text>
          {firebase.auth().currentUser.email}
        </Text>
        <Button
          onPress={() => {
            firebase.auth().signOut();
            LoginManager.logOut();
            this.props.navigation.navigate('Auth');
          }}
          title="LogOut"
        />
      </View>
    );
  }
}
