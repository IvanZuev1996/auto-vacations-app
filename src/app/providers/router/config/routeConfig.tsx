import { NotFoundPage } from '@/pages/NotFoundPage';
import { VacationsPage } from '@/pages/VacationsPage';
import {
    AppRoutes,
    getRouteMain,
    getRouteNotFound
} from '@/shared/consts/router';
import { AppRouteProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.VACATION_SCHEDULE]: {
        path: getRouteMain(),
        element: <VacationsPage />
    },
    // last route
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />
    }
};
