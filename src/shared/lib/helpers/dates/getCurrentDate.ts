import dayjs from 'dayjs';

const getCurrentYear = () => dayjs().year();
const getCurrentMounth = () => dayjs().month() + 1;

export const getCurrentDate = () => {
    const currentYear = getCurrentYear();
    const currentMonth = getCurrentMounth();

    return { currentYear, currentMonth };
};
