import { DivisionsPage } from '@/pages/DivisionsPage';
import { EmployeeListPage } from '@/pages/EmployeeListPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { UserDetailsPage } from '@/pages/UserDetailsPage';
import { VacationsPage } from '@/pages/VacationsPage';
import {
    AppRoutes,
    getRouteDivisions,
    getRouteEmployeeList,
    getRouteMain,
    getRouteNotFound,
    getRouteUserDetails
} from '@/shared/consts/router';
import { AppRouteProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.VACATION_SCHEDULE]: {
        path: getRouteMain(),
        element: <VacationsPage />
    },
    [AppRoutes.EMPLOYEE_LIST]: {
        path: getRouteEmployeeList(),
        element: <EmployeeListPage />
    },
    [AppRoutes.DIVISIONS]: {
        path: getRouteDivisions(),
        element: <DivisionsPage />
    },
    [AppRoutes.USER_DETAILS]: {
        path: getRouteUserDetails(':id'),
        element: <UserDetailsPage />
    },
    // last route
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />
    }
};
