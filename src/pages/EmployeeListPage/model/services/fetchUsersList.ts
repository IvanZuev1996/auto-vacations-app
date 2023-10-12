import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User } from '@/entities/User';

import {
    getEmployeeListPageSearch,
    getEmployeeListPageSort
} from '../selectors/employeeListPage';

export const fetchUsersList = createAsyncThunk<
    User[],
    void,
    ThunkConfig<string>
>('employeeListPage/fetchUsersList', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    const sort = getEmployeeListPageSort(getState());
    const search = getEmployeeListPageSearch(getState());

    try {
        const response = await extra.api.get<User[]>('/api/users', {
            params: {
                sort,
                search
            }
        });

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
