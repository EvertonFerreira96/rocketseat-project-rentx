import styled, { css } from 'styled-components/native';

import { getBottomSpace, getStatusBarHeight } from 'react-native-iphone-x-helper';

import { RFValue } from 'react-native-responsive-fontsize';

interface DateValueProps {
  selected: boolean
}

export const Container = styled.View`
  flex:1;
  background-color: ${({theme}) => theme.colors.background_secundary};
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
  font-size: ${RFValue(32)}px;

  margin: ${RFValue(24)}px 0 0;
`; 


export const RentalPeriod = styled.View`
  width: 100%; 
  
  flex-direction: row;
  justify-content: space-between; 
  align-items: center;

  margin: ${RFValue(32)}px 0;
`;

export const DateInfo = styled.View`
  width: 30%; 

`;

export const DateTitle = styled.Text`
  color: ${({theme}) => theme.colors.text};
  font-family: ${({theme}) => theme.fonts.secundary_500};
  font-size: ${RFValue(10)}px;

`;

export const DateValue = styled.View<DateValueProps>`

${({ selected, theme }) => !selected && css`
  border-bottom-width: 1px;
  border-bottom-color: ${({theme}) => theme.colors.text};
  padding-bottom: 6px;

`};

`;

export const DateTextValue = styled.Text`

color: ${({theme}) => theme.colors.shape};
font-family: ${({theme}) => theme.fonts.primary_500};
font-size: ${RFValue(15)}px;
`; 

export const Content = styled.ScrollView.attrs({
  contentContainerStyle: {
    paddingBottom: getBottomSpace() + RFValue(24)
  },
  showsVerticalScrollIndicator: false
})`

`;

export const Footer = styled.View`
  padding: ${RFValue(10)}px;
`;