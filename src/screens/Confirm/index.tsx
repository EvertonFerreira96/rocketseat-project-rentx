import React from 'react';
import { useWindowDimensions, View } from 'react-native';

import LogoPicture from '../../assets/images/logo_background_gray.svg'
import DonePicture from '../../assets/images/done.svg'

import ConfirmButton from '../../components/ConfirmButton';

import { Container, Content, Title, Message, Footer } from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useNavigation, useRoute } from '@react-navigation/native';

interface Props {
  title: string; 
  subTitle: string; 
  nextScreenRoute: string; 
}

export const Confirm: React.FC= () => {
  const { width } = useWindowDimensions(); 
  
  const route = useRoute();
  const { navigate } = useNavigation();

  const { nextScreenRoute, subTitle, title } = route.params as Props;

  function handleConfirm(){
    navigate(nextScreenRoute);
  }

  return (
    <Container>
        <LogoPicture width={width} />

        <Content>
            <DonePicture width={RFValue(80)} height={RFValue(80)} />
            <Title>
              {title}
            </Title>
            <Message>
              {subTitle}
            </Message>
        </Content>
        <Footer>
            <ConfirmButton title="OK" onPress={() => handleConfirm()} />
        </Footer>
    </Container>
  );
}