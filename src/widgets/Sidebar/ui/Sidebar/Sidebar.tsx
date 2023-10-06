import {
    CommentOutlined,
    InsertRowAboveOutlined,
    LineChartOutlined,
    PartitionOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    UserOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { classNames } from '@/shared/lib/helpers/classNames';

import { getSidabarState } from '../../model/selectors/getSidebarState';
import { SidebarItemType } from '../../model/types/sidebar';
import { SidebarItem } from '../SidebarItem/SidebarItem';

import cls from './Sidebar.module.scss';

interface SidebarProps {
    className?: string;
}

const links: SidebarItemType[] = [
    {
        title: 'График отпусков',
        path: '/',
        icon: InsertRowAboveOutlined
    },
    {
        title: 'Сотрудники',
        path: '/staff',
        icon: UsergroupAddOutlined
    },
    {
        title: 'Заявки',
        path: '/applications',
        icon: CommentOutlined
    },
    {
        title: 'Профиль',
        path: '/profile/:id',
        icon: UserOutlined
    },
    {
        title: 'Подразделения',
        path: '/divisions',
        icon: PartitionOutlined
    },
    {
        title: 'Статистика',
        path: '/statistics',
        icon: LineChartOutlined
    }
];

const settingsLinks: SidebarItemType[] = [
    {
        title: 'Настройки',
        path: '/settings',
        icon: SettingOutlined
    },
    {
        title: 'Справочный центр',
        path: '/info',
        icon: QuestionCircleOutlined
    }
];

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
            <div role="navigation" className={cls.items}>
                {links.map((link) => (
                    <SidebarItem
                        active={pathname === link.path}
                        collapsed={!isOpen}
                        icon={link.icon}
                        path={link.path}
                        title={link.title}
                        key={link.title}
                    />
                ))}
            </div>
            <hr className={cls.hr} />
            <div role="navigation" className={cls.items}>
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
            </div>
        </aside>
    );
});
