import {
    createEntityAdapter,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { Vacation } from '@/entities/Vacation';
import { getCurrentDate } from '@/shared/lib/helpers/dates';
import { TableView } from '@/widgets/Table';

import { fetchVacations } from '../services/fetchVacations';
import { VacationsPageSchema } from '../types/vacationsPageSchema';

const vacationsAdapter = createEntityAdapter<Vacation>({
    // получение id (для того, чтобы antity adapter понимал по какому полю будет идти нормализация)
    selectId: (vacation) => vacation._id
});

export const getVacations = vacationsAdapter.getSelectors<StateSchema>(
    (state) => state.vacationsPage || vacationsAdapter.getInitialState()
);

const { currentMonth, currentYear } = getCurrentDate();

const vacationsPageSlice = createSlice({
    name: 'vacationsPageSlice',
    initialState: vacationsAdapter.getInitialState<VacationsPageSchema>({
        selectors: {
            month: currentMonth,
            year: currentYear,
            view: 'month'
        },
        isLoading: false,
        error: undefined,
        entities: {},
        ids: []
    }),
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
                vacationsAdapter.setAll(state, action.payload);
            })
            .addCase(fetchVacations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { reducer: vacationsPageReducer } = vacationsPageSlice;
export const { actions: vacationsPageActions } = vacationsPageSlice;
