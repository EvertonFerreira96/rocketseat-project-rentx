import React from 'react';
import { ActivityIndicator } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';
import { useTheme } from 'styled-components';
import { Container, Title } from './styles';

interface ButtonProps extends RectButtonProps{
    color?: string;
    title: string;
    loading?: boolean; 
    light?: boolean;  
}

export const Button: React.FC<ButtonProps> = ({enabled = true, loading=false, light = false, title, color, ...rest}) => {
  const theme = useTheme();
  return (
      <Container color={color} 
        enabled={enabled} 
        style={{opacity: !enabled || loading ? 0.6 : 1 }}
        {...rest} 
        >
        <Title light={light} > 
          {
          !loading 
          ?
          title
          :
          <ActivityIndicator color={theme.colors.shape}/>
          }
        </Title>
      </Container>
  );
}
