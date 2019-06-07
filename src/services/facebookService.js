import firebase from 'react-native-firebase';
import {
  AccessToken, GraphRequest, GraphRequestManager
} from 'react-native-fbsdk';

export const getUserCredential = (accessToken) => {
  try {
    return firebase.auth.FacebookAuthProvider.credential(accessToken);
  } catch (e) {
    throw new Error('Error trying to get user credential.');
  }
};

export const getAccessToken = async () => {
  try {
    return await AccessToken.getCurrentAccessToken();
  } catch (err) {
    throw new Error('Something went wrong obtaining the users access token');
  }
};

export const signInFirebase = async (credential) => {
  try {
    return await firebase.auth().signInWithCredential(credential);
  } catch (err) {
    throw new Error('Something went wrong when signin in firebase');
  }
};

export const updateUserEmail = async (email) => {
  await firebase.auth().currentUser.updateEmail(email);
};

export const setUserDataFromFacebook = async (user) => {
  const responseInfoCallback = async (icError, icResult) => {
    if (icError) {
      console.log(icError);
    } else {
      console.log(icResult);
      await updateUserEmail(icResult.email);
    }
  };
  const infoRequest = new GraphRequest('/me', {
    accessToken: user.accessToken,
    parameters: {
      fields: {
        string: 'email,name,first_name,last_name'
      }
    }
  }, await responseInfoCallback);

  // Start the graph request.
  new GraphRequestManager()
    .addRequest(infoRequest)
    .start();
};
