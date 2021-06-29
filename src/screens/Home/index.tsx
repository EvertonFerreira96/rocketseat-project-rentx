import React from 'react';

import {
    Container
    , Header
    , TotalCars
    , HeaderContent
    , CarList
    , MyCarsButton
} from './styles';

import Logo from '../../assets/images/logo.svg';
import { RFValue } from 'react-native-responsive-fontsize';
import { Ionicons } from '@expo/vector-icons'
import { Car } from '../../components/Car';
import { LoadingAnimtaed } from '../../components/LoadingAnimtaed';

import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';

const AnimatedButton = Animated.createAnimatedComponent(RectButton);

import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { api } from '../../services/api';
import { useState } from 'react';

import { CarDTO } from '../../dto/ICarDTO';
import { useTheme } from 'styled-components';
import { RectButton, PanGestureHandler } from 'react-native-gesture-handler';
import { BackHandler, StyleSheet } from 'react-native';

export const Home: React.FC = () => {
    const theme = useTheme();
    const [cars, setCars] = useState<CarDTO[]>([]);
    const [loading, setloading] = useState(true);

    const positionX = useSharedValue(0); 
    const positionY = useSharedValue(0); 

    const myCarsButtonStyle = useAnimatedStyle(() => {
        return {
            transform: [
                { translateX: positionX.value },
                { translateY: positionY.value },
            ]
        }
    });

    const { navigate } = useNavigation();

    function handleCarDetails(car: CarDTO) {
        navigate('CarDetails', {car});
    }

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any){
            ctx.postiionX = positionX.value; 
            ctx.postiionY = positionY.value; 
        },
        onActive(event, ctx){
            positionX.value = ctx.postiionX + event.translationX; 
            positionY.value = ctx.postiionY + event.translationY;  
        },
        onEnd(){
            positionX.value = withSpring(0, { velocity: 1 }) 
            positionY.value = withSpring(0, { velocity: 1 })  

        } 
    });

    function handleOpenMyCars() {
        navigate('MyCars');
    }

    useEffect(() => {
        (async () => {
            try {
                const { data } = await api.get('cars');
                setCars(data);
            } catch (error) {
                console.log(error);
            }
            finally {
                setloading(false);
            }
        })()
    
       // BackHandler.addEventListener('hardwareBackPress', () =>  true); 
    
    });


    return (
        <Container>
            <Header>
                <HeaderContent>
                    <Logo width={RFValue(112)} height={RFValue(12)} />
                    {
                        !loading && 
                    <TotalCars>
                        Total de {cars.length} carros
                    </TotalCars>
                    }
                </HeaderContent>
            </Header>
            {
                loading ? <LoadingAnimtaed />
                    : <CarList
                        data={cars}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Car collection={item} onPress={() => handleCarDetails(item)} />
                        )}
                    />
            }
            {/*
            <PanGestureHandler onGestureEvent={onGestureEvent} >

            <Animated.View
                style={[
                    myCarsButtonStyle, {
                        position:  'absolute',
                        bottom: 13,
                        right: 22
                    }
                ]}
                >
                <AnimatedButton onPress={() => handleOpenMyCars()} style={ [ styles.button, { backgroundColor: theme.colors.main}] }>
                    <Ionicons name="ios-car-sport" size={32} color={theme.colors.shape} />
                </AnimatedButton>
            </Animated.View>
                </PanGestureHandler>
            */
            }

        </Container>
    )
}


const styles = StyleSheet.create({
    button: {
        width: 60,
        height: 60,
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center'
    }
})