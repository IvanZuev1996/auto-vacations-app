import dayjs from 'dayjs';

import { getNormalizeDate } from './getNormalizeDate';

interface GetDaysByMonthProps {
    year: number;
    month: number;
}

export const getDaysByMonth = ({ month, year }: GetDaysByMonthProps) =>
    dayjs(getNormalizeDate(year, month)).daysInMonth();
