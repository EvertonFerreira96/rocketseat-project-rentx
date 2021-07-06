import React from 'react';
import { View } from 'react-native';

import { 
    Container,
    Details,
    Brand,
    About,
    Name,
    Rent,
    Period,
    Price,
    Type,
    CarImage


} from './styles';

import { RectButtonProps } from 'react-native-gesture-handler';
import { Car as ModelCar } from '../../database/models/Car';
import { getCarAccessoryIcon } from '../../utils/getCarAccessoryIcon';
import { useNetInfo } from '@react-native-community/netinfo';

interface CardCarProps extends RectButtonProps {
    collection: ModelCar
}

export const Car: React.FC<CardCarProps> = ({ collection, ...rest }) => {
  const { isConnected } = useNetInfo();
  const MotorIcon = getCarAccessoryIcon(collection.fuel_type);
  return (
    <Container {...rest}>
        <Details>
        <Brand>{collection.brand}</Brand>
        <Name>{collection.name}</Name>

        <About>
            <Rent>
                <Period>{collection.period}</Period>
                <Price>{`R$ ${ !!isConnected ? collection.price : '...' }`}</Price>
            </Rent>

            <Type>
                <MotorIcon />
            </Type> 
        </About>
        </Details>

        <CarImage source={{ uri: collection.thumbnail }} resizeMode="contain" />

    </Container>
    );
}
