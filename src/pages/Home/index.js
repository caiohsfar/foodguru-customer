import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { LoginManager } from 'react-native-fbsdk';
import {
  View, Text, Image, Button
} from 'react-native';
import styles from './styles';
import api from '../../services/api';
import { getIdToken } from '../../services/userService';

export default class Home extends Component {
  logout = () => {
    firebase.auth().signOut();
    LoginManager.logOut();
    this.props.navigation.navigate('Auth');
  };

  requestExemplo = async () => {
    const token = await getIdToken();
    // Tem sempre que setar esse token pra validar a requisição
    api.defaults.headers.common['x-access-token'] = token;
    try {
      const result = await api.get('/api/customers');
      console.log('RESULT', result);
    } catch (e) {
      console.log('RESULT', e);
    }
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
