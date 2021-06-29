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
import { CarDTO } from '../../dto/ICarDTO';
import { getCarAccessoryIcon } from '../../utils/getCarAccessoryIcon';

interface CardCarProps extends RectButtonProps {
    collection: CarDTO
}

export const Car: React.FC<CardCarProps> = ({ collection, ...rest }) => {
  const MotorIcon = getCarAccessoryIcon(collection.fuel_type);
  return (
    <Container {...rest}>
        <Details>
        <Brand>{collection.brand}</Brand>
        <Name>{collection.name}</Name>

        <About>
            <Rent>
                <Period>{collection.period}</Period>
                <Price>{`R$ ${collection.price} `}</Price>
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
