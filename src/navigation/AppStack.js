import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator, Header } from 'react-navigation';
import Bill from '../pages/Bill';
import Map from '../pages/Map';
import Menu from '../pages/Menu';
import QrCodeScanner from '../pages/QrCodeScanner';
import { appTheme } from '../constants/styles';
import { transitionConfig } from '../config/NavigationConfig'
const ConsumerStack = createMaterialBottomTabNavigator(
  {
    Bill: {
      screen: Bill,
      navigationOptions: {
        tabBarLabel: 'Conta',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="attach-money" />
          </View>
        )
      }
    },
    Menu: {
      screen: Menu,
      navigationOptions: {
        tabBarLabel: 'Menu',
        tabBarIcon: ({ tintColor }) => (
          <View>
            <Icon style={[{ color: tintColor }]} size={25} name="restaurant-menu" />
          </View>
        )
      }
    }
  },
  {
    shifting: true,
    backBehavior: 'order',
    initialRouteName: 'Menu',
    activeColor: '#ddd',
    inactiveColor: appTheme.COLOR,
    barStyle: { backgroundColor: appTheme.COLOR }
  }
);

export default createStackNavigator(
  {
    Map: {
      screen: Map,
      navigationOptions: {
        header: null
      }
    },
    Menu: {
      screen: Menu,
      navigationOptions: {
        headerTitle: 'Menu',
        headerStyle: {
          backgroundColor: appTheme.COLOR
        },
        headerTintColor: '#FFF'
      }
    },
    QrCodeScanner: {
      screen: QrCodeScanner,
      navigationOptions: {
        headerTitle: 'Escanear QrCode',
        headerStyle: {
          backgroundColor: appTheme.COLOR,
        },
        headerTintColor: '#FFF'
      }
    },
    Bill: {
      screen: ConsumerStack
    }
  },
  { initialRouteName: 'Map',
transitionConfig 
}
);
