import { Vacation } from '@/entities/Vacation';

export interface EditVacationModalSchema {
    data: Vacation;
    isLoading?: boolean;
    error?: string;
    isSuccess?: boolean;
    _inited?: boolean;
}
