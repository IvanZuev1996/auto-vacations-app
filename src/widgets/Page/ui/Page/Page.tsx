import { memo, ReactNode } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames';

import cls from './Page.module.scss';

interface PageProps {
    children: ReactNode;
    className?: string;
}

export const Page = memo(({ children, className }: PageProps) => (
    <main className={classNames(cls.Page, {}, [className])}>{children}</main>
));
