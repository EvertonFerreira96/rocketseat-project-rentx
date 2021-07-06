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
  contentContainerStyle:{
    paddingHorizontal: 24,
    paddingVertical:12,
    alignItems: 'center'
  },
  showsVerticalScrollIndicator: false
})`
`;

export const Details = styled.View`
  width: 100%;
  
  flex-direction: row;
  justify-content: space-between;
 
  margin: ${RFValue(18)}px 0 0;
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
  padding: ${RFValue(24)}px ${RFValue(24)}px ${RFValue(24) + getBottomSpace()}px;
`; 

export const RentalPeriod = styled.View`
  width:100%;
  flex-direction: row;
  
  align-items: center;
  justify-content: space-between;

  margin: ${RFValue(42)}px 0 0;
  padding: 0 0 ${RFValue(16)}px;

  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.line};

`;


export const CalendarIcon = styled.View`
  width: ${RFValue(48)}px;
  height: ${RFValue(48)}px;
  align-items: center;
  justify-content: center;
  background-color: ${({theme}) => theme.colors.main};
`;

export const DateInfo = styled.View`

`;

export const DateTitle = styled.Text`
font-family: ${({theme}) => theme.fonts.primary_500}; 
font-size: ${RFValue(10)}px;
color: ${({theme}) => theme.colors.text_detail};
text-transform: uppercase; 

`;

export const DateValue = styled.Text`
font-family: ${({theme}) => theme.fonts.primary_500}; 
font-size: ${RFValue(15)}px;
color: ${({theme}) => theme.colors.title};
text-transform: uppercase; 

`;

export const RentalPrice = styled.View`
  width: 100%; 
  margin-top: 16px; 
`;

export const RentalPriceDetails = styled.View`
width: 100%; 
flex-direction: row;
justify-content: space-between;

`;
export const RentalPriceLabel = styled.Text`
font-family: ${({theme}) => theme.fonts.primary_500}; 
color: ${({theme}) => theme.colors.text_detail};
text-transform: uppercase; 
font-size: ${RFValue(10)}px;

`;

export const RentalPriceQuota = styled.Text`
font-family: ${({theme}) => theme.fonts.primary_500}; 
color: ${({theme}) => theme.colors.title};
font-size: ${RFValue(15)}px;

`;

export const RentalPriceTotal= styled.Text`
font-family: ${({theme}) => theme.fonts.secundary_500}; 
color: ${({theme}) => theme.colors.success};
text-transform: uppercase; 
font-size: ${RFValue(24)}px;

`;


export const OfflineInfo = styled.Text`
font-family: ${({theme}) => theme.fonts.primary_400}; 
color: ${({theme}) => theme.colors.main};
font-size: ${RFValue(10)}px;
text-align: center; 
`;