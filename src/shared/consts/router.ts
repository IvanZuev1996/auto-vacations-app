export enum AppRoutes {
    VACATION_SCHEDULE = 'vacation_schedule',
    EMPLOYEE_LIST = 'employee_list',
    DIVISIONS = 'divisions',
    USER_DETAILS = 'user_details',
    // last page
    NOT_FOUND = 'not_found'
}

export const getRouteMain = () => '/';
export const getRouteEmployeeList = () => '/staff';
export const getRouteUserDetails = (id: string) => `/staff/${id}`;
export const getRouteDivisions = () => '/divisions';
export const getRouteNotFound = () => '*';
