import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Vacation } from '@/entities/Vacation';

export const editVacation = createAsyncThunk<
    Vacation,
    Vacation | undefined,
    ThunkConfig<string>
>('editVacationModal/editVacation', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;

    try {
        const response: AxiosResponse<Vacation> = await extra.api.patch(
            `api/vacations/${props?._id}`,
            {
                start: props?.start,
                end: props?.end
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
