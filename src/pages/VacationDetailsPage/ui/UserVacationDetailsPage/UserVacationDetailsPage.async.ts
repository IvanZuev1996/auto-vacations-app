import { lazy } from 'react';

export const UserVacationDetailsPageAsync = lazy(
    () => import('./UserVacationDetailsPage')
);
