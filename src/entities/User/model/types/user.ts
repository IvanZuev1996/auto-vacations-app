import { UserRole } from '../consts/userConsts';

export type UserStatus = 'on vacation' | 'work';

export interface AuthData {
    username: string;
    password: string;
    salt: string;
    sessionToken: string;
    testPassword: string;
}

export interface User {
    _id: string;
    firstname: string; // имя
    lastname: string; // фамилия
    patronymic?: string; // отчество
    avatar?: string; // аватарка
    email?: string; // почта
    post?: string; // должность
    role: UserRole[]; // роль пользователя: Руководитель/Сотрудник
    department?: number; // отдел
    division: string; // подразделение
    intersections?: string[]; // пересечения
    startWork?: Date; // дата начала работы
    spentVacationDays?: number; // баланс отпускных дней
    prevBalance?: number; // баланс отпускных дней
    balance: number; // баланс отпускных дней
    auth: AuthData;
    daysOnVacations?: number; // кол-во дней проведенных в отпуске
    visibleUsers?: string[]; // доступные для просмотра пользователи
    vacationStatus?: UserStatus; // статус 'в отпуске' или 'работает'
    createdAt?: Date;
    updatedAt?: Date;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
