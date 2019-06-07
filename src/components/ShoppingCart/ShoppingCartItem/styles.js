import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    borderBottomWidth: StyleSheet.hairlineWidth,
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 4,
    alignItems: 'center'
  },
  imageContainer: {
    flex: 1,
    alignItems: 'flex-start'
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 40 / 2
  },
  infoContainer: {
    flex: 5,
    marginLeft: 20
  },
  countContainer: {
    flex: 3,
    alignItems: 'center'
  },
  info: {
    fontSize: 16,
    marginVertical: 2
  }
});
