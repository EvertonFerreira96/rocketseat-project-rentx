import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  flex:1;
  background-color: ${({theme}) => theme.colors.background_secundary };
`;

export const Header = styled.View`
  flex-direction: row; 
  justify-content: space-between; 
  align-items: center; 

  position: absolute;
  margin-top: ${getStatusBarHeight() + 18}px;
  margin-left: 24px;
`;



export const CarImages = styled.View`
  margin-top: ${getStatusBarHeight() + 32}px;
`; 



export const Content = styled.ScrollView.attrs({
})`
`;

export const Details = styled.View`
  width: 100%;
  
  flex-direction: row;
  justify-content: space-between;
 
  margin: ${RFValue(38)}px 0 0;
`;

export const Description = styled.View`

`;

export const Brand = styled.Text`
  font-family: ${({theme}) => theme.fonts.secundary_500}; 
  font-size: ${RFValue(10)}px;
  color: ${({theme}) => theme.colors.text_detail}; 
  text-transform: uppercase;
`;

export const Name = styled.Text`  
font-family: ${({theme}) => theme.fonts.secundary_500}; 
font-size: ${RFValue(25)}px;
color: ${({theme}) => theme.colors.title}; 
`;

export const Rent = styled.View`
`;

export const Period = styled.Text`
font-family: ${({theme}) => theme.fonts.secundary_500}; 
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.text_detail};
`;

export const Price = styled.Text`
font-family: ${({theme}) => theme.fonts.secundary_500}; 
font-size: ${RFValue(25)}px;
color: ${({theme}) => theme.colors.main}; 

`;

export const About = styled.Text`
font-family: ${({theme}) => theme.fonts.primary_400}; 
font-size: ${RFValue(15)}px;
line-height: ${RFValue(25)}px;
color: ${({theme}) => theme.colors.text};

text-align: justify;

margin: ${RFValue(23)}px 0 0;
`;

export const Accesories = styled.View`
  width: 100%;

  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;

  margin: ${RFValue(16)}px 0 0;
`;

export const Footer = styled.View`
  width: 100%;
  background-color: ${({theme}) => theme.colors.background_secundary};
  padding: ${RFValue(24)}px ${RFValue(24)}px ${RFValue(24) + getBottomSpace()}px
`; 