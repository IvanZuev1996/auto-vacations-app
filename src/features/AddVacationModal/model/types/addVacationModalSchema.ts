import { Vacation } from '@/entities/Vacation';

export interface AddVacationModalSchema {
    data: Vacation;
    isLoading?: boolean;
    error?: string;
    isSuccess?: boolean;
}
