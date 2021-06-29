import React from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';

import { Container, Name } from './styles';

interface AccessoryProps {
    name: string; 
    icon: React.FC<SvgProps>
}

export const Accessory: React.FC<AccessoryProps> = ({icon: Icon, name}) => {
  return  (
    <Container>
        <Icon width={32} height={32} />
        <Name>{name}</Name>
    </Container>
  )
}
