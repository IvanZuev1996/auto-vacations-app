import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddVacationModalIsLoading = (state: StateSchema) =>
    state.addVacationModal?.isLoading;

export const getAddVacationModalError = (state: StateSchema) =>
    state.addVacationModal?.error;

export const getAddVacationModalVacationType = (state: StateSchema) =>
    state.addVacationModal?.data.type;

export const getAddVacationModalStartDate = (state: StateSchema) =>
    state.addVacationModal?.data.start;

export const getAddVacationModalEndDate = (state: StateSchema) =>
    state.addVacationModal?.data.end;

export const getAddVacationModalIsSuccess = (state: StateSchema) =>
    state.addVacationModal?.isSuccess;

export const getAddVacationModalData = (state: StateSchema) =>
    state.addVacationModal?.data;
