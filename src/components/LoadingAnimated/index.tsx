import React from 'react';
import { View } from 'react-native';

import LottieView from 'lottie-react-native'; 

import { Container } from './styles';

import LoadCar from '../../assets/animated/load_car.json'; 

export const LoadingAnimated: React.FC = () => {
  return (
      <Container>
          <LottieView source={LoadCar} autoPlay style={{ height: 200 }} resizeMode="contain" loop />
      </Container>
  );
}
