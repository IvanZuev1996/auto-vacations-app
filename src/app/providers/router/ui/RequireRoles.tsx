import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { getUserRoles, UserRole } from '@/entities/User';
import { getRouteNotFound } from '@/shared/consts/router';

interface RequireRoleProps {
    roles?: UserRole[];
    children: JSX.Element;
}

export function RequireRoles(props: RequireRoleProps) {
    const { roles, children } = props;
    const userRoles = useSelector(getUserRoles);
    const location = useLocation();

    const hasRequierdRoles = useMemo(() => {
        if (!roles) {
            return true;
        }

        return roles?.some((requiredRole) => {
            const hasRole = userRoles?.includes(requiredRole);
            return hasRole;
        });
    }, [roles, userRoles]);

    if (!hasRequierdRoles) {
        return (
            <Navigate
                to={getRouteNotFound()}
                state={{ from: location }}
                replace
            />
        );
    }

    return children;
}
