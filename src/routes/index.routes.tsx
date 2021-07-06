import React from 'react';
import { NavigationContainer } from '@react-navigation/native';

import { useAuth } from '../hook/auth';

import { AppTabRoutes } from './app.tab.routes';
import { AuthRoutes } from './auth.routes';
import { LoadingAnimated } from '../components/LoadingAnimated';


export const Routes: React.FC = () => {
  const { user, loading } = useAuth();
  return (
    loading 
    ?
      <LoadingAnimated /> 
    :
      <NavigationContainer>
        { user.id ? <AppTabRoutes /> : <AuthRoutes /> }  
      </NavigationContainer>
  );
}
