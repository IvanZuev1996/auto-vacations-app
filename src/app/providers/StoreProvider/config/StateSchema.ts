import {
    AnyAction,
    CombinedState,
    EnhancedStore,
    Reducer,
    ReducersMapObject
} from '@reduxjs/toolkit';
import { AxiosInstance } from 'axios';

import { DivisionSchema } from '@/entities/Division';
import { UserSchema } from '@/entities/User';
import { AddEmployeeModalSchema } from '@/features/AddEmployeeModal';
import { AddVacationModalSchema } from '@/features/AddVacationModal';
import { LoginSchema } from '@/features/AuthByUsername';
import { EmployeeListPageSchema } from '@/pages/EmployeeListPage';
import { VacationsPageSchema } from '@/pages/VacationsPage';
import { rtkApi } from '@/shared/api/rtkApi';
import { SidebarSchema } from '@/widgets/Sidebar';

export interface StateSchema {
    sidebar: SidebarSchema;
    user: UserSchema;
    division: DivisionSchema;
    [rtkApi.reducerPath]: ReturnType<typeof rtkApi.reducer>;

    // асинхронные редюсеры
    loginForm?: LoginSchema;
    vacationsPage?: VacationsPageSchema;
    addEmployeeModal?: AddEmployeeModalSchema;
    employeeListPage?: EmployeeListPageSchema;
    addVacationModal?: AddVacationModalSchema;
}

export type StateSchemaKey = keyof StateSchema;

export interface ReducerManager {
    getReducerMap: () => ReducersMapObject<StateSchema>;
    reduce: (
        state: StateSchema,
        action: AnyAction
    ) => CombinedState<StateSchema>;
    add: (key: StateSchemaKey, reducer: Reducer) => void;
    remove: (key: StateSchemaKey) => void;
}

export interface ReduxStoreWithManager extends EnhancedStore<StateSchema> {
    reducerManager: ReducerManager;
}

export interface ThunkExtraArg {
    api: AxiosInstance;
}

export interface ThunkConfig<T> {
    rejectValue: T;
    extra: ThunkExtraArg;
    state: StateSchema;
}
