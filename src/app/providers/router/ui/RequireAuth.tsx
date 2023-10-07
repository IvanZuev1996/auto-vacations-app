import { Navigate, useLocation } from 'react-router-dom';

export function RequireAuth({ children }: { children: JSX.Element }) {
    const state = true;
    const location = useLocation();

    if (state && location.pathname !== '/login') {
        return <Navigate to="/" replace />;
    }

    return children;
}
