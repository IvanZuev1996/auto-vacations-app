export enum AppRoutes {
    MAIN = '/',
    PROFILE = 'profile',
    VACATIONS = 'vacations',
    OTHER_VACATIONS = 'other_vacations',
    VACATION_DETAILS = 'vacations_details',
    EMPLOYEE_LIST = 'employee_list',
    DIVISIONS = 'divisions',
    USER_DETAILS = 'user_details',
    APPLICATIONS = 'applications',
    STATISTICS = 'statistics',
    HELP = 'help',

    // last page
    NOT_FOUND = 'not_found'
}

export const getRouteMain = () => '/';
export const getRouteProfile = (id: string) => `/profile/${id}`;
export const getRouteVacations = () => '/vacations';
export const getRouteApplications = (id: string) => `/applications/${id}`;
export const getRouteOtherVacations = () => '/other-vacations';
export const getRouteVacationDetails = (id: string) => `/vacations/${id}`;
export const getRouteEmployeeList = () => '/staff';
export const getRouteUserDetails = (id: string) => `/staff/${id}`;
export const getRouteDivisions = () => '/divisions';
export const getRouteStatistics = () => '/statistics';
export const getRouteHelp = () => '/help';
export const getRouteNotFound = () => '*';
