import styled from 'styled-components/native';
import { RFValue } from 'react-native-responsive-fontsize';

export const Container = styled.View`
  flex:1; 
  background-color: ${({theme}) => theme.colors.header}; 

  padding: ${RFValue(96)}px 0 0; 
     
`;

export const Content = styled.View`
flex:1; 
align-items: center;
justify-content: center;

  
`;


export const Title = styled.Text`
  font-size: ${RFValue(30)}px; 
  color: ${({theme}) => theme.colors.shape}; 
  font-family: ${({theme}) => theme.fonts.secundary_600}; 

  margin: ${RFValue(40)}px 0 0; 
`;

export const Message = styled.Text`
color: ${({theme}) => theme.colors.text_detail}; 
font-size: ${RFValue(15)}px; 
font-family: ${({theme}) => theme.fonts.primary_400}; 
line-height: ${RFValue(25)}px; 
text-align: center; 

margin: ${RFValue(16)}px 0 0; 
  
`;

export const Footer = styled.View`
    width: 100%;
    align-items: center;
    margin: ${RFValue(80)}px 0;
`;