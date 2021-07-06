import React from 'react';
import { Feather } from '@expo/vector-icons';

import { Container, InputText, IconContainer, ChangeTextVisibilityButton } from './styles';
import { useTheme } from 'styled-components';
import { TextInputProps } from 'react-native';
import { useState } from 'react';
import { BorderlessButton } from 'react-native-gesture-handler';

interface InputProps extends TextInputProps{
    iconName: React.ComponentProps<typeof Feather>['name'];
    value?: string; 
}

const Input: React.FC<InputProps> = ({ iconName,value,  ...rest }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isFilled, setIsFilled] = useState(false);
    const theme = useTheme();
    const [passwordVisibility, setPasswordVisibility] = useState(true); 

    function handleInputFocused() {
      setIsFocused(true)
    } 
    function handleInputBlur() {
      setIsFocused(false) 
      setIsFilled(!!value); 
    } 
  return (
      <Container>
          <IconContainer isFocused={isFocused}>
            <Feather name={iconName} size={24} color={ isFocused || isFilled ? theme.colors.main : theme.colors.text_detail} />
          </IconContainer>
          <InputText isFocused={isFocused} secureTextEntry={passwordVisibility} onFocus={handleInputFocused} onBlur={handleInputBlur} {...rest} />
          <ChangeTextVisibilityButton isFocused={isFocused} >
            <BorderlessButton  onPress={() => setPasswordVisibility(previous => !previous)}>
              <Feather  name={ passwordVisibility ? "eye" :  "eye-off"} size={20} color={theme.colors.text} /> 
            </BorderlessButton>
          </ChangeTextVisibilityButton>
      </Container>
  )
}

export default Input;