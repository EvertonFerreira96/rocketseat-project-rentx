import { useTheme } from 'styled-components/native';
import React from 'react';
import { ActivityIndicator } from 'react-native';

export const Loading: React.FC = () => {
    const theme = useTheme()
  return <ActivityIndicator color={theme.colors.main} size="large" style={{flex:1}} />;
}
