import { StateSchema } from '@/app/providers/StoreProvider';

export const getCurrentDivision = (state: StateSchema) =>
    state.division.currentDivision;

export const getDivisionInited = (state: StateSchema) => state.division._inited;
