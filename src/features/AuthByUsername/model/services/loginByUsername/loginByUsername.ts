import { createAsyncThunk } from '@reduxjs/toolkit';
import Cookies from 'universal-cookie';

import { ThunkConfig } from '@/app/providers/StoreProvider';
import { User, userActions } from '@/entities/User';
import { USER_LOCALSTORAGE_KEY } from '@/shared/consts/localStorage';

const cookies = new Cookies();

export interface LoginByUsernameProps {
    username: string;
    password: string;
}

export const loginByUsername = createAsyncThunk<
    User,
    LoginByUsernameProps,
    ThunkConfig<string>
>('user/loginByUsername', async (authData, thunkApi) => {
    const { dispatch, extra, rejectWithValue } = thunkApi;

    try {
        const response = await extra.api.post<User>(
            '/api/auth/login',
            authData
        );
        if (!response.data) {
            throw new Error();
        }
        // cookies.set('auth', response.headers['set-cookie']);

        localStorage.setItem(
            USER_LOCALSTORAGE_KEY,
            JSON.stringify(response.data)
        );
        dispatch(userActions.setAuthData(response.data));

        return response.data;
    } catch (e) {
        return rejectWithValue('error');
    }
});
