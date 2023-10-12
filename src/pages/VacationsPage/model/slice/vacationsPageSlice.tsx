import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { TableView } from '@/widgets/Table';

import { fetchVacations } from '../services/fetchVacations';
import { VacationsPageSchema } from '../types/vacationsPageSchema';

const initialState: VacationsPageSchema = {
    selectors: {
        month: undefined,
        view: undefined,
        year: undefined
    },
    error: undefined,
    isLoading: false,
    vacations: []
};

const vacationsPageSlice = createSlice({
    name: 'vacationsPageSlice',
    initialState,
    reducers: {
        setTableView: (state, action: PayloadAction<TableView>) => {
            state.selectors.view = action.payload;
        },
        setMonth: (state, action: PayloadAction<number>) => {
            state.selectors.month = action.payload;
        },
        setYear: (state, action: PayloadAction<number>) => {
            state.selectors.year = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVacations.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchVacations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                state.vacations = action.payload;
            })
            .addCase(fetchVacations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { reducer: vacationsPageReducer } = vacationsPageSlice;
export const { actions: vacationsPageActions } = vacationsPageSlice;
