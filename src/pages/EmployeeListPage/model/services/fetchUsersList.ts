import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getCurrentDivision } from '@/entities/Division';
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
    const division = getCurrentDivision(getState());

    try {
        const response = await extra.api.get<User[]>('/api/users', {
            params: {
                sort,
                search,
                division: division?._id
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
