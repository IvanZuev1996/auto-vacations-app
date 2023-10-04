import { Button, Result } from 'antd';

import cls from './PageError.module.scss';

export const PageError = () => (
    <Result
        status={500}
        title="Что-то пошло не так."
        subTitle="Попробуйте обновить страницу или вернитесь на главную"
        extra={
            <a href="/">
                <Button type="primary">Вернуться на главную</Button>
            </a>
        }
        className={cls.PageError}
    />
);
