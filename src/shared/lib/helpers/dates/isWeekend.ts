import dayjs from 'dayjs';

import { daysOfWeek } from '@/shared/consts/dates';

interface isWeekendProps {
    year: number;
    month: number;
    day: number;
}

const getDayOfWeek = (props: isWeekendProps) => {
    const { year, month, day } = props;

    return dayjs(`${year}-${month}-${day}`).day();
};

export const isWeekend = (props: isWeekendProps) =>
    !daysOfWeek[getDayOfWeek(props)];
