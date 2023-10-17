import { createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosResponse } from 'axios';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { Division } from '@/entities/Division';

import { NewDivisionData } from '../types/addDivisionModalSchema';

export const addDivision = createAsyncThunk<
    Division,
    NewDivisionData | undefined,
    ThunkConfig<string>
>('addDivision<odal/addDivision', async (props, thunkApi) => {
    const { extra, rejectWithValue } = thunkApi;

    try {
        const response: AxiosResponse<Division> = await extra.api.post(
            'api/divisions',
            props
        );

        if (!response.data) {
            throw new Error(response.data);
        }

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
