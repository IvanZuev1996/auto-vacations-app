// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { vacationTypeMap } from '@/entities/Vacation';

export const vacationTypeOptions = [
    {
        value: '1',
        label: vacationTypeMap.standart
    },
    {
        value: '2',
        label: vacationTypeMap.donor
    }
];
