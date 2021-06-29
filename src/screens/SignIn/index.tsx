import React, { useState } from 'react';
import { Keyboard, ScrollView, StatusBar, TouchableWithoutFeedback, View } from 'react-native';
import * as Yup from 'yup';
import { useTheme } from 'styled-components';
import { Button } from '../../components/Button';
import Input from '../../components/Input';
import PasswordInput from '../../components/PasswordInput';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Form,
  Footer

} from './styles';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../../hook/auth';

export const SignIn: React.FC = () => {
  const { signIn } = useAuth();
  const theme = useTheme();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { navigate } = useNavigation();

  async function handleSignIn() {
    try {
      const schema = Yup.object().shape({
        email: Yup.string().required('E-mail obrigatório').email('Digite um e-mail válido'),
        password: Yup.string().required('Senha obrigatória'),
      })
      await schema.validate({ email, password });
      await signIn({email, password}); 
    }
    catch (e) {
      if (e instanceof Yup.ValidationError) {

      }
    }

  }

  function handleRegisterNewAccount() {
    navigate('SignUpFirstStep');

  }

  return (

    <TouchableWithoutFeedback onPress={Keyboard.dismiss} >
      <Container enabled behavior="position" >

        <StatusBar barStyle="dark-content" backgroundColor="transparent" translucent />
        <Header>
          <Title>
            Estamos {`\n`}
            quase lá.
          </Title>
          <SubTitle>
            Faça seu login para começar {`\n`}
            uma experiência incrível.
          </SubTitle>
        </Header>
        <Form>
          <Input iconName="mail" placeholder="E-mail" keyboardType="email-address" autoCapitalize="none" autoCorrect={false} value={email} onChangeText={t => setEmail(t)} />
          <PasswordInput iconName="lock" placeholder="Senha" value={password} onChangeText={t => setPassword(t)} />
        </Form>
        <Footer>
          <Button title="Login" enabled={true} loading={false} onPress={() => handleSignIn()} />
          <Button title="Criar conta gratuita" loading={false} light color={theme.colors.background_secundary} onPress={() => handleRegisterNewAccount()} />
        </Footer>
      </Container>
    </TouchableWithoutFeedback>
  );
}
