import { StateSchema } from '@/app/providers/StoreProvider';

export const getEmployeeListPageIsLoading = (state: StateSchema) =>
    state.employeeListPage?.isLoading;
export const getEmployeeListPageError = (state: StateSchema) =>
    state.employeeListPage?.error;
export const getEmployeeListPageSort = (state: StateSchema) =>
    state.employeeListPage?.sort;
export const getEmployeeListPageSearch = (state: StateSchema) =>
    state.employeeListPage?.search;
