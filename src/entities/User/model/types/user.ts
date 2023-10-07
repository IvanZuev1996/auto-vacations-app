import { UserRole } from '../consts/userConsts';

interface AuthData {
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
    role: UserRole; // роль пользователя: Руководитель/Сотрудник
    department?: number; // отдел
    division: number; // подразделение
    intersections?: string[]; // пересечения
    startWork?: Date; // дата начала работы
    balance: number; // баланс отпускных дней
    daysOnVacations: number; // кол-во дней проведенных в отпуске
    visibleUsers: string[]; // доступные для просмотра пользователи
    vacationStatus: 'in vacation' | 'work'; // статус 'в отпуске' или 'работает'
    auth: AuthData;
    createdAt: Date;
    updatedAt: Date;
}

export interface UserSchema {
    authData?: User;
    _inited: boolean;
}
