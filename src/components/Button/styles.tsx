import { TextProps } from 'react-native';
import { RectButton, RectButtonProps } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface ContainerProps {
    color?: string; 
}


interface TextButtonProps extends TextProps {
    light?: boolean;
}

export const Container = styled(RectButton)<ContainerProps>`
    width: 100%; 

    padding: ${RFValue(18)}px;
    align-items: center;
    justify-content: center;

    background-color: ${({theme, color}) => color ? color : theme.colors.main};
    border-radius: ${RFValue(8)}px;
    margin: 0 0 ${RFValue(8)}px;
`;
 
export const Title = styled.Text<TextButtonProps>`
    font-family: ${({theme}) => theme.fonts.primary_500};
    font-size: ${RFValue(15)}px;
    color: ${({theme, light}) => light ? theme.colors.header :  theme.colors.background_secundary};
`; 