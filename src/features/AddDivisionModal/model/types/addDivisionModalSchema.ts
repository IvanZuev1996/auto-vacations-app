import { Division } from '@/entities/Division';

type NewDivisionData = Omit<Division, '_id'>;

export interface AddDivsionModalSchema {
    data: NewDivisionData;
    users: string[];
    isLoading?: boolean;
    error?: string;
    isSuccess?: boolean;
}
