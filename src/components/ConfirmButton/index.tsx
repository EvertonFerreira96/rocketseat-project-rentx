import React from 'react';
import { View } from 'react-native';
import { RectButtonProps } from 'react-native-gesture-handler';

import { Container, Title } from './styles';

interface ConfirmButtonProps extends RectButtonProps{
    title: string;
}

const ConfirmButton: React.FC<ConfirmButtonProps> = ({title, ...rest}) => {
  return (
      <Container {...rest}>
          <Title>{title}</Title>
      </Container>
  )
}

export default ConfirmButton;