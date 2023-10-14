import { SortByDivisionVacation } from '@/entities/Vacation';
import { TableView } from '@/widgets/Table';

interface VacationsSelectors {
    month?: number;
    year?: number;
    view?: TableView;
}

export interface VacationsPageSchema {
    isLoading?: boolean;
    error?: string;
    selectors: VacationsSelectors;
    vacations: SortByDivisionVacation[];
}
