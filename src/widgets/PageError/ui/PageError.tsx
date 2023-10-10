import { Button, Result } from 'antd';

import cls from './PageError.module.scss';

interface PageErrorProps {
    title?: string;
    subTitle?: string;
}

export const PageError = (props: PageErrorProps) => {
    const {
        subTitle = 'Попробуйте обновить страницу или вернитесь на главную',
        title = 'Что-то пошло не так.'
    } = props;
    return (
        <Result
            status={500}
            title={title}
            subTitle={subTitle}
            extra={
                <a href="/">
                    <Button type="primary">Вернуться на главную</Button>
                </a>
            }
            className={cls.PageError}
        />
    );
};
