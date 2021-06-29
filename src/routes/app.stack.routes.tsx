import * as React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

const {Navigator, Screen} = createStackNavigator();

import { CarDetails } from '../screens/CarDetails';
import { Home } from '../screens/Home';
import { Scheduling } from '../screens/Scheduling';
import { Confirm } from '../screens/Confirm';
import { SchedulingDetails } from '../screens/SchedulingDetails';
import { MyCars } from '../screens/MyCars';
import { SplashScreen } from '../screens/SplashScreen';

export const AppStackRoutes = () => {
  return (
      <Navigator 
        headerMode="none"
        initialRouteName="Home"
        >
          <Screen name="Home" component={Home} options={{ gestureEnabled: false }} />
          <Screen name="MyCars" component={MyCars} />
          <Screen name="CarDetails" component={CarDetails} />
          <Screen name="Scheduling" component={Scheduling} />
          <Screen name="Confirm" component={Confirm} />
          <Screen name="SchedulingDetails" component={SchedulingDetails} />
      </Navigator>
  );
}