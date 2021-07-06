import { useFocusEffect, useNavigation } from '@react-navigation/core';

import { useCallback } from 'hoist-non-react-statics/node_modules/@types/react';
import React, { useEffect } from 'react';
import { Button, StyleSheet, Dimensions } from 'react-native';

import Animated, { useAnimatedStyle, useSharedValue, withTiming, Extrapolate, interpolate, runOnJS } from 'react-native-reanimated'; 

import BrandSvg from '../../assets/images/brand.svg';
import LogoSvg from '../../assets/images/logo.svg';

import { Container } from './styles';

const WIDTH = Dimensions.get('window'); 

export const SplashScreen: React.FC = () => {
  const {navigate} = useNavigation();
  const splashAnimation = useSharedValue(0);

  const logoAnimation = useAnimatedStyle(() => { return { opacity: interpolate(splashAnimation.value, [0, 10, 20, 30, 40, 50], [0, 0, 0, 0, .6 , 1], Extrapolate.CLAMP) } });

  const brandAnimation = useAnimatedStyle(() => { return { opacity: interpolate(splashAnimation.value, [0, 10, 20, 30, 40, 50], [1, .8, .6, .4, 0, 0], Extrapolate.CLAMP ) } });

  function startApp(){ 
    navigate('SignIn')
  }

  useEffect(() => {
    let isMounted = true; 
    if(isMounted)
    splashAnimation.value = withTiming( 100, { duration: 1000 }, () => {'worklet'; runOnJS(startApp)() })
    return () => { isMounted = false }
  },[]);

  return (
      <Container>
        <Animated.View style={[brandAnimation, {position: 'absolute'}]} >
          <BrandSvg width={180} height={100} />
        </Animated.View>

        <Animated.View style={[logoAnimation, {position: 'absolute'}]} >
          <LogoSvg width={180} height={100} />
        </Animated.View>
      </Container>
  )
}