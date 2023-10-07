import { Card } from 'antd';

import { LoginForm } from '@/features/AuthByUsername';
import { Page } from '@/widgets/Page';

import cls from './AuthPage.module.scss';

const LoginPage = () => (
    <Page className={cls.AuthPage}>
        <Card bordered={false} className={cls.card}>
            <LoginForm />
        </Card>
    </Page>
);

export default LoginPage;
