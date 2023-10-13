import { Division } from '@/entities/Division';
import { rtkApi } from '@/shared/api/rtkApi';

const changeDivisionSelectApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getDivisions: build.query<Division[], void>({
            query: () => ({
                url: '/api/divisions'
            })
        })
    })
});

export const useDivisions = changeDivisionSelectApi.useGetDivisionsQuery;
