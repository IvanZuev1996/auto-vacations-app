import { StateSchema } from '@/app/providers/StoreProvider';

export const getEditVacationModalIsLoading = (state: StateSchema) =>
    state.editVacationModal?.isLoading;

export const getEditVacationModalInited = (state: StateSchema) =>
    state.editVacationModal?._inited;

export const getEditVacationModalError = (state: StateSchema) =>
    state.editVacationModal?.error;

export const getEditVacationModalStartDate = (state: StateSchema) =>
    state.editVacationModal?.data.start;

export const getEditVacationModalEndDate = (state: StateSchema) =>
    state.editVacationModal?.data.end;

export const getEditVacationModalIsSuccess = (state: StateSchema) =>
    state.editVacationModal?.isSuccess;

export const getEditVacationModalData = (state: StateSchema) =>
    state.editVacationModal?.data;
