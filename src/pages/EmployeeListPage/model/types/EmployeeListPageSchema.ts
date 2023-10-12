import { EntityState } from '@reduxjs/toolkit';

import { User } from '@/entities/User';
import { SortType } from '@/shared/types/sort';

export interface EmployeeListPageSchema extends EntityState<User> {
    isLoading?: boolean;
    error?: string;

    // filters
    sort: SortType;
    search?: string;
}
