import dayjs from 'dayjs';

export const getDatesDiff = (start?: string, end?: string) =>
    dayjs(end).diff(dayjs(start), 'day') + 1;
