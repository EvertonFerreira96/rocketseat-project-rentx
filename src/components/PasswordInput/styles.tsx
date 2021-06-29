import { TextInput } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import { RFValue } from 'react-native-responsive-fontsize';
import styled, { css } from 'styled-components/native';

interface Props {
  isFocused: boolean;
}

export const Container = styled.View`
  width: 100%;
  flex-direction: row;
  margin:0 0 ${RFValue(8)}px;

`;

export const IconContainer = styled.View<Props>`
height: ${RFValue(56)}px;
width: ${RFValue(56)}px;
margin: 0  ${RFValue(2)}px 0 0;
justify-content: center;
align-items: center;
background-color: ${({theme}) => theme.colors.background_secundary};
  ${({isFocused, theme}) => isFocused ? css`
  border-bottom-width: ${RFValue(2)}px; 
  border-bottom-color: ${theme.colors.main}; 
  `
  :
  css`
  border-bottom-width: ${RFValue(2)}px; 
  border-bottom-color: ${theme.colors.background_secundary}; 
  `
  }
`;

export const InputText = styled(TextInput)<Props>`
flex: 1; 

font-size: ${RFValue(16)}px;
font-family: ${({theme}) => theme.fonts.primary_400};
padding: 0 ${RFValue(23)}px;

color: ${({theme}) => theme.colors.text};
background-color: ${({theme}) => theme.colors.background_secundary};
  ${({isFocused, theme}) => isFocused ? css`
  border-bottom-width: ${RFValue(2)}px; 
  border-bottom-color: ${theme.colors.main}; 
  `
  :
  css`
  border-bottom-width: ${RFValue(2)}px; 
  border-bottom-color: ${theme.colors.background_secundary}; 
  `
  }
`;

export const ChangeTextVisibilityButton = styled.View<Props>`
height: ${RFValue(56)}px;
width: ${RFValue(56)}px;
justify-content: center;
align-items: center;
background-color: ${({theme}) => theme.colors.background_secundary};

${({isFocused, theme}) => isFocused ? css`
  border-bottom-width: ${RFValue(2)}px; 
  border-bottom-color: ${theme.colors.main}; 
  `
  :
  css`
  border-bottom-width: ${RFValue(2)}px; 
  border-bottom-color: ${theme.colors.background_secundary}; 
  `
  }
`; 