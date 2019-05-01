import firebase from 'react-native-firebase';

export const getIdToken = async () => {
  try {
    return await firebase.auth().currentUser.getIdToken();
  } catch (e) {
    return null;
  }
};
