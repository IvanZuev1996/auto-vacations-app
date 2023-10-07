import { NotFoundPage } from '@/pages/NotFoundPage';
import { VacationSchedulePage } from '@/pages/VacationSchedulePage';
import {
    AppRoutes,
    getRouteMain,
    getRouteNotFound
} from '@/shared/consts/router';
import { AppRouteProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.VACATION_SCHEDULE]: {
        path: getRouteMain(),
        element: <VacationSchedulePage />
    },
    // last route
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />
    }
};
