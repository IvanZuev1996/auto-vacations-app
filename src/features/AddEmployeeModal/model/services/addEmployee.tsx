import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getCurrentDivision } from '@/entities/Division';
import { User } from '@/entities/User';
// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { fetchUsersList } from '@/pages/EmployeeListPage';

import { NewUserData } from '../types/AddEmployeeModalSchema';

export const addEmployee = createAsyncThunk<
    User,
    NewUserData | undefined,
    ThunkConfig<string>
>('addEmployeeModal/addEmployee', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState, dispatch } = thunkApi;

    const division = getCurrentDivision(getState());

    try {
        const response: AxiosResponse<User> = await extra.api.post(
            'api/auth/register',
            { ...props, division: division?._id }
        );

        if (!response.data) {
            throw new Error(response.data);
        }

        dispatch(fetchUsersList());
        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
