import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getUserAuthData } from '@/entities/User';
import { Vacation } from '@/entities/Vacation';

export const addVacation = createAsyncThunk<
    Vacation,
    Vacation | undefined,
    ThunkConfig<string>
>('addVacationModal/addVacation', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const user = getUserAuthData(getState());

    try {
        const response: AxiosResponse<Vacation> = await extra.api.post(
            'api/vacations',
            {
                user: user?._id,
                start: props?.start,
                end: props?.end,
                type: props?.type,
                status: props?.status
            }
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
