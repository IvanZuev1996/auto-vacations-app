import dayjs from 'dayjs';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';

dayjs.extend(isSameOrBefore);

interface GetWeekendCountProps {
    startDate: string;
    endDate: string;
}

export const getWeekendCount = ({
    endDate,
    startDate
}: GetWeekendCountProps) => {
    let currentDate = dayjs(startDate);
    const lastDate = dayjs(endDate);
    let weekendCount = 0;

    while (currentDate.isSameOrBefore(lastDate)) {
        if (currentDate.day() === 0 || currentDate.day() === 6) {
            weekendCount += 1;
        }
        currentDate = currentDate.add(1, 'day');
    }

    return weekendCount;
};
