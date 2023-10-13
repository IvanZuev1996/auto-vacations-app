import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Vacation, VacationType } from '@/entities/Vacation';

import { addVacation } from '../services/addVacation';
import { AddVacationModalSchema } from '../types/addVacationModalSchema';

const initialState: AddVacationModalSchema = {
    data: {
        end: '',
        start: '',
        status: 'pending',
        type: 'standart'
    },
    error: undefined,
    isLoading: false,
    isSuccess: false
};

export const addVacationModalSlice = createSlice({
    name: 'addVacationModalSlice',
    initialState,
    reducers: {
        setVacationType: (state, action: PayloadAction<VacationType>) => {
            state.data.type = action.payload;
        },
        setStartDate: (state, action: PayloadAction<string>) => {
            state.data.start = action.payload;
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.data.end = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addVacation.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(
                addVacation.fulfilled,
                (state, action: PayloadAction<Vacation>) => {
                    state.data = action.payload;
                    state.isLoading = false;
                    state.error = undefined;
                    state.isSuccess = true;
                }
            )
            .addCase(addVacation.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.payload;
            });
    }
});

export const { actions: addVacationModalActions } = addVacationModalSlice;
export const { reducer: addVacationModalReducer } = addVacationModalSlice;
