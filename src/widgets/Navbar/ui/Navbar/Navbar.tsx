import { ReactNode, memo } from 'react';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
    children?: ReactNode;
}

export const Navbar = memo(({ className, children }: NavbarProps) => {
    const a = 0;

    return <nav className={cls.Navbar}>{children}</nav>;
});
