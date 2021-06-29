
import React, { useState }  from 'react';
import { Alert, Keyboard, KeyboardAvoidingView, TouchableWithoutFeedback } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Yup from 'yup'; 
import BackButton from '../../../components/BackButton'
import { Bullet } from '../../../components/Bullet';
import Input from '../../../components/Input';
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

export const SignUpFirstStep: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [driverLicense, setDriverLicense] = useState('');
  const {navigate} = useNavigation();

  function handleBack() {
    navigate('SignIn');
  }

  async function handleNextStep() {
    try {
      const schema = Yup.object().shape({
        driverLicense: Yup.string().required('CNH é obrigatória'),
        email: Yup.string().required('E-mail é obrigatório').email('E-mail inválido'),
        name: Yup.string().required('Nome é obrigatório'),

      });

      const collection = { name, email, driverLicense }
      await schema.validate(collection);
      navigate('SignUpSecondStep', { 
        user: collection
      });

    } catch (error) {
      if(error instanceof Yup.ValidationError){
        Alert.alert(error.message);
      }
      
    }
  }

  return (
    <KeyboardAvoidingView behavior="position" enabled>
      <TouchableWithoutFeedback onPress={ Keyboard.dismiss }>

      <Container>
          <Header>
            <BackButton onPress={() => handleBack()} /> 
            <Steps>
              <Bullet active/>
              <Bullet active={false}/>
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
          <FormTitle>1. Dados</FormTitle>
          <Input value={name} onChangeText={t => setName(t)} iconName="user" placeholder="Nome" /> 
          <Input value={email} onChangeText={t => setEmail(t)} iconName="mail" placeholder="E-mail" keyboardType="email-address"  autoCapitalize="none" autoCorrect={false} />
          <Input value={driverLicense} onChangeText={t => setDriverLicense(t)} iconName="credit-card" placeholder="CNH" keyboardType="numeric" />
        </Form>
          <Button title="Próximo" onPress={() => handleNextStep()} /> 
      </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}
