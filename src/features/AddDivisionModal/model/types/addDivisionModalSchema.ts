import { Division } from '@/entities/Division';

export type NewDivisionData = Omit<Division, '_id'>;

export interface AddDivsionModalSchema {
    data: NewDivisionData;
    isLoading?: boolean;
    error?: string;
    isSuccess?: boolean;
}
