import React from 'react';

import { Feather } from '@expo/vector-icons';

import { Calendar as RNCalendar, DateCallbackHandler, LocaleConfig } from 'react-native-calendars';

import { generateInterval } from './generateInterval';

import { useTheme } from 'styled-components';
import { ptBrLocale } from './localeConfig';
import { useEffect } from 'react';

LocaleConfig.locales['pt-BR'] = ptBrLocale; 

LocaleConfig.defaultLocale = 'pt-BR'; 

export { generateInterval };  

export interface MarkedDateProps {
  [date: string] : {
  color: string;
  textColor: string;
  disabled?: boolean;
  disableTouchEvent?: boolean
  }
}

export interface DayProps {
  dateString: string;
  day: number;
  month: number;
  year: number;
  timestamp: number
}

interface CalendarProps {
  markedDates: MarkedDateProps;
  schedulesDates?: MarkedDateProps;
  onDayPress: DateCallbackHandler;
}


export const Calendar: React.FC<CalendarProps> = ({ markedDates, schedulesDates, onDayPress }) => {
  const theme = useTheme(); 
  return (
      <RNCalendar 
        renderArrow={
          ( direction ) => 
            <Feather 
              name={`chevron-${direction}`}
              color={theme.colors.text}
              size={24}
            /> 
          }
        headerStyle={{
          backgroundColor: theme.colors.background_secundary,
          borderBottomWidth: 0.5,
          borderBottomColor: theme.colors.text_detail,
          paddingBottom: 10,
          marginBottom: 10
        }}

        theme={{
          textDayFontFamily: theme.fonts.primary_400,
          textDayHeaderFontFamily: theme.fonts.primary_500,
          textDayHeaderFontSize: 10, 
          textMonthFontSize: 20,
          textMonthFontFamily: theme.fonts.secundary_600,
          monthTextColor: theme.colors.title,
          arrowStyle: {
            marginHorizontal: -15
          }
        }}

        firstDay={1}
        minDate={new Date()}
        markingType="period"
        markedDates={{...markedDates, ...schedulesDates} }

        onDayPress={onDayPress}
      />
  )
}
