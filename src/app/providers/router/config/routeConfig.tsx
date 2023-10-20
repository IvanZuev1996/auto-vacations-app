import { UserRole } from '@/entities/User';
import { DivisionsPage } from '@/pages/DivisionsPage';
import { EmployeeListPage } from '@/pages/EmployeeListPage';
import { NotFoundPage } from '@/pages/NotFoundPage';
import { ProfilePage } from '@/pages/ProfilePage';
import { UserDetailsPage } from '@/pages/UserDetailsPage';
import { VacationDetailsPage } from '@/pages/VacationDetailsPage';
import { VacationsPage } from '@/pages/VacationsPage';
import {
    AppRoutes,
    getRouteDivisions,
    getRouteEmployeeList,
    getRouteMain,
    getRouteNotFound,
    getRouteOtherVacations,
    getRouteProfile,
    getRouteUserDetails,
    getRouteVacationDetails,
    getRouteVacations
} from '@/shared/consts/router';
import { AppRouteProps } from '@/shared/types/router';

export const routeConfig: Record<AppRoutes, AppRouteProps> = {
    [AppRoutes.MAIN]: {
        path: getRouteMain(),
        element: <div />
    },
    [AppRoutes.PROFILE]: {
        path: getRouteProfile(':id'),
        element: <ProfilePage />
    },
    [AppRoutes.VACATIONS]: {
        path: getRouteVacations(),
        element: <VacationsPage />
    },
    [AppRoutes.OTHER_VACATIONS]: {
        path: getRouteOtherVacations(),
        element: <VacationsPage />
    },
    [AppRoutes.VACATION_DETAILS]: {
        path: getRouteVacationDetails(':id'),
        element: <VacationDetailsPage />
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
