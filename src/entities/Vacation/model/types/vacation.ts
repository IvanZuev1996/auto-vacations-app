import { Division } from '@/entities/Division';
import { User } from '@/entities/User';

export type VacationStatus = 'pending' | 'rejected' | 'agreed';

export type VacationType = 'standart' | 'donor';

export interface Vacation {
    _id: string; // id заявки
    user?: User; // id пользователя
    start: string; // дата начала отпуска
    end: string; // дата конца отпуска
    type: VacationType; // тип отпуска
    status: VacationStatus; // статус заявки
}

export interface SortByUserVacation {
    userData?: User;
    userVacations: Vacation[];
}

export interface SortByDivisionVacation {
    division: Division;
    vacations?: SortByUserVacation[];
}
