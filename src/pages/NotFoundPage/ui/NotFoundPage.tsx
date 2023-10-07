import { Button, Result } from 'antd';
import { memo } from 'react';

import cls from './NotFoundPage.module.scss';

export const NotFoundPage = memo(() => (
    <Result
        status={404}
        title="Такой страницы не существует"
        extra={
            <a href="/">
                <Button type="primary">Вернуться на главную</Button>
            </a>
        }
        className={cls.NotFoundPage}
    />
));
