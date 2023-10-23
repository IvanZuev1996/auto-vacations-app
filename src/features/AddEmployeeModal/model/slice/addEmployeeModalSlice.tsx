import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import { UserRole } from '@/entities/User';

import { addEmployee } from '../services/addEmployee';
import {
    AddEmployeeModalSchema,
    NewUserData
} from '../types/AddEmployeeModalSchema';

const initialState: AddEmployeeModalSchema = {
    data: {
        firstname: '',
        lastname: '',
        patronymic: '',
        post: '',
        startWork: undefined,
        division: '',
        balance: 0,
        intersections: [],
        role: [UserRole.USER],
        nowInVacation: false,
        auth: {
            password: '',
            salt: '',
            sessionToken: '',
            testPassword: '',
            username: ''
        }
    },
    error: undefined,
    isLoading: false,
    isSuccess: false
};

export const addEmployeeModalSlice = createSlice({
    name: 'addEmployeeModalSlice',
    initialState,
    reducers: {
        setFirstname: (state, action: PayloadAction<string>) => {
            state.data.firstname = action.payload;
        },
        setLastname: (state, action: PayloadAction<string>) => {
            state.data.lastname = action.payload;
        },
        setPatronymic: (state, action: PayloadAction<string>) => {
            state.data.patronymic = action.payload;
        },
        setPost: (state, action: PayloadAction<string>) => {
            state.data.post = action.payload;
        },
        setStartWork: (state, action: PayloadAction<Date>) => {
            state.data.startWork = action.payload;
        },
        setDivision: (state, action: PayloadAction<string>) => {
            state.data.division = action.payload;
        },
        setBalance: (state, action: PayloadAction<number>) => {
            state.data.balance = action.payload;
        },
        setIntersections: (state, action: PayloadAction<string[]>) => {
            state.data.intersections = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(addEmployee.pending, (state) => {
                state.error = undefined;
                state.isLoading = true;
                state.isSuccess = false;
            })
            .addCase(
                addEmployee.fulfilled,
                (state, action: PayloadAction<NewUserData>) => {
                    state.data = action.payload;
                    state.isLoading = false;
                    state.error = undefined;
                    state.isSuccess = true;
                }
            )
            .addCase(addEmployee.rejected, (state, action) => {
                state.isLoading = false;
                state.isSuccess = false;
                state.error = action.payload;
            });
    }
});

export const { actions: addEmployeeModalActions } = addEmployeeModalSlice;
export const { reducer: addEmployeeModalReducer } = addEmployeeModalSlice;
