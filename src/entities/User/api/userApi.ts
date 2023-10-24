import { Vacation } from '@/entities/Vacation';
import { rtkApi } from '@/shared/api/rtkApi';

import { User } from '../model/types/user';

interface GetUserVacationsByIdProps {
    id: string;
}

interface GetUserDataByIdProps {
    userId: string;
}

const userApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getUserVacationsById: build.query<
            Vacation[],
            GetUserVacationsByIdProps
        >({
            query: ({ id }) => ({
                url: '/api/vacations',
                params: { userId: id }
            })
        }),
        getUserDataById: build.query<User, GetUserDataByIdProps>({
            query: ({ userId }) => ({
                url: `/api/users/${userId}`
            })
        })
    })
});

export const useUserVacations = userApi.useLazyGetUserVacationsByIdQuery;
export const useLazyUserData = userApi.useLazyGetUserDataByIdQuery;
export const useUserData = userApi.useGetUserDataByIdQuery;
