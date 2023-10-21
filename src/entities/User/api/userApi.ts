import { Vacation } from '@/entities/Vacation';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetUserVacationsByIdProps {
    id: string;
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
        })
    })
});

export const useUserVacations = userApi.useLazyGetUserVacationsByIdQuery;
