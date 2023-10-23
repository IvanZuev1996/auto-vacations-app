import dayjs from 'dayjs';

import { docMonths } from '@/shared/consts/dates';

export const formatCurrentDate = (currentDate: dayjs.Dayjs) => {
    const year = currentDate.year();
    const month = currentDate.month() + 1;
    const date = currentDate.date();

    return `${date} ${docMonths[month]} ${year}г.`;
};
