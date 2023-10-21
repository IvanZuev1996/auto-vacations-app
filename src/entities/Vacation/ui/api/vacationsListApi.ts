import { rtkApi } from '@/shared/api/rtkApi';

import { Vacation } from '../../model/types/vacation';

interface DeleteVacationProps {
    vacationId: string;
}

const vacationListApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        deleteVacation: build.mutation<Vacation, DeleteVacationProps>({
            query: ({ vacationId }) => ({
                url: `/api/vacations/${vacationId}`,
                method: 'DELETE'
            })
        })
    })
});

export const useDeleteVacation = vacationListApi.useDeleteVacationMutation;
