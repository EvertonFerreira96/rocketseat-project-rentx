import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.KeyboardAvoidingView`
  padding: 0 ${RFValue(24)}px;

  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  margin: ${RFValue(115) + getStatusBarHeight()}px 0 0;

`;

export const Title = styled.Text`
  font-size: ${RFValue(40)}px;
  font-family: ${({theme}) => theme.fonts.secundary_600 };
  color: ${({theme}) => theme.colors.title};
`; 


export const SubTitle = styled.Text`
  font-size: ${RFValue(15)}px;
  font-family: ${({theme}) => theme.fonts.primary_400 };
  color: ${({theme}) => theme.colors.text};
  line-height: ${RFValue(25)}px;
  margin: ${RFValue(16)}px 0 0;

`; 


export const Footer = styled.View`
  width: 100%;
`;

export const Form = styled.View`  
  margin: ${RFValue(64)}px 0; 
`;
