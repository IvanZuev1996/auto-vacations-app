import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { Vacation } from '@/entities/Vacation';

export const addVacation = createAsyncThunk<
    Vacation,
    DeepPartial<Vacation> | undefined,
    ThunkConfig<string>
>('addVacationModal/addVacation', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const user = getUserAuthData(getState());

    try {
        const response: AxiosResponse<Vacation> = await extra.api.post(
            'api/vacations',
            { ...props, user: user?._id }
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
