import { rtkApi } from '@/shared/api/rtkApi';

import { Division } from '../model/types/division';

const divisionSelectApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getDivisions: build.query<Division[], void>({
            query: () => ({
                url: '/api/divisions'
            })
        })
    })
});

export const useDivisions = divisionSelectApi.useGetDivisionsQuery;
