import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const {Navigator, Screen} = createBottomTabNavigator();

import HomePicture from '../assets/images/home.svg'; 
import CarPicture from '../assets/images/car.svg'; 
import PeoplePicture from '../assets/images/people.svg'; 

import { Home } from '../screens/Home';
import { MyCars } from '../screens/MyCars';
import { AppStackRoutes } from './app.stack.routes';
import { useTheme } from 'styled-components';
import { Platform } from 'react-native';

export const AppTabRoutes = () => {
  const theme = useTheme();
  return (
      <Navigator 
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: theme.colors.main,
          inactiveTintColor: theme.colors.text_detail,
          showLabel: false,
          style: {
            paddingVertical: Platform.OS === "ios" ? 20 : 0,
            height: 78,
            backgroundColor: theme.colors.background_primary
          }
        }}
        >
          <Screen 
            name="Home" 
            component={AppStackRoutes} 
            options={{ 
              tabBarIcon: ({ color }) => (
                <HomePicture width={24} height={24} fill={color} />
              )
            }} 
          />
          <Screen
          name="MyCars"
          component={MyCars}
          options={{ 
            tabBarIcon: ({ color }) => (
              <CarPicture width={24} height={24} fill={color}/>
            )
          }} 
          />
          <Screen
          name="Profile"
          component={Home}
          options={{ 
            tabBarIcon: ({ color }) => (
              <PeoplePicture width={24} height={24} fill={color}/>
            )
          }}
          />
      </Navigator>
  );
}