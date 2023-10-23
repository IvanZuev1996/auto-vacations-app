import { rtkApi } from '@/shared/api/rtkApi';

interface GetStatisicsProps {
    divisionId: string;
}

const statisticsPageApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getStatisics: build.query<
            { inVacationUsersCount: number },
            GetStatisicsProps
        >({
            query: ({ divisionId }) => ({
                url: `/api/divisions/statistics/${divisionId}`
            })
        })
    })
});

export const useStatistics = statisticsPageApi.useGetStatisicsQuery;
