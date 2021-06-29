import React from 'react';
import { Alert, StatusBar, Text } from 'react-native';
import { format } from 'date-fns';
import { useTheme } from 'styled-components';

import {
  Container,
  Header,
  Title,
  RentalPeriod,
  Content,
  DateInfo,
  DateTitle,
  DateValue,
  DateTextValue,
  Footer
} from './styles';

import BackButton from '../../components/BackButton';

import ArrowLeftPicture from '../../assets/images/arrow.svg';
import { Button } from '../../components/Button';
import { Calendar, DayProps, MarkedDateProps, generateInterval } from '../../components/Calendar';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useState } from 'react';

import { getPlataformDate } from '../../utils/getPlataformDate';
import { CarDTO } from '../../dto/ICarDTO';
import { useEffect } from 'react';
import { api } from '../../services/api';


interface RentalPeriod {
  startFormatted: string;
  endFormatted: string;
}
interface RouteParamsProps {
  car: CarDTO
}

interface UnavailableDaysProps{
  unavailable_dates: string[]; 
}

export const Scheduling: React.FC = () => {

  const { params } = useRoute();
  const { car } = params as RouteParamsProps;

  const { navigate, goBack } = useNavigation();

  const theme = useTheme();

  const [lastSelectedDate, setLastSelectedDate] = useState<DayProps>({} as DayProps);
  const [markedDates, setMarkedDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [scheduledDates, setScheduledDates] = useState<MarkedDateProps>({} as MarkedDateProps);
  const [rentalPeriod, setRentalPeriod] = useState<RentalPeriod>({} as RentalPeriod);

  function handleConfirmRental() {
    if (!rentalPeriod.startFormatted || !rentalPeriod.endFormatted) {
      Alert.alert('Selecione o intervalo desejado para alugar.')
    }
    else {
      navigate('SchedulingDetails', {
        car,
        dates: Object.keys(markedDates)
      })
    }
  }

  function handleChangeDate(date: DayProps) {
    let start = !lastSelectedDate.timestamp ? date : lastSelectedDate;
    let end = date;

    if (start.timestamp > end.timestamp) {
      start = end;
      end = start;
    }
    setLastSelectedDate(end);
    const interval = generateInterval(start, end);
    setMarkedDates(interval);
    setRentalPeriod(
      {
        startFormatted: format(getPlataformDate(new Date(start.timestamp)), 'dd/MM/yyyy'),
        endFormatted: format(getPlataformDate(new Date(end.timestamp)), 'dd/MM/yyyy'),
      }
    );
  }

 
  function handleBack() {
    goBack(); 
  }

  useEffect(() => {

    (async () => {
      const { data } = await api.get(`/schedules_bycars/${car.id}`)
      const { unavailable_dates } = data  as UnavailableDaysProps;
      const days = Object.keys(unavailable_dates).map(key => unavailable_dates[Number(key)]); 
      //console.log(days)


      let interval: MarkedDateProps = {};
      days.forEach( (item) => 
        {
        interval = {
          ...interval,
        [item]: {
          color: theme.colors.background_secundary, 
          textColor: theme.colors.text_detail,
          disabled: true,
          disableTouchEvent: true
      }
    }

    });

    setScheduledDates(interval); 

    }
    )();

  }, []);

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

        <RentalPeriod>
          <DateInfo>
            <DateTitle>DE</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              <DateTextValue>
                {rentalPeriod.startFormatted}
              </DateTextValue>
            </DateValue>
          </DateInfo>

          <ArrowLeftPicture />

          <DateInfo>
            <DateTitle>ATÉ</DateTitle>
            <DateValue selected={!!rentalPeriod.endFormatted}>
              <DateTextValue >
                {rentalPeriod.endFormatted}
              </DateTextValue>
            </DateValue>
          </DateInfo>
        </RentalPeriod>
      </Header>

      <Content>
        <Calendar
          markedDates={markedDates}
          schedulesDates={scheduledDates}
          onDayPress={handleChangeDate}
        />
      </Content>

      <Footer>
        <Button title="Confirmar" onPress={() => handleConfirmRental()} enabled={!!rentalPeriod.endFormatted} />
      </Footer>

    </Container>
  );
}
