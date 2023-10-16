import { UserRole } from '@/entities/User';
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
        element: <EmployeeListPage />,
        roles: [UserRole.ADMIN]
    },
    [AppRoutes.DIVISIONS]: {
        path: getRouteDivisions(),
        element: <DivisionsPage />,
        roles: [UserRole.ADMIN]
    },
    [AppRoutes.USER_DETAILS]: {
        path: getRouteUserDetails(':id'),
        element: <UserDetailsPage />,
        roles: [UserRole.ADMIN]
    },
    // last route
    [AppRoutes.NOT_FOUND]: {
        path: getRouteNotFound(),
        element: <NotFoundPage />
    }
};
