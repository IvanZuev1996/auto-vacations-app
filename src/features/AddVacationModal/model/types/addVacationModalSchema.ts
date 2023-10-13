import { Vacation } from '@/entities/Vacation';

export type NewVacationData = Omit<Vacation, 'user' | '_id'>;

export interface AddVacationModalSchema {
    data: NewVacationData;
    isLoading?: boolean;
    error?: string;
    isSuccess?: boolean;
}
