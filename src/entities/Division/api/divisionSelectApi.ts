import { rtkApi } from '@/shared/api/rtkApi';

import { Division } from '../model/types/division';

interface GetDivisionByIdProps {
    id: string;
}

const divisionSelectApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getDivisions: build.query<Division[], void>({
            query: () => ({
                url: '/api/divisions'
            })
        }),
        getDivisionById: build.query<Division, GetDivisionByIdProps>({
            query: ({ id }) => ({
                url: `/api/divisions/${id}`
            })
        })
    })
});

export const useDivisions = divisionSelectApi.useGetDivisionsQuery;
export const useDivisionById = divisionSelectApi.useGetDivisionByIdQuery;
