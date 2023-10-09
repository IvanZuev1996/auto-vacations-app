import { ConfigProvider } from 'antd';
import locale from 'antd/locale/ru_RU';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData, getUserInited, userActions } from '@/entities/User';
import { LoginPage } from '@/pages/AuthPage';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Navbar } from '@/widgets/Navbar';
import { Sidebar } from '@/widgets/Sidebar';

import { AppRouter } from './providers/router';

import 'dayjs/locale/ru';

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
                locale={locale}
                theme={{
                    token: {
                        fontSize: 13,
                        fontFamily: '\'Montserrat\', sans-serif'
                    },
                    components: {
                        Tabs: {
                            horizontalItemPadding: '8px 0px',
                            horizontalMargin: '0px'
                        },
                        Card: {
                            paddingLG: 13,
                            boxShadowTertiary:
                                '0 5px 15px -3px rgba(34, 60, 80, 0.21)'
                        },
                        Dropdown: {
                            controlPaddingHorizontal: 25,
                            controlHeight: 40
                        }
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
