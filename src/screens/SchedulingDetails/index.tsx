import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';

import { useNavigation, useRoute } from '@react-navigation/native';

import { Accessory } from '../../components/Accessory';
import { Button } from '../../components/Button';

import BackButton from '../../components/BackButton';
import ImageSlider from '../../components/ImageSlider';
import { 
  Container, 
  Header,
  CarImages,
  Content,
  Details,
  Description,
  Brand,
  Name,
  Rent,
  Period,
  Price,
  About,
  Accesories,
  Footer,
  RentalPeriod,
  CalendarIcon,
  DateInfo,
  DateTitle,
  DateValue,
  RentalPrice,
  RentalPriceLabel,
  RentalPriceQuota,
  RentalPriceTotal,
  RentalPriceDetails

 } 
  from './styles';
import { RFValue } from 'react-native-responsive-fontsize';
import { useTheme } from 'styled-components';
import { CarDTO } from '../../dto/ICarDTO';
import { getCarAccessoryIcon } from '../../utils/getCarAccessoryIcon';
import { format } from 'date-fns';
import { getPlataformDate } from '../../utils/getPlataformDate';
import { api } from '../../services/api';
import { Alert } from 'react-native';

interface RouteParamsProps {
  car: CarDTO
  dates: string[]
}


interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}


export const SchedulingDetails: React.FC = () => {
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod); 

  const [loading, setLoading] = useState(false); 
  const { params } = useRoute();
  const { car, dates } = params as RouteParamsProps;

  const rentDays =  dates.length; 
  const rentTotal = Number(rentDays * car.rent.price)

  const { navigate, goBack } = useNavigation();
  const theme = useTheme(); 

  async function handleConfirmRental(){
    const title = `Carro alugado!`;
    const subTitle = `
    Agora você só precisa ir {'\n'}
    até a concessionária da RENTX {'\n'}
    pegar seu automóvel`; 
    const nextScreenRoute = `Home`; 
    setLoading(true);
    const { data } = await api.get(`/schedules_bycars/${car.id}`); 


    await api.post(`/schedules_byuser/`, 
    {
      user_id: 1,
      car,        
      startDate: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'), 
      endDate: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'), 
      
    },
    ); 


console.log(Object.keys(data.unavailable_dates).map(key => data.unavailable_dates[Number(key)]))
    api.put(`/schedules_bycars/${car.id}`, {
      id: car.id, 
      unavailable_dates: {
        ...Object.keys(data.unavailable_dates).map(key => data.unavailable_dates[Number(key)]), 
        ...Object.keys(dates).map(key => dates[Number(key)]),
      }

    }).then(response => { setLoading(true); navigate('Confirm', { title, subTitle, nextScreenRoute }); })
      .catch(() => Alert.alert('Não foi possível agendar o automóvel'))
      .finally(() => setLoading(false)) 

  }

  function handleBack() {
    goBack();
  }


  useEffect(() => {
    setRentalPeriod( 
      {
        startFormatted: format(getPlataformDate(new Date(dates[0])), 'dd/MM/yyyy'), 
        endFormatted: format(getPlataformDate(new Date(dates[dates.length - 1])), 'dd/MM/yyyy'), 
      }
      )
  },[])
  return (
    <Container>
        <Header>
          <BackButton onPress={() => handleBack()} />
        </Header>
        <CarImages>
         <ImageSlider imagesUrl={car.photos }  /> 
        </CarImages>
        <Content >
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.rent.period}</Period>
              <Price>{`R$ ${car.rent.price}`}</Price>
            </Rent>
          </Details>
          <Accesories>
            {
              car.accessories.map(item => {
                <Accessory key={item.type} name={item.name} icon={getCarAccessoryIcon(item.type)}  />
              })              
            }
          </Accesories>
        <RentalPeriod>
          <CalendarIcon>
          <Feather 
            name="calendar"
            size={ RFValue(24) }
            color={theme.colors.shape}
            />  
          </CalendarIcon>

          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue>{rentalPeriod.startFormatted}</DateValue>
          </DateInfo>

          <Feather 
            name="chevron-right"
            size={ RFValue(18) }
            color={theme.colors.shape}
            />  

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue>{rentalPeriod.endFormatted}</DateValue>
          </DateInfo>
        </RentalPeriod>
        <RentalPrice>
          <RentalPriceLabel>TOTAL</RentalPriceLabel>
            <RentalPriceDetails>
            <RentalPriceQuota>{`R$ ${car.rent.price} ${rentDays}x diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{`R$ ${rentTotal}`} </RentalPriceTotal>
            </RentalPriceDetails>
        </RentalPrice>
        </Content>
        <Footer>
          <Button title="Alugar agora" color={theme.colors.success} onPress={() => handleConfirmRental()} loading={loading} enabled={!loading}  />
        </Footer>
    </Container>
  );
}
