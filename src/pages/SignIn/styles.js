import { StyleSheet } from 'react-native';
import { appTheme } from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: appTheme.COLOR
  },
  containerLogo: {
    flex: 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerButton: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start'
  }
});
