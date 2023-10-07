import { Spin } from 'antd';

import { classNames } from '@/shared/lib/helpers/classNames';
import { HStack } from '@/shared/ui/Stack';

import cls from './PageLoader.module.scss';

interface PageLoaderProps {
    className?: string;
}

export const PageLoader = ({ className }: PageLoaderProps) => (
    <HStack
        justify="center"
        align="center"
        className={classNames(cls.PageLoader, {}, [className])}
    >
        <Spin size="large" />
    </HStack>
);
