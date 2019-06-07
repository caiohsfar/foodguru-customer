import {
  createStackNavigator,
} from 'react-navigation';

import SignIn from '../pages/SignIn';
import { defaultNavigationOptions } from '../config/NavigationConfig';

export default createStackNavigator(
  {
    SignIn
  },
  { defaultNavigationOptions }
);

