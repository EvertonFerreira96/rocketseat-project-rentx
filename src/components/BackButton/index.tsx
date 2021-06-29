import React from 'react';
import { MaterialIcons } from '@expo/vector-icons'
import { Container } from './styles';
import { useTheme } from 'styled-components';


import { BorderlessButtonProps } from 'react-native-gesture-handler';

interface BackButtonProps extends BorderlessButtonProps{
    color? : string
}

const BackButton: React.FC<BackButtonProps> = ({color, ...rest}) => {
    const theme = useTheme(); 
  return (
    <Container {...rest}> 
        <MaterialIcons 
        size={24}
        name="chevron-left"
        color={color ? color : theme.colors.text}
        />
    </Container>
  );
}

export default BackButton;