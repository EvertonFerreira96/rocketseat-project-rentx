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
  RentalPriceDetails,
  OfflineInfo

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
import { useNetInfo } from '@react-native-community/netinfo';

interface RouteParamsProps {
  car: CarDTO
  dates: string[]
}


interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}


export const SchedulingDetails: React.FC = () => {
  const { isConnected } = useNetInfo(); 

  const [carUpdated, setCarUpdated] = useState<CarDTO>({} as CarDTO ); 
  
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod); 

  const [loading, setLoading] = useState(false); 
  const { params } = useRoute();
  const { car, dates } = params as RouteParamsProps;

  const rentDays =  dates.length; 
  const rentTotal = Number(rentDays * car.price)

  const { navigate, goBack } = useNavigation();
  const theme = useTheme(); 

  async function handleConfirmRental(){
    setLoading(true);

    const title = `Carro alugado!`;
    const subTitle = `
    Agora você só precisa ir {'\n'}
    até a concessionária da RENTX {'\n'}
    pegar seu automóvel`; 
    const nextScreenRoute = `Home`; 
    


    await api.post(`rentals`, 
    {
      user_id: 1,
      car_id: car.id, 
      start_date:new Date(dates[0]), 
      end_date:new Date(dates[dates.length - 1]), 
      total: rentTotal
    })
    .then(() => { 
      setLoading(true); 
      navigate('Confirm', { title, subTitle, nextScreenRoute }); 
    })
    .catch((e) => Alert.alert(e))
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



  useEffect(() => {
    
    let isMounted = true; 
    if(isConnected === true && isMounted)
    {
      (async () => {
        try {
          const { data } = await api.get(`/cars/${car.id}`); 
          setCarUpdated(data); 
        } catch (error) {
          
        }
      })()
    }
    return () => { isMounted = false }; 
    },[isConnected]);

  return (
    <Container>
        <Header>
          <BackButton onPress={() => handleBack()} />
        </Header>
        <CarImages>
        <ImageSlider imagesUrl={ !!carUpdated.photos ? carUpdated.photos : [{ id: car.thumbnail, photo: car.thumbnail }] } />
 
        </CarImages>
        <Content >
          <Details>
            <Description>
              <Brand>{car.brand}</Brand>
              <Name>{car.name}</Name>
            </Description>

            <Rent>
              <Period>{car.period}</Period>
              <Price>{`R$ ${car.price}`}</Price>
            </Rent>
          </Details>
              {
      carUpdated.accessories &&
      <Accesories>
        {carUpdated.accessories.map((item) => <Accessory key={item.type} name={item.name} icon={getCarAccessoryIcon(item.type)} />)}
      </Accesories>
      }
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
            <RentalPriceQuota>{`R$ ${car.price} ${rentDays}x diárias`}</RentalPriceQuota>
            <RentalPriceTotal>{`R$ ${rentTotal}`} </RentalPriceTotal>
            </RentalPriceDetails>
        </RentalPrice>
        </Content>
        <Footer>
          <Button title="Alugar agora" color={theme.colors.success} onPress={() => handleConfirmRental()} enabled={!!isConnected} loading={!isConnected}  />
           { !isConnected && <OfflineInfo> Conecte-se a internet para visualizar {`\n`} mais detalhes e agendar seu veículo.  </OfflineInfo>  }

        </Footer>
    </Container>
  );
}

