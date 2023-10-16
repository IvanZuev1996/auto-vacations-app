import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AddDivsionModalSchema } from '../types/addDivisionModalSchema';

const initialState: AddDivsionModalSchema = {
    data: {},
    error: undefined,
    users: [],
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
        },
        setUsers: (state, action: PayloadAction<string>) => {
            state.users = [...state.users, action.payload];
        }
    },
    extraReducers: (builder) => {
        // builder
        //     .addCase(addEmployee.pending, (state) => {
        //         state.error = undefined;
        //         state.isLoading = true;
        //         state.isSuccess = false;
        //     })
        //     .addCase(
        //         addEmployee.fulfilled,
        //         (state, action: PayloadAction<NewUserData>) => {
        //             state.data = action.payload;
        //             state.isLoading = false;
        //             state.error = undefined;
        //             state.isSuccess = true;
        //         }
        //     )
        //     .addCase(addEmployee.rejected, (state, action) => {
        //         state.isLoading = false;
        //         state.isSuccess = false;
        //         state.error = action.payload;
        //     });
    }
});

export const { actions: addDivisionModalActions } = addDivisionModalSlice;
export const { reducer: addDivisionModalReducer } = addDivisionModalSlice;
