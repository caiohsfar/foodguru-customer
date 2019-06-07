import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';
import { View } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { createStackNavigator } from 'react-navigation';
import Bill from '../pages/Bill';
import Map from '../pages/Map';
import Menu from '../pages/Menu';
import ScannerScreen from '../pages/ScannerScreen';
import { appTheme } from '../constants/styles';

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
    inactiveColor: '#800000',
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
          backgroundColor: '#520000'
        },
        headerTintColor: '#fff'
      }
    },
    ScannerScreen,
    Bill: {
      screen: ConsumerStack
    }
  },
  { initialRouteName: 'Map' }
);
