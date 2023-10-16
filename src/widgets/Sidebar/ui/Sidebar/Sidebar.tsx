import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { classNames } from '@/shared/lib/helpers/classNames';
import { Line } from '@/shared/ui/Line';
import { VStack } from '@/shared/ui/Stack';

import { links, settingsLinks } from '../../model/consts/sidebarLinks';
import { getSidabarState } from '../../model/selectors/getSidebarState';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

export const Sidebar = memo(({ className }: SidebarProps) => {
    const { pathname } = useLocation();
    const isOpen = useSelector(getSidabarState);

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: !isOpen }, [
                className
            ])}
        >
            <VStack gap="12" role="navigation" max className={cls.items}>
                {links.map((link) => (
                    <SidebarItem
                        active={pathname === link.path}
                        collapsed={!isOpen}
                        icon={link.icon}
                        path={link.path}
                        title={link.title}
                        key={link.title}
                        isAdminOnly={link.adminOnly}
                    />
                ))}
            </VStack>
            <Line className={cls.hr} />
            <VStack gap="12" role="navigation" max className={cls.items}>
                {settingsLinks.map((link) => (
                    <SidebarItem
                        active={pathname === link.path}
                        collapsed={!isOpen}
                        icon={link.icon}
                        path={link.path}
                        title={link.title}
                        key={link.title}
                    />
                ))}
            </VStack>
        </aside>
    );
});
