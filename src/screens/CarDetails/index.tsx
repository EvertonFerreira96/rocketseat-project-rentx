import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import Animated, {
  useSharedValue,
  useAnimatedScrollHandler,
  useAnimatedStyle,
  interpolate,
  Extrapolate
} from 'react-native-reanimated';

import { Button } from '../../components/Button';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';

import { getCarAccessoryIcon } from '../../utils/getCarAccessoryIcon';

import {
  Container,
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accesories,
  Footer

}
  from './styles';
import { CarDTO } from '../../dto/ICarDTO';
import { Accessory } from '../../components/Accessory';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { StatusBar, StyleSheet } from 'react-native';
import { useTheme } from 'styled-components';

interface RouteParamsProps {
  car: CarDTO
}

interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}

export const CarDetails: React.FC = () => {

  const { navigate, goBack } = useNavigation();
  const theme = useTheme()
  const { params } = useRoute();
  const { car } = params as RouteParamsProps;

  const scrollY = useSharedValue(0); 
  const headerStyleAnimation = useAnimatedStyle(() => {
    return {
      height: interpolate(
        scrollY.value,
        [0, 200],
        [215,70],
        Extrapolate.CLAMP
      )
    }
  });

  const sliderCarsStyleAnimation = useAnimatedStyle(() => {
    return {
      opacity: interpolate(
        scrollY.value,
        [0, 200],
        [1,0],
        Extrapolate.CLAMP
      )
    }
  });

  const scrollHandler = useAnimatedScrollHandler(e => {
    /*console.log(e.contentOffset.y);*/
    scrollY.value = e.contentOffset.y
  }); 

  function handleConfirmRental() {
    navigate('Scheduling', {
      car
    });
  }

  function handleBack() {
    goBack();
  }

  return (
    <Container>
      <StatusBar barStyle="dark-content" translucent backgroundColor="transparent" />
      <Animated.View
        style = {
            [ 
              headerStyleAnimation
            , styles.header
            , { backgroundColor: theme.colors.background_secundary }
            ]
          }
      >
        <Header>
          <BackButton onPress={() => handleBack()} />
        </Header>
        <Animated.View style={[ sliderCarsStyleAnimation, { marginTop: getStatusBarHeight() + 32 }]}>
          <ImageSlider imagesUrl={ car.photos } />
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView
        contentContainerStyle={{
          paddingTop: getStatusBarHeight() + 160,
          paddingHorizontal: 24,
          alignItems: 'center', 
          
        }}
        onScroll={scrollHandler}
        showsVerticalScrollIndicator={false}
        scrollEventThrottle={16}
      >
        <Details>
          <Description>
            <Brand>{car.brand}</Brand>
            <Name>{car.name}</Name>
          </Description>

          <Rent>
            <Period>{car.period}</Period>
            <Price>{`R$${car.price}`}</Price>
          </Rent>
        </Details>
        <Accesories>
          {car.accessories.map((item) => <Accessory key={item.type} name={item.name} icon={getCarAccessoryIcon(item.type)} />)}
        </Accesories>
        <About>
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
          {car.about}
        </About>
      </Animated.ScrollView>
      <Footer>
        <Button title="Escolher período de aluguel " onPress={() => handleConfirmRental()} />
      </Footer>
    </Container>
  );
}


const styles = StyleSheet.create({
  header: {
    position: 'absolute',
    overflow: 'hidden',
    zIndex: 1
  }, 
  back: { 
    marginTop: 24
  }
})