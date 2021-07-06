import React, { useState, useEffect } from 'react';
import { Alert, BackHandler, Button, StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import Animated, { useSharedValue, useAnimatedStyle, useAnimatedGestureHandler, withSpring } from 'react-native-reanimated';

import { useNavigation } from '@react-navigation/native';
import { useNetInfo } from '@react-native-community/netinfo';
import { synchronize } from '@nozbe/watermelondb/sync';

import { database } from '../../database';

import { RFValue } from 'react-native-responsive-fontsize';

import { api } from '../../services/api';

import { CarDTO } from '../../dto/ICarDTO';

import { useTheme } from 'styled-components';

import { LoadingAnimated } from '../../components/LoadingAnimated';
import { Car } from '../../components/Car';
import { Car as ModelCar } from '../../database/models/Car';

import Logo from '../../assets/images/logo.svg';

import {
    Container
    , Header
    , TotalCars
    , HeaderContent
    , CarList
} from './styles';

const AnimatedButton = Animated.createAnimatedComponent(RectButton);

export const Home: React.FC = () => {

    const { isConnected } = useNetInfo();

    const theme = useTheme();

    const [cars, setCars] = useState<ModelCar[]>([]);

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

    function handleCarDetails(car: ModelCar) {
        navigate('CarDetails', { car });
    }

    const onGestureEvent = useAnimatedGestureHandler({
        onStart(_, ctx: any) {
            ctx.postiionX = positionX.value;
            ctx.postiionY = positionY.value;
        },
        onActive(event, ctx) {
            positionX.value = ctx.postiionX + event.translationX;
            positionY.value = ctx.postiionY + event.translationY;
        },
        onEnd() {
            positionX.value = withSpring(0, { velocity: 1 })
            positionY.value = withSpring(0, { velocity: 1 })

        }
    });

    function handleOpenMyCars() {
        navigate('MyCars');
    }


    async function offlineSynchronize() {
        console.log("Begin Synchronize")
        await synchronize({
            database,
            pullChanges: async ({ lastPulledAt }) => {

                const { data } = await api.get(`cars/sync/pull?lastPulledVersion=${lastPulledAt || 0}`);

                const { changes, latestVersion } = data;
                console.log(lastPulledAt)
                console.log(changes)

                return {
                    changes: changes,
                    timestamp: latestVersion
                }
            },
            pushChanges: async ({ changes }) => {
                const user = changes.users;
                await api.post('/users/sync', user).catch(console.log);
            }
        });
    }


    useEffect(() => {

        let isMounted = true;

        if (isMounted) {

            (async () => {

                try {
                    const carCollection = database.get<ModelCar>("cars");
                    const cars = await carCollection.query().fetch();
                    setCars(cars);
                } catch (error) {
                }
                finally {
                    setloading(false);
                }
            })()
        }
        return () => { isMounted = false }

    });


    useEffect(() => {
        BackHandler.addEventListener('hardwareBackPress', () =>  true); 
            if(isConnected === true)
                offlineSynchronize();


    }, [isConnected])

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
                loading ? <LoadingAnimated />
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