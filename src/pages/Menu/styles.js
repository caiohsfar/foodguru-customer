import { StyleSheet } from 'react-native';
import { appTheme } from '../../constants/styles';

export default StyleSheet.create({
  header: {
    paddingHorizontal: 16 * 2
  },
  text: {
    textAlign: 'center',
    // fontWeight: 'bold',
    fontSize: 20
  },
  textCardLeft: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16
  },
  textStuff: {
    textAlign: 'center',
    marginTop: 3,
    fontSize: 14
  },
  textCardRight: {
    textAlign: 'center',
    fontSize: 16,
    marginRight: 10,
    fontWeight: 'bold',
    color: appTheme.COLOR
  },
  gray: { color: '#9DA3B4' },
  avatar: {
    height: 16 * 2.2,
    width: 16 * 2.2
  },
  tabs: {
    borderBottomColor: '#C5CCD6',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 16,
    marginHorizontal: 16 * 2
  },
  tab: {
    alignSelf: 'flex-start',
    marginRight: 32,
    paddingBottom: 5
  },
  active: {
    borderBottomColor: appTheme.COLOR,
    borderBottomWidth: 3
  },
  categories: {
    flexWrap: 'wrap',
    paddingHorizontal: 4,
    marginBottom: 16 * 3.5
  },
  imageCard: {
    width: 60,
    height: 60,
    borderRadius: 10,
    marginRight: 5
  },
  category: {
    minWidth: (35.2 - 25 * 2.4 - 16) / 2,
    maxWidth: (35.2 - 25 * 2.4 - 16) / 2,
    maxHeight: (35.2 - 25 * 2.4 - 16) / 2
  },
  buttonOrder: {
    alignItems: 'center',
    marginTop: 10,
    marginLeft: 10
  },
  order: {
    height: 20,
    width: 20,
    backgroundColor: appTheme.COLOR,
    borderRadius: 50
  },
  more: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  imageContainer: {
    alignItems: 'flex-start',
    justifyContent: 'center',
    margin: 10
  },
  modalContentContainer: {
    flex: 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  modalProductInfoContainer: {
    textAlign: 'center',
    margin: 10,
    flex: 1
  },
  image: {
    width: 50,
    height: 50,
    borderRadius: 50 / 2
  },
  name: {
    fontSize: 19,
    fontWeight: 'bold',
    flexWrap: 'wrap',
    marginBottom: 10
  },
  description: {
    fontSize: 14,
    color: 'grey',
    flexWrap: 'wrap'
  },
  price: {
    color: appTheme.COLOR,
    fontSize: 18,
    fontWeight: 'bold'
  },
  modalFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  }
});
