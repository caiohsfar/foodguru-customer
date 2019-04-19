import React, { Component } from 'react';
import firebase from 'react-native-firebase';
import {
  View, Text, ActivityIndicator
} from 'react-native';
import {
  LoginButton, LoginManager
} from 'react-native-fbsdk';
import {
  getUserCredential, getAccessToken, signInFirebase, setUserDataFromFacebook
} from '../../services/facebookService';

export default class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: false };
  }

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
  }

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
          this.props.navigation.navigate('App');
        }
      } catch (e) {
        throw new Error('failed to login');
      }
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> SignIn </Text>
        {this.state.isLoading && <ActivityIndicator />}
        <LoginButton
          readPermissions={['public_profile', 'email']}
          onPress={this.openFacebookDialog}
          onLoginFinished={this.onLoginFinished}
        />
      </View>
    );
  }
}
