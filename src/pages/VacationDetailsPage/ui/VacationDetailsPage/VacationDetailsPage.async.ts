import { lazy } from 'react';

export const VacationDetailsPageAsync = lazy(
    () => import('./VacationDetailsPage')
);
