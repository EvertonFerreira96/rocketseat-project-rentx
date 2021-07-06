import { useFocusEffect, useNavigation } from '@react-navigation/native';
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
import { LoadingAnimated } from '../../components/LoadingAnimated';
import { Car as ModelCar } from '../../database/models/Car'; 
import { format } from 'date-fns/esm';
import { parseISO } from 'date-fns';
interface CarProps {
  id: string;
  user_id: string; 
  car: CarDTO;
  startDate: string;
  endDate: string;
}

interface DataProps {
  id: string; 
  car: ModelCar;
  start_date: string;
  end_date: string;
}

export const MyCars: React.FC = () => {

  const [cars, setCars] = useState<DataProps[]>([]); 
  const [loading, setLoading] = useState(true); 
  const theme = useTheme(); 
  const { navigate, goBack } = useNavigation();

 
  function handleBack() {
    goBack(); 
  }


  useFocusEffect(() => {
    ( async () => {
        try {
          const { data } = await api.get(`/rentals`);
          setCars(data);
        } catch (error) {
          console.log(error); 
        }
        finally{
          setLoading(false);
        }
    })()
  }); 
  
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
    <LoadingAnimated />
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
                <CarFooterDate>{ format(parseISO(item.start_date),'dd/mm/yyyy') }</CarFooterDate>
                 <AntDesign name="arrowright" size={RFValue(16)} color={theme.colors.title} style={{ marginHorizontal: RFValue(10) }} />
                <CarFooterDate>{format(parseISO(item.end_date),'dd/mm/yyyy')}</CarFooterDate>
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
