import dayjs from 'dayjs';

const getCurrentYear = () => dayjs().year();
const getCurrentMounth = () => dayjs().month() + 1;

export const useCurrentDate = () => {
    const mounth = getCurrentMounth();
    const year = getCurrentYear();

    return { year, mounth };
};
