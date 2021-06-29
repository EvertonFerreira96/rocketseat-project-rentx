import React from 'react';
import { ThemeProvider } from 'styled-components';
import { useFonts, Inter_400Regular, Inter_500Medium } from '@expo-google-fonts/inter';
import {Archivo_400Regular, Archivo_500Medium, Archivo_600SemiBold } from '@expo-google-fonts/archivo';

import { AppProvider } from './src/hook';

import themes from './src/styles/themes';

import AppLoading from 'expo-app-loading';
import { StatusBar } from 'react-native';

import { Routes } from './src/routes/index.routes';

export default function App() {

  const theme = themes.Light; 

  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_500Medium,
    Archivo_400Regular,
    Archivo_500Medium,
    Archivo_600SemiBold,
  })

  if(!fontsLoaded){
    return (
        <AppLoading />
    )
  }

  return (
    <ThemeProvider theme={theme}>
      <StatusBar  barStyle="light-content"  backgroundColor="transparent" translucent/>
      <AppProvider>
        <Routes />
      </AppProvider>
    </ThemeProvider>
  )
} 