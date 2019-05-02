import React, { Component } from 'react';
import { View } from 'react-native';
import firebase from 'react-native-firebase';
import styles from './styles';

/*
    Tela que aparecerá e decidirá
    se o usuário deve ir pra tela de login ou pra Home;
    Pode ser a Splash screen
*/
import Logo from '../../components/Logo';

export default class Splash extends Component {
  componentDidMount = () => {
    this.navigate();
  };

  navigate = () => {
    setTimeout(() => {
      if (firebase.auth().currentUser) {
        this.props.navigation.navigate('App');
      } else {
        this.props.navigation.navigate('Auth');
      }
    }, 2000);
  };

  render() {
    return (
      <View style={styles.container}>
        <Logo width={100} height={100} resizeMode="contain" />
      </View>
    );
  }
}
