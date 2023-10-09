import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Vacation } from '@/entities/Vacation';

export const fetchVacations = createAsyncThunk<
    Vacation[],
    void,
    ThunkConfig<string>
>('vacationsPage/fetchVacations', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<Vacation[]>('/api/vacations');

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
