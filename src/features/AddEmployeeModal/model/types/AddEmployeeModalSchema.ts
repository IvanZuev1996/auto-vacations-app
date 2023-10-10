import { User } from '@/entities/User';

export type NewUserData = Omit<User, '_id'>;

export interface AddEmployeeModalSchema {
    data: NewUserData;
    isLoading?: boolean;
    error?: string;
    isSuccess?: boolean;
}
