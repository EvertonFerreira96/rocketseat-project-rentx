import styled, { css } from 'styled-components/native';
import { BorderlessButton, RectButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import { getStatusBarHeight } from 'react-native-iphone-x-helper';
import { TouchableOpacity } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';

interface OptionProps {
    active: boolean; 
}

export const Container = styled.View`
  background-color: ${({ theme }) => theme.colors.background_primary};
`;

export const Header = styled.View`
    width: 100%;
    height: ${RFValue(227)}px;

    background-color: ${({ theme }) => theme.colors.header};

    padding: 0 ${RFValue(24)}px;
    align-items: center;
  
`;

export const HeaderTop = styled.View`
    width: 100%;

    flex-direction: row;
    align-items: center;
    justify-content: space-between;

    margin: ${getStatusBarHeight() + RFValue(32)}px 0 0;
`;

export const HeaderTitle = styled.Text`
    font-size: ${RFValue(20)}px;
    font-family: ${({ theme }) => theme.fonts.secundary_600};

    color: ${({ theme }) => theme.colors.background_secundary};
  
`;

export const LogoutButton = styled(BorderlessButton)`
  
`;

export const PhotoContainer = styled.View`
    height: ${RFValue(160)}px;
    width: ${RFValue(160)}px;
    
    border-radius: ${RFValue(80)}px;

    background-color: ${({ theme }) => theme.colors.shape};
    margin: ${RFValue(32)}px 0 0;
  
`;

export const Photo = styled.Image`
    height: ${RFValue(160)}px;
    width: ${RFValue(160)}px;
    border-radius: ${RFValue(80)}px;
  
`;

export const PhotoButton = styled(RectButton)`
    height: ${RFValue(40)}px;
    width: ${RFValue(40)}px;

    justify-content: center;
    align-items: center;
    
    background-color: ${({ theme }) => theme.colors.main};

    position: absolute;

    bottom: ${RFValue(10)}px;
    right: ${RFValue(10)}px;

    border-radius: ${RFValue(20)}px;
  
`;

export const Content = styled.View`
    padding: 0 ${RFValue(24)}px;
    margin: ${RFValue(60)}px 0 0;
`;

export const Options = styled.View`
    border-bottom-width: ${RFValue(1)}px;
    border-bottom-color: ${({ theme }) => theme.colors.line};

    flex-direction: row;
    
    align-items: center;
    justify-content: space-around;

    margin: 0 0 ${RFValue(32)}px;

`;

export const Option = styled(TouchableOpacity).attrs({
    activeOpacity: 0.7,
})<OptionProps>`
    padding: 0 0 ${RFValue(14)}px;

    ${({active}) => 
        active && css`

        border-bottom-width: ${RFValue(3)}px;
        border-bottom-color: ${({ theme }) => theme.colors.main};
    `}
`;

export const OptionTitle = styled.Text<OptionProps>`
font-size: ${RFValue(20)}px;
font-family: ${({ theme, active }) => active ? theme.fonts.secundary_600 :  theme.fonts.secundary_500};

color: ${({ theme, active }) => active ? theme.colors.header : theme.colors.text_detail};

`;

export const Section = styled.View.attrs({
    
})`
   
`;