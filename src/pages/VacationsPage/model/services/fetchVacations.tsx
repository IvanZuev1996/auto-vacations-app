import { createAsyncThunk } from '@reduxjs/toolkit';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { getCurrentDivisionId } from '@/entities/Division';
import { SortByDivisionVacation } from '@/entities/Vacation';

export const fetchVacations = createAsyncThunk<
    SortByDivisionVacation[],
    void,
    ThunkConfig<string>
>('vacationsPage/fetchVacations', async (props, thunkApi) => {
    const { extra, rejectWithValue, getState } = thunkApi;
    const divisionId = getCurrentDivisionId(getState());

    try {
        const response = await extra.api.get<SortByDivisionVacation[]>(
            '/api/vacations',
            {
                params: {
                    division: divisionId
                }
            }
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
