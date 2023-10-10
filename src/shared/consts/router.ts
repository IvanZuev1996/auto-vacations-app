export enum AppRoutes {
    VACATION_SCHEDULE = 'vacation_schedule',
    EMPLOYEE_LIST = 'employee_list',
    // last page
    NOT_FOUND = 'not_found'
}

export const getRouteMain = () => '/';
export const getRouteEmployeeList = () => '/staff';
export const getRouteNotFound = () => '*';
