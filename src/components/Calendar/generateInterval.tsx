import {eachDayOfInterval, format} from 'date-fns'

import { MarkedDateProps, DayProps } from '.';
import themes from '../../styles/themes';

import { getPlataformDate } from '../../utils/getPlataformDate';
export function generateInterval(start: DayProps, end: DayProps){
    const theme = themes.Light;
    let interval: MarkedDateProps = {};

    eachDayOfInterval({ start: new Date(start.timestamp), end: new Date(end.timestamp) }).forEach( (item) => {
        const date = format(getPlataformDate(item), 'yyyy-MM-dd');

        interval = {
            ...interval,
            [date]: {
                color: date === start.dateString || date === end.dateString ? theme.colors.main : theme.colors.main_light, 
                textColor: date === start.dateString || date === end.dateString ? theme.colors.main_light : theme.colors.main,
            }
        }

    });

    return interval; 
}