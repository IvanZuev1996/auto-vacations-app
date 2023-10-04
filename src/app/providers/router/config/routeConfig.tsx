import { VacationSchedulePage } from '@/pages/VacationSchedulePage';
import { AppRoutes } from '@/shared/consts/router';
import { AppRouteProps } from '@/shared/types/router';
import { PageError } from '@/widgets/PageError';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.VACATION_SCHEDULE]: {
        path: '/',
        element: <VacationSchedulePage />
    },
    // last route
    [AppRoutes.NOT_FOUND]: {
        path: '*',
        element: <PageError />
    }
};
