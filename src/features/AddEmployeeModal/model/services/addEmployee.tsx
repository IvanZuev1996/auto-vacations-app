import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';

import { NewUserData } from '../types/AddEmployeeModalSchema';

export const addEmployee = createAsyncThunk<
    User,
    NewUserData | undefined,
    ThunkConfig<string>
>('addEmployeeModal/addEmployee', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response: AxiosResponse<User> = await extra.api.post(
            'api/auth/register',
            { ...props, division: '6523ee0534f011f0bf7f4b43' }
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
