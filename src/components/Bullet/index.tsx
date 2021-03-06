import React from 'react';
import { View } from 'react-native';

import { Container } from './styles';

interface Props {
  active?: boolean
}

export const Bullet: React.FC<Props> = ({ active = false }) => {
  return (
      <Container active={active} />
  );
}