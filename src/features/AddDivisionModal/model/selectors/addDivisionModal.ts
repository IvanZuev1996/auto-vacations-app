import { StateSchema } from '@/app/providers/StoreProvider';

export const getAddDivisionModalData = (state: StateSchema) =>
    state.addDivisionModal?.data;
export const getAddDivisionModalIsLoding = (state: StateSchema) =>
    state.addDivisionModal?.isLoading;
export const getAddDivisionModalError = (state: StateSchema) =>
    state.addDivisionModal?.error;
export const getAddDivisionModalIsSuccess = (state: StateSchema) =>
    state.addDivisionModal?.isSuccess;
