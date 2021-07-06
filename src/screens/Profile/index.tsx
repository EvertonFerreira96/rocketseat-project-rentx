import React from 'react';

import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  Linking,
  TouchableWithoutFeedback
} from 'react-native';

import * as Yup from 'yup';

import { useNavigation } from '@react-navigation/native';

import * as ImagePicker from 'expo-image-picker';

import { Feather } from '@expo/vector-icons';

import { useTheme } from 'styled-components';

import BackButton from '../../components/BackButton';

import Input from '../../components/Input';

import {
  Container,
  Header,
  HeaderTop,
  HeaderTitle,
  LogoutButton,
  PhotoContainer,
  Photo,
  PhotoButton,
  Content,
  Options,
  Option,
  OptionTitle,
  Section
} from './styles';
import { useState } from 'react';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import PasswordInput from '../../components/PasswordInput';
import { useAuth } from '../../hook/auth';
import { Button } from '../../components/Button';
import { useNetInfo } from '@react-native-community/netinfo';

const Profile: React.FC = () => {
  const { isConnected } = useNetInfo();
  const { user, signOut, updateUser } = useAuth();

  const theme = useTheme();
  const { goBack } = useNavigation();

  const [option, setOption] = useState<'dataEdit' | 'passwordEdit'>('dataEdit');

  const [avatar, setAvatar] = useState(user.avatar);
  const [name, setName] = useState(user.name);
  const [driverLicense, setDriverLicense] = useState(user.driver_license);

  function handleBack() {
    goBack();
  }

  function handleSignOut() {
    
    Alert.alert(
      'Lembre-se',
      'Só será possível conectar-se a aplicação, caso possua internet',
      [
        {
          text: 'Cancelar',
          onPress: () => {}
        },
        {
          text: 'Sair',
          onPress: () => signOut()
        }
      ])
  }

  async function handleProfileUpdate() {
    try {

      const schema =
        Yup
          .object()
          .shape({
            name: Yup.string().required('Nome é obrigatório'),
            driverLicense: Yup.string().required('CNH é obrigatório')
          });

      await schema.validate({ name, driverLicense });;

      await updateUser({
        id: user.id,
        user_id: user.user_id,
        email: user.email,
        name, 
        driver_license: driverLicense,
        avatar,
        token: user.token
      });

    } catch (e) {
      if(e instanceof Yup.ValidationError)
        Alert.alert(e.message)
      else 
        throw new Error(e);
    }
  }

  function handleChangeOption(option: 'dataEdit' | 'passwordEdit') {
    if((!!isConnected && option === "passwordEdit") || option === "dataEdit"){
      setOption(option);
    }
  }

  async function handleSelectAvatar() {

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 4],
      quality: 1
    });
    if (result.cancelled)
      return;

    if (result.uri) {
      setAvatar(result.uri);
    }

  }

  return (
    <KeyboardAvoidingView enabled behavior="position" >
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <Container>
          <Header>
            <HeaderTop>
              <BackButton onPress={() => handleBack()} color={theme.colors.shape} />

              <HeaderTitle>Editar Perfil</HeaderTitle>

              <LogoutButton onPress={() => handleSignOut()}>
                <Feather name="power" size={24} color={theme.colors.shape} />
              </LogoutButton>

            </HeaderTop>

            <PhotoContainer>
              {!!avatar && <Photo source={{ uri: avatar }} />}
              <PhotoButton onPress={() => handleSelectAvatar()}>
                <Feather name="camera" size={24} color={theme.colors.shape} />
              </PhotoButton>
            </PhotoContainer>
          </Header>

          <Content style={{ marginBottom: useBottomTabBarHeight() }}>

            <Options>
              <Option active={option === "dataEdit"} onPress={() => handleChangeOption("dataEdit")} >
                <OptionTitle active={option === "dataEdit"}> Dados </OptionTitle>
              </Option>
              <Option active={option === "passwordEdit"} onPress={() => handleChangeOption("passwordEdit")} >
                <OptionTitle active={option === "passwordEdit"} > Trocar Senha </OptionTitle>
              </Option>
            </Options>

            {
              option === "dataEdit"
                ?
                <Section>
                  <Input
                    iconName="user"
                    placeholder="Nome"
                    autoCorrect={false}
                    defaultValue={name}
                    onChangeText={(e) => setName(e)}
                  />
                  <Input
                    iconName="mail"
                    editable={false}
                    autoCorrect={false}
                    defaultValue={user.email}
                  />
                  <Input
                    iconName="credit-card"
                    placeholder="CNH"
                    keyboardType="numeric"
                    defaultValue={driverLicense}
                    onChangeText={(e) => setDriverLicense(e)}
                  />
                </Section>
                :
                <Section>
                  <PasswordInput
                    iconName="lock"
                    placeholder="Senha atual"
                    autoCorrect={false}
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Nova senha"
                    autoCorrect={false}
                  />
                  <PasswordInput
                    iconName="lock"
                    placeholder="Repetir senha"
                    autoCorrect={false}
                  />
                </Section>
            }

            <Button onPress={handleProfileUpdate} title="Salvar atualizações" />

          </Content>
        </Container>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export { Profile };