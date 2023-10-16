import { createSelector } from '@reduxjs/toolkit';

import { UserRole } from '../../consts/userConsts';
import { getUserAuthData } from '../getUserAuthData/getUserAuthData';

export const getUserRoles = createSelector(
    getUserAuthData,
    (authData) => authData?.role
);

export const getIsUserAdmin = createSelector(getUserAuthData, (authData) =>
    authData?.role.includes(UserRole.ADMIN)
);
