import { RFValue } from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

interface BulletProps { 
    active: boolean; 
}

export const Container = styled.View<BulletProps>`
     height:${RFValue(6)}px;
     width:${RFValue(6)}px;
     
     background-color: ${({theme, active}) => active ?  theme.colors.title :  theme.colors.shape}; 
     
     border-radius: ${RFValue(3)}px;

     margin-left: ${RFValue(8)}px;

`;