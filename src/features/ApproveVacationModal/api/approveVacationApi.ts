import { Vacation, VacationStatus } from '@/entities/Vacation';
import { rtkApi } from '@/shared/api/rtkApi';

interface GetVacationProps {
    id: string;
}

const approveVacationApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        getVacation: build.query<Vacation, GetVacationProps>({
            query: ({ id }) => ({
                url: `/api/vacations/${id}`
            })
        }),
        approveVacation: build.mutation<Vacation, GetVacationProps>({
            query: ({ id }) => {
                const newStatus: VacationStatus = 'agreed';

                return {
                    url: `/api/vacations/${id}`,
                    method: 'PATCH',
                    body: {
                        status: newStatus
                    }
                };
            }
        })
    })
});

export const useVacation = approveVacationApi.useGetVacationQuery;
export const useLazyVacation = approveVacationApi.useLazyGetVacationQuery;
export const useApproveVacation = approveVacationApi.useApproveVacationMutation;
