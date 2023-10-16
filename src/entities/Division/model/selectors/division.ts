import { StateSchema } from '@/app/providers/StoreProvider';

export const getCurrentDivisionId = (state: StateSchema) =>
    state.division.currentDivisionId;

export const getDivisionInited = (state: StateSchema) => state.division._inited;
