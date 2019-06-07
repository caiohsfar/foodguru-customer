import { StyleSheet } from 'react-native';
import { appTheme } from '../../constants/styles';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  panel: {
    flex: 1,
    backgroundColor: '#ddd',
    position: 'relative',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  panelHeader: {
    paddingHorizontal: 20,
    flexDirection: 'row',
    height: 65,
    backgroundColor: appTheme.COLOR,
    alignItems: 'center',
    justifyContent: 'space-between',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10
  },
  containerCount: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start'
  },
  containerShow: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerPrice: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
    paddingHorizontal: 10
  }
});
