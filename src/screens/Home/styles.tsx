import { FlatList } from 'react-native';
import { RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';
import { CarDTO } from '../../dto/ICarDTO';

export const Container = styled.View`
  flex:1; 
  background-color: ${({theme}) => theme.colors.background_primary};
`;

export const Header = styled.View`
width: 100%; 
height: ${RFValue(113)}px;
background-color: ${({theme}) => theme.colors.header}; 
justify-content: flex-end;
`;

export const HeaderContent = styled.View`
flex-direction: row; 
justify-content: space-between;
align-items: center;
padding: ${RFValue(32)}px ${RFValue(24)}px;
`; 


export const TotalCars = styled.Text`
  font-size: ${RFValue(16)}px;
  font-family: ${({theme}) => theme.fonts.primary_400};
  color: ${({theme}) => theme.colors.text}; 
`; 


export const CarList = styled(FlatList as new () => FlatList<CarDTO>).attrs({
  contentContainerStyle: {
    padding: 24
  },
  showsVerticalScrollIndicator: false
})``; 


export const MyCarsButton = styled(RectButton)`
width: ${RFValue(60)}px;
height: ${RFValue(60)}px;
background-color: ${({theme}) => theme.colors.main}; 


justify-content: center;
align-items: center;

border-radius: ${RFValue(30)}px;

position: absolute;
bottom: ${RFValue(18)}px;
right: ${RFValue(18)}px;

`;