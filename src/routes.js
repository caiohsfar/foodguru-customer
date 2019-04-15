import { createAppContainer, createSwitchNavigator, createStackNavigator } from 'react-navigation';

import Splash from './pages/Splash';
import SignIn from './pages/SignIn';
import Home from './pages/Home';

const AppStack = createStackNavigator(
  { Home }
);
const AuthStack = createStackNavigator(
  { SignIn }
);
// A Switch Navigator é feita para o fluxo de autenticação. (ler documentação)

const Routes = createAppContainer(createSwitchNavigator(
  {
    Splash,
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'Splash',
  }
));

export default Routes;
