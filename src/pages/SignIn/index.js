import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import { View, ActivityIndicator } from 'react-native';
import { LoginButton, LoginManager } from 'react-native-fbsdk';
import {
  getUserCredential,
  getAccessToken,
  signInFirebase,
  setUserDataFromFacebook
} from '../../services/facebookService';
import styles from './styles';
import Logo from '../../components/Logo';

export default class SignIn extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    isLoading: false
  };

  // Calling the following function will open the FB login dialogue:
  openFacebookDialog = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }
    } catch (e) {
      console.log(e);
    }
  };

  onLoginFinished = async (error, result) => {
    if (error) {
      console.log(`login has error: ${result.error}`);
    } else if (result.isCancelled) {
      console.log('login is cancelled.');
    } else {
      this.setState({ isLoading: true });
      try {
        const data = await getAccessToken();
        const credential = getUserCredential(data.accessToken);
        const user = await signInFirebase(credential);
        await setUserDataFromFacebook(user);
        if (firebase.auth().currentUser) {
          // SEND USER TO API
          // const { email, name } = firebase.auth().currentUser;
          // const user = { email, name };
          // api.post(user);
          // TOKEN USADO PARA FAZER AS REQUISIÇÕES NO BACKEND
          console.log(firebase.auth().currentUser.getIdToken());
          this.props.navigation.navigate('App');
        }
      } catch (e) {
        this.setState({ isLoading: false });
        throw new Error('failed to login');
      }
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.containerLogo}>
          <Logo width={100} height={100} />
        </View>
        {this.state.isLoading && <ActivityIndicator size="large" color="#fff" />}
        <View style={styles.containerButton}>
          {!this.state.isLoading && (
            <View>
              <Text style={{ color: '#fff', fontSize: 15, marginBottom: 20, fontWeight: 'bold' }}>
                Entre com o seu Facebook!
              </Text>
              <LoginButton
                size="large"
                readPermissions={['public_profile', 'email']}
                onPress={this.openFacebookDialog}
                onLoginFinished={this.onLoginFinished}
              />
            </View>
          )}
        </View>
      </View>
    );
  }
}
