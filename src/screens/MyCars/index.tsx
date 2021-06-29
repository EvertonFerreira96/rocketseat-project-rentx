import { useNavigation } from '@react-navigation/native';
import React, { useState, useEffect }  from 'react';
import { api } from '../../services/api';
import { StatusBar, FlatList } from 'react-native';
import { useTheme } from 'styled-components';
import { AntDesign } from '@expo/vector-icons';
import BackButton from '../../components/BackButton';
import { Car } from '../../components/Car';
import { CarDTO } from '../../dto/ICarDTO';

import {
  Container,
  Header,
  Title,
  SubTitle,
  Content,
  Appointments,
  AppointmentsTitle,
  AppointmentsQuantity,
  CarWrapper,
  CarFooter,
  CarFooterTitle,
  CarFooterDate,
  CarFooterPeriod,
} from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { LoadingAnimtaed } from '../../components/LoadingAnimtaed';

interface CarProps {
  id: string;
  user_id: string; 
  car: CarDTO;
  startDate: string;
  endDate: string;
}

export const MyCars: React.FC = () => {

  const [cars, setCars] = useState<CarProps[]>([]); 
  const [loading, setLoading] = useState(true); 
  const theme = useTheme(); 
  const { navigate, goBack } = useNavigation();

 
  function handleBack() {
    goBack(); 
  }


  useEffect(() => {
    ( async () => {
        try {
          const { data } = await api.get(`/schedules_byuser?user_id=1`);
          setCars(data);
        } catch (error) {
          console.log(error); 
        }
        finally{
          setLoading(false);
        }
    })()
  },[]); 
  
  return (
      <Container>
        <Header>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="transparent"
        />
        <BackButton color={theme.colors.shape} onPress={() => handleBack()} />
        <Title>
          Escolha uma {'\n'}
          data de início e {'\n'}
          fim do aluguel
        </Title>

        <SubTitle>
          Conforto, segurança e praticidade. 
        </SubTitle>
      </Header>

{
  loading ? 
    <LoadingAnimtaed />
    :
        <Content>
          <Appointments>
            <AppointmentsTitle> Agendamentos feitos </AppointmentsTitle>
            <AppointmentsQuantity> {cars.length} </AppointmentsQuantity>
          </Appointments>

        <FlatList 
          data={cars}
          keyExtractor={item => String(item.id) }
          showsVerticalScrollIndicator={false}
          renderItem={({item}) => (
            <CarWrapper>
            <Car collection={item.car}  />
            <CarFooter>
              <CarFooterTitle>Período</CarFooterTitle>
              <CarFooterPeriod>
                <CarFooterDate>{item.startDate}</CarFooterDate>
                 <AntDesign name="arrowright" size={RFValue(16)} color={theme.colors.title} style={{ marginHorizontal: RFValue(10) }} />
                <CarFooterDate>{item.endDate}</CarFooterDate>
              </CarFooterPeriod>
            </CarFooter>
          </CarWrapper>

)}
/>

</Content>
}
        
      </Container>

  );
}
