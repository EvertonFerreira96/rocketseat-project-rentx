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
import { SignIn } from '../screens/SignIn';
import { SignUpFirstStep } from '../screens/SignUp/SignUpFirstStep';
import { SignUpSecondStep } from '../screens/SignUp/SignUpSecondStep';

export const AuthRoutes = () => {
  return (
      <Navigator 
        headerMode="none"
        initialRouteName="SplashScreen"
        >
          <Screen name="SplashScreen" component={SplashScreen} />
          <Screen name="SignIn" component={SignIn} options={{ gestureEnabled: false }} />
          <Screen name="SignUpFirstStep" component={SignUpFirstStep} />
          <Screen name="SignUpSecondStep" component={SignUpSecondStep} />
          <Screen name="Confirm" component={Confirm} />
      </Navigator>
  );
}