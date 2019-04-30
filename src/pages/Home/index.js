import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { LoginManager } from 'react-native-fbsdk';
import {
  View, Text, Image, Button
} from 'react-native';
import styles from './styles';

export default class Home extends Component {
  logout = () => {
    firebase.auth().signOut();
    LoginManager.logOut();
    this.props.navigation.navigate('Auth');
  };

  render() {
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: firebase.auth().currentUser.photoURL }} />
        <Text>{firebase.auth().currentUser.email}</Text>
        <Button onPress={this.logout} title="LogOut" />
      </View>
    );
  }
}
