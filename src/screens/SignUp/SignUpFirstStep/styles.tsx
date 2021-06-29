import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const Container = styled.View`
  padding: 0 24px;  
  background-color: ${({theme}) => theme.colors.background_primary};
`;


export const Header = styled.View`
  width: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;

  margin: ${RFValue(32) + getStatusBarHeight()}px 0 0;
`;


export const Steps = styled.View`
    flex-direction: row; 
    align-items: center;
`; 

export const Title = styled.Text`

    margin: ${RFValue(60)}px 0 ${RFValue(16)}px;

    color: ${({theme,}) => theme.colors.title }; 
    font-size:${RFValue(40)}px;
    font-family:${({theme}) => theme.fonts.secundary_600 };
`; 

export const SubTitle = styled.Text`

    color: ${({theme,}) => theme.colors.text}; 
    font-size:${RFValue(15)}px;
    font-family:${({theme}) => theme.fonts.primary_400};
    line-height:${RFValue(25)}px;

`; 

export const Form = styled.View`
    width: 100%;
    margin: ${RFValue(64)}px 0  ${RFValue(16)}px;
`;


export const FormTitle = styled.Text`

    margin: 0 0 ${RFValue(24)}px;
    color: ${({theme,}) => theme.colors.title}; 
    font-size:${RFValue(20)}px;
    font-family:${({theme}) => theme.fonts.secundary_600};
    line-height:${RFValue(30)}px;
`;