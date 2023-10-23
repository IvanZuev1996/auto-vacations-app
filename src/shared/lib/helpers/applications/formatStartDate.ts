import dayjs from 'dayjs';

import { docMonths } from '@/shared/consts/dates';

export const formatStartDate = (startDate?: string) => {
    const start = dayjs(startDate);

    const year = start.year();
    const month = start.month() + 1;
    const date = start.date();

    return `${date} ${docMonths[month]} ${year} года`;
};
