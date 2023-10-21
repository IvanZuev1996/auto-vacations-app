import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { divisionActions, getDivisionInited } from '@/entities/Division';
import {
    fetchUserData,
    getUserAuthData,
    getUserInited,
    userActions
} from '@/entities/User';
import { LoginPage } from '@/pages/AuthPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import { AntdProvider } from './providers/AntdProvider/AntdProvider';
import { AppRouter } from './providers/router';

import './styles/index.scss';

const App = () => {
    const dispatch = useAppDispatch();
    const userInited = useSelector(getUserInited);
    const divisionInited = useSelector(getDivisionInited);
    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        dispatch(userActions.initAuthData());
        dispatch(divisionActions.initDivision(authData?.division || ''));
    }, [authData?.division, dispatch]);

    useEffect(() => {
        if (authData?._id) {
            dispatch(fetchUserData(authData._id));
        }
    }, [authData?._id, dispatch]);

    if (!authData) {
        return <LoginPage />;
    }

    return (
        <div className="app">
            <AntdProvider>
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {userInited && divisionInited && <AppRouter />}
                </div>
            </AntdProvider>
        </div>
    );
};

export default App;
