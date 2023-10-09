import dayjs from 'dayjs';

interface GetDaysByMonthProps {
    year: number;
    month: number;
}

const normalizeDate = (year: number, month: number) => `${year}-${month}`;

export const getDaysByMonth = ({ month, year }: GetDaysByMonthProps) =>
    dayjs(normalizeDate(year, month)).daysInMonth();
