import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DIVISION_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';

import { Division, DivisionSchema } from '../types/division';

const initialState: DivisionSchema = {
    currentDivision: undefined,
    _inited: false
};

export const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers: {
        changeDivision: (state, action: PayloadAction<Division>) => {
            localStorage.setItem(
                DIVISION_LOCALSTORAGE_KEY,
                JSON.stringify(action.payload)
            );
            state.currentDivision = action.payload;
        },
        initDivision: (state) => {
            const division = localStorage.getItem(DIVISION_LOCALSTORAGE_KEY);
            if (division) {
                state.currentDivision = JSON.parse(division);
            }
            state._inited = true;
        },
        removeDivision: (state) => {
            state.currentDivision = undefined;
            localStorage.removeItem(DIVISION_LOCALSTORAGE_KEY);
        }
    }
});

export const { actions: divisionActions } = divisionSlice;
export const { reducer: divisionReducer } = divisionSlice;
