import {
    createEntityAdapter,
    createSlice,
    PayloadAction
} from '@reduxjs/toolkit';

import { StateSchema } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';
import { SortType } from '@/shared/types/sort';

import { fetchUsersList } from '../services/fetchUsersList';
import { EmployeeListPageSchema } from '../types/EmployeeListPageSchema';

const usersAdapter = createEntityAdapter<User>({
    // получение id (для того, чтобы antity adapter понимал по какому полю будет идти нормализация)
    selectId: (user) => user._id
});

export const getUsers = usersAdapter.getSelectors<StateSchema>(
    (state) => state.employeeListPage || usersAdapter.getInitialState()
);

const employeeListPageSlice = createSlice({
    name: 'articlePageSlice',
    initialState: usersAdapter.getInitialState<EmployeeListPageSchema>({
        isLoading: false,
        error: undefined,
        entities: {},
        ids: [],
        sort: 'all',
        search: ''
    }),
    reducers: {
        setSort: (state, action: PayloadAction<SortType>) => {
            state.sort = action.payload;
        },
        setSearch: (state, action: PayloadAction<string>) => {
            state.search = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsersList.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
            })
            .addCase(fetchUsersList.fulfilled, (state, action) => {
                state.isLoading = false;
                state.error = undefined;
                usersAdapter.setAll(state, action.payload);
            })
            .addCase(fetchUsersList.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            });
    }
});

export const { reducer: employeeListPageReducer } = employeeListPageSlice;
export const { actions: employeeListPageActions } = employeeListPageSlice;
