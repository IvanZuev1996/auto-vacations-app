import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { addDivision } from '../services/addDivision';
import {
    AddDivsionModalSchema,
    NewDivisionData
} from '../types/addDivisionModalSchema';

const initialState: AddDivsionModalSchema = {
    data: {},
    error: undefined,
    isLoading: false,
    isSuccess: false
};

export const addDivisionModalSlice = createSlice({
    name: 'addDivisionModalSlice',
    initialState,
    reducers: {
        setNumber: (state, action: PayloadAction<number>) => {
            state.data.divisionNumber = action.payload;
        },
        setName: (state, action: PayloadAction<string>) => {
            state.data.name = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addDivision.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(
                addDivision.fulfilled,
                (state, action: PayloadAction<NewDivisionData>) => {
                    state.data = action.payload;
                    state.isLoading = false;
                    state.error = undefined;
                    state.isSuccess = true;
                }
            )
            .addCase(addDivision.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.payload;
            });
    }
});

export const { actions: addDivisionModalActions } = addDivisionModalSlice;
export const { reducer: addDivisionModalReducer } = addDivisionModalSlice;
