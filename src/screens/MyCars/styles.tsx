import styled, { css } from 'styled-components/native';

import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { RFValue } from 'react-native-responsive-fontsize';

interface DateValueProps {
  selected: boolean
}

export const Container = styled.View`
  flex:1;
  align-items: center;
  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
  width: 100%;
  height: ${RFValue(326)}px;

  background-color: ${({theme}) => theme.colors.header};

  justify-content: center; 

  padding: ${RFValue(32)}px ${RFValue(24)}px ${RFValue(24)}px;
`;

export const Title = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secundary_600};
  font-size: ${RFValue(30)}px;

  margin: ${RFValue(24)}px 0 0;
`; 

export const SubTitle = styled.Text`
  color: ${({theme}) => theme.colors.shape};
  font-family: ${({theme}) => theme.fonts.secundary_400};
  font-size: ${RFValue(15)}px;

  margin: ${RFValue(24)}px 0 0;
`; 


export const Content = styled.View.attrs({
})`
flex:1;
width: 100%;
padding: 0 ${RFValue(16)}px;
`;

export const Footer = styled.View`
  padding: ${RFValue(10)}px;
`;



export const Appointments = styled.View`
width: 100%;

flex-direction: row; 
align-items: center;
justify-content: space-between;

padding: ${RFValue(24)}px 0;
`;

export const AppointmentsTitle = styled.Text`
color: ${({theme}) => theme.colors.text};
font-family: ${({theme}) => theme.fonts.primary_400};
font-size: ${RFValue(15)}px;

`;

export const AppointmentsQuantity = styled.Text`
color: ${({theme}) => theme.colors.title};
font-family: ${({theme}) => theme.fonts.primary_500};
font-size: ${RFValue(15)}px;
`;



export const CarWrapper = styled.View`
margin: 0 0 ${RFValue(16)}px;

`;

export const CarFooter = styled.View`
padding: ${RFValue(12)}px;

margin: -${RFValue(10)}px 0 0;
flex-direction: row; 
align-items: center;
justify-content: space-between;

background-color: ${({theme}) => theme.colors.background_secundary};

`;

export const CarFooterTitle = styled.Text`
color: ${({theme}) => theme.colors.text_detail};
font-family: ${({theme}) => theme.fonts.secundary_500};
font-size: ${RFValue(10)}px;

`;

export const CarFooterDate = styled.Text`
color: ${({theme}) => theme.colors.title};
font-family: ${({theme}) => theme.fonts.primary_400};
font-size: ${RFValue(13)}px;
align-items: center;

`;

export const CarFooterPeriod = styled.View`
flex-direction: row; 

`;
