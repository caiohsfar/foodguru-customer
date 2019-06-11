import { StyleSheet } from 'react-native';

const opacity = 'rgba(0, 0, 0, .6)';
export default StyleSheet.create({
  layerBottom: {
    flex: 1,
    backgroundColor: opacity
  },
  info: {
    bottom: 0,
    fontSize: 16,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 10
  }
});
