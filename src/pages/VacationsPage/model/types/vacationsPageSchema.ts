import { EntityState } from '@reduxjs/toolkit';

import { Vacation } from '@/entities/Vacation';
import { TableView } from '@/widgets/Table';

interface VacationsSelectors {
    month?: number;
    year?: number;
    view?: TableView;
}

export interface VacationsPageSchema extends EntityState<Vacation> {
    isLoading?: boolean;
    error?: string;
    selectors: VacationsSelectors;
}
