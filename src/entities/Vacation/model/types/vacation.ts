export type VacationStatus = 'pending' | 'rejected' | 'agreed';

export type VacationType = 'standart';

export interface Vacation {
    _id: string; // id заявки
    userId: string; // id пользователя
    start: Date; // дата начала отпуска
    end: Date; // дата конца отпуска
    type: VacationType; // тип отпуска
    status: VacationStatus; // статус заявки
}
