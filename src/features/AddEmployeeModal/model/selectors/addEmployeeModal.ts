import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddEmployeeIsLoading = (state: StateSchema) =>
    state.addEmployeeModal?.isLoading;
export const getAddEmployeeError = (state: StateSchema) =>
    state.addEmployeeModal?.error || '';
export const getAddEmployeeIsSuccess = (state: StateSchema) =>
    state.addEmployeeModal?.isSuccess;

export const getAddEmployeeUserData = (state: StateSchema) =>
    state.addEmployeeModal?.data;
export const getAddEmployeeAuthData = (state: StateSchema) =>
    state.addEmployeeModal?.data.auth;
