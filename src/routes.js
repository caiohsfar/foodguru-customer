import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Splash from './pages/Splash';
import SignIn from './pages/SignIn';
import Home from './pages/Home';
import {
  transitionConfig,
  defaultNavigationOptions
} from './config/NavigationConfig';


const AppStack = createStackNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: { headerTitle: 'Home' }
    }
  },
  { transitionConfig, defaultNavigationOptions }
);
const AuthStack = createStackNavigator(
  {
    SignIn: {
      screen: SignIn,
      navigationOptions: { headerTitle: 'Login' }
    }
  },
  { defaultNavigationOptions }
);
// A Switch Navigator é feita para o fluxo de autenticação. (ler documentação)

const Routes = createAppContainer(createSwitchNavigator(
  {
    Splash,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Auth',
  }
));

export default Routes;
