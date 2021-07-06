import React from 'react';
import { View } from 'react-native';
import { SvgProps } from 'react-native-svg';
import { useTheme } from 'styled-components/native';

import { Container, Name } from './styles';

interface AccessoryProps {
    name: string; 
    icon: React.FC<SvgProps>
}

export const Accessory: React.FC<AccessoryProps> = ({icon: Icon, name}) => {
  const theme = useTheme();
  return  (
    <Container>
        <Icon width={32} height={32} fill={ theme.colors.header } />
        <Name>{name}</Name>
    </Container>
  )
}
