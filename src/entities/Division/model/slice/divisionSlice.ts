import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Division, DivisionSchema } from '../types/division';

const initialState: DivisionSchema = {
    currentDivision: undefined
};

export const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers: {
        changeDivision: (state, action: PayloadAction<Division>) => {
            state.currentDivision = action.payload;
        },
        removeDivision: (state) => {
            state.currentDivision = undefined;
        }
    }
});

export const { actions: divisionActions } = divisionSlice;
export const { reducer: divisionReducer } = divisionSlice;
