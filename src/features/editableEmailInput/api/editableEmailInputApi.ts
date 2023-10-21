import { User } from '@/entities/User';
import { rtkApi } from '@/shared/api/rtkApi';

interface UpdateUserEmailProps {
    email: string;
    userId: string;
}

const aditableEmailInputApi = rtkApi.injectEndpoints({
    endpoints: (build) => ({
        updateUserEmail: build.mutation<User, UpdateUserEmailProps>({
            query: ({ email, userId }) => ({
                url: `/api/users/${userId}`,
                method: 'PATCH',
                body: { email }
            })
        })
    })
});

export const useUpdateUserEmail =
    aditableEmailInputApi.useUpdateUserEmailMutation;
