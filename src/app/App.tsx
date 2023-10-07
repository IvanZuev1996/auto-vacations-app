import { ConfigProvider } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData, getUserInited, userActions } from '@/entities/User';
import { LoginPage } from '@/pages/AuthPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

import './styles/index.scss';

const App = () => {
    const dispatch = useAppDispatch();
    const inited = useSelector(getUserInited);
    const authData = useSelector(getUserAuthData);

    useEffect(() => {
        dispatch(userActions.initAuthData());
    }, [dispatch]);

    if (!authData) {
        return <LoginPage />;
    }

    return (
        <div className="app">
            <ConfigProvider
                theme={{
                    token: {
                        fontSize: 13,
                        fontFamily: '\'Montserrat\', sans-serif'
                    }
                }}
            >
                <Navbar />
                <div className="content-page">
                    <Sidebar />
                    {inited && <AppRouter />}
                </div>
            </ConfigProvider>
        </div>
    );
};

export default App;
