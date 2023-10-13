import { StateSchema } from '@/app/providers/StoreProvider';

export const getCurrentDivision = (state: StateSchema) =>
    state.division.currentDivision;
