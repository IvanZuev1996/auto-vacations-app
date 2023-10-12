import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { SortByUserVacation } from '@/entities/Vacation';

export const fetchVacations = createAsyncThunk<
    SortByUserVacation[],
    void,
    ThunkConfig<string>
>('vacationsPage/fetchVacations', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.get<SortByUserVacation[]>(
            '/api/vacations'
        );

        if (!response.data) {
            throw new Error();
        }

        return response.data;
    } catch (e) {
        console.log(e);
        return rejectWithValue('error');
    }
});
