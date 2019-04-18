import React, { Component } from 'react';
import { GoogleSignin, GoogleSigninButton } from 'react-native-google-signin';
import firebase from 'react-native-firebase';
import {
  View, Text
} from 'react-native';
import { LoginButton, AccessToken, LoginManager } from 'react-native-fbsdk';

// Adequar ao redux!!!

export default class SignIn extends Component {
  googleSignIn = async () => {
    try {
      // Add any configuration settings here:
      await GoogleSignin.configure();

      const data = await GoogleSignin.signIn();

      // create a new firebase credential with the token
      const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
      // login with credential
      const currentUser = await firebase.auth().signInWithCredential(credential);

      // console.info(JSON.stringify(currentUser.toJSON()));
    } catch (e) {
      // console.error(e);
    }
  }

  // Calling the following function will open the FB login dialogue:
  facebookLogin = async () => {
    try {
      const result = await LoginManager.logInWithReadPermissions(['public_profile', 'email']);

      if (result.isCancelled) {
        throw new Error('User cancelled request'); // Handle this however fits the flow of your app
      }

      console.log(`Login success with permissions: ${result.grantedPermissions.toString()}`);

      // get the access token
      const data = await AccessToken.getCurrentAccessToken();

      if (!data) {
        throw new Error('Something went wrong obtaining the users access token'); // Handle this however fits the flow of your app
      }

      // create a new firebase credential with the token
      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);

      // login with credential
      const currentUser = await firebase.auth().signInWithCredential(credential);

      console.info(JSON.stringify(currentUser.toJSON()));
    } catch (e) {
      console.error(e);
    }
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text> SignIn </Text>
        <GoogleSigninButton
          style={{ width: 192, height: 48 }}
          size={GoogleSigninButton.Size.Wide}
          color={GoogleSigninButton.Color.Dark}
          onPress={this.googleSignIn}
         // disabled={this.state.isSigninInProgress}
        />

        <LoginButton
          onPress={this.facebookLogin}
        />
      </View>
    );
  }
}
