import { lazy } from 'react';

export const VacationSchedulePageAsync = lazy(
    () => import('./VacationSchedulePage')
);
