import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { DIVISION_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';

import { DivisionSchema } from '../types/division';

const initialState: DivisionSchema = {
    currentDivisionId: undefined,
    _inited: false
};

export const divisionSlice = createSlice({
    name: 'division',
    initialState,
    reducers: {
        changeDivision: (state, action: PayloadAction<string>) => {
            localStorage.setItem(
                DIVISION_LOCALSTORAGE_KEY,
                JSON.stringify(action.payload)
            );
            state.currentDivisionId = action.payload;
        },
        initDivision: (state) => {
            const division = localStorage.getItem(DIVISION_LOCALSTORAGE_KEY);
            if (division) {
                state.currentDivisionId = JSON.parse(division);
            }
            state._inited = true;
        },
        removeDivision: (state) => {
            state.currentDivisionId = undefined;
            localStorage.removeItem(DIVISION_LOCALSTORAGE_KEY);
        }
    }
});

export const { actions: divisionActions } = divisionSlice;
export const { reducer: divisionReducer } = divisionSlice;
