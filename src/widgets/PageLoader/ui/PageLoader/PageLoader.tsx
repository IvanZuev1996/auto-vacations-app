import { Spin } from 'antd';

import { classNames } from '@/shared/lib/helpers/classNames';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <div className={classNames(cls.PageLoader, {}, [className])}>
        <Spin size="large" />
    </div>
);
