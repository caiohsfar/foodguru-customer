import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'flex-end'
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2
  },
  
  mapView: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0
  },
  placesContainer: {
    width: '100%',
    maxHeight: 150
  },
  place: {
    width: width - 40,
    maxHeight: 150,
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginHorizontal: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    padding: 20
  },
  title: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 20,
    backgroundColor: 'transparent'
  },
  description: {
    textAlign: 'center',
    color: '#999',
    fontSize: 12,
    marginTop: 5
  },
  buttonMenu: {
    marginTop: 10
  },
  menu: {
    width: width - 80,
    height: 30,
    backgroundColor: '#cd170c',
    borderRadius: 3
  },
  menuFont: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 18,
    color: '#fff'
  }
});
