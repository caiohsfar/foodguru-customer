import React from 'react';
import {
  StyleSheet, Text, View, Image
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Header = ({ title }) => (
  <View style={styles.box}>
    <Text style={styles.header}>{title}</Text>
  </View>
);

const styles = StyleSheet.create({
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    margin: 5,
    textAlign: 'center'
  },
  box: {
    backgroundColor: '#520000',
    maxHeight: 40,
    marginTop: 1
  }
});

export default Header;
