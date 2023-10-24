import dayjs from 'dayjs';

import { shortMonthsArray } from '@/shared/consts/dates';

export const getShortsDates = (startDate: string, endDate: string) => {
    const start = dayjs(startDate);
    const end = dayjs(endDate);

    const startMonth = shortMonthsArray[start.month()];
    const endMonth = shortMonthsArray[end.month()];
    const startDay = start.date();
    const endDay = end.date();

    return `c ${startDay} ${startMonth} по ${endDay} ${endMonth}`;
};
