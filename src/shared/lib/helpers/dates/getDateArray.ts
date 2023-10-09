import { getCurrentDate } from './getCurrentDate';
import { getDaysByMonth } from './getDaysByMonth';

interface GetDaysArrayProps {
    year?: number;
    month?: number;
}

export const getDaysArray = (props: GetDaysArrayProps) => {
    const { currentYear, currentMonth } = getCurrentDate();
    const { month = currentMonth, year = currentYear } = props;

    const daysCount = getDaysByMonth({ month, year });
    const daysArray = new Array(daysCount).fill(0).map((_, index) => index + 1);

    return daysArray;
};
