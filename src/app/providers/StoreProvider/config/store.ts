import {
    CombinedState,
    configureStore,
    Reducer,
    ReducersMapObject
} from '@reduxjs/toolkit';

import { divisionReducer } from '@/entities/Division';
import { userReducer } from '@/entities/User';
import { $api } from '@/shared/api/api';
import { rtkApi } from '@/shared/api/rtkApi';
import { sidebarReducer } from '@/widgets/Sidebar';

import { createReducerManager } from './reducerManager';
import { StateSchema, ThunkExtraArg } from './StateSchema';

export function createReduxStore(
    initialState?: StateSchema,
    asyncReducers?: ReducersMapObject<StateSchema>
) {
    const rootReducer: ReducersMapObject<StateSchema> = {
        sidebar: sidebarReducer,
        user: userReducer,
        division: divisionReducer,
        [rtkApi.reducerPath]: rtkApi.reducer,
        ...asyncReducers
    };

    const reducerManager = createReducerManager(rootReducer);

    const extraArg: ThunkExtraArg = {
        api: $api
    };

    const store = configureStore({
        reducer: reducerManager.reduce as Reducer<CombinedState<StateSchema>>,
        devTools: __IS_DEV__,
        preloadedState: initialState,
        middleware: (getDefaultMiddleware) =>
            getDefaultMiddleware({ thunk: { extraArgument: extraArg } }).concat(
                rtkApi.middleware
            )
    });

    // @ts-ignore
    store.reducerManager = reducerManager;

    return store;
}

export type AppDispatch = ReturnType<typeof createReduxStore>['dispatch'];
