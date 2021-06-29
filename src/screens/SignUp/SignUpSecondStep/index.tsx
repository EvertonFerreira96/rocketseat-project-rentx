import React from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import BackButton from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet';
import PasswordInput from '../../../components/PasswordInput';
import {Button} from '../../../components/Button';
import 
  {
     Container
   , Header
   , Steps
   , Title
   , SubTitle 
   , Form
   , FormTitle
     } from './styles';

import { useTheme } from 'styled-components';
import { useState } from 'react';
import { api } from '../../../services/api';

interface Params {
  user: {
  name: string;
  email: string;
  driverLicense: string;
}
}

export const SignUpSecondStep: React.FC = () => {
  const theme = useTheme();
  const route  = useRoute();
  const {navigate} = useNavigation();
  const { user } = route.params as Params

  const [password, setPassword] = useState('');
  const [passwordConfirm, setPasswordConfirm] = useState('');

  async function handleBack() {
    navigate('SignUpFirstStep');
  }

  async function handleRegisterNewAccount() {

    const title = `Conta criada!`;
    const subTitle = `Agora é só fazer ${'\n'}e aproveitar`; 
    const nextScreenRoute = `SignIn`; 

    if(!password || !passwordConfirm)
      return Alert.alert('Informe a senha e sua confirmação!');

    if(password  != passwordConfirm)
      return Alert.alert('As senhas não coincidem!');

        await api.post('/users', {
          name: user.name,
          email: user.email, 
          driver_license: user.driverLicense,  
          password
        })
        .then( () => {
          navigate('Confirm', { title, subTitle, nextScreenRoute }); 
        })
        .catch( () => {
          Alert.alert('Error','Não foi possível cadastrar');
        });
        

  
  }


  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>
      <Container>
          <Header>
            <BackButton onPress={() => handleBack()} /> 
            <Steps>
              <Bullet active={false}/>
              <Bullet active/>
            </Steps>
          </Header>
        <Title>
          Crie sua{`\n`}
          conta 
        </Title>
        <SubTitle>
          Faça seu cadastro de {`\n`}
          forma rápida e fácil.
        </SubTitle>

        <Form>
          <FormTitle>2. Senha</FormTitle>
          <PasswordInput value={password} onChangeText={t => setPassword(t)} iconName="lock" placeholder="Senha" /> 
          <PasswordInput value={passwordConfirm} onChangeText={t => setPasswordConfirm(t)}  iconName="lock" placeholder="Confirmar Senha" />
        </Form>
          <Button title="Cadastrar" color={theme.colors.success} onPress={() => handleRegisterNewAccount()} /> 
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
