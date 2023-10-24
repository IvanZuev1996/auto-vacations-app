import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { Vacation } from '@/entities/Vacation';

import { editVacation } from '../services/editVacation';
import { EditVacationModalSchema } from '../types/editVacationModalSchema';

const initialState: EditVacationModalSchema = {
    data: {
        _id: '',
        end: '',
        start: '',
        status: 'pending',
        type: 'standart',
        user: undefined
    },
    error: undefined,
    isLoading: false,
    isSuccess: false,
    _inited: false
};

export const editVacationModalSlice = createSlice({
    name: 'editVacationModalSlice',
    initialState,
    reducers: {
        setStartDate: (state, action: PayloadAction<string>) => {
            state.data.start = action.payload;
        },
        setEndDate: (state, action: PayloadAction<string>) => {
            state.data.end = action.payload;
        },
        initVacation: (state, action: PayloadAction<Vacation>) => {
            state.data = action.payload;
            state._inited = true;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(editVacation.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(
                editVacation.fulfilled,
                (state, action: PayloadAction<Vacation>) => {
                    state.data = action.payload;
                    state.isLoading = false;
                    state.error = undefined;
                    state.isSuccess = true;
                }
            )
            .addCase(editVacation.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.payload;
            });
    }
});

export const { actions: editVacationModalActions } = editVacationModalSlice;
export const { reducer: editVacationModalReducer } = editVacationModalSlice;
