import { memo, ReactNode } from 'react';

import cls from './Page.module.scss';

interface PageProps {
    children: ReactNode;
}

export const Page = memo(({ children }: PageProps) => (
    <main className={cls.Page}>{children}</main>
));
