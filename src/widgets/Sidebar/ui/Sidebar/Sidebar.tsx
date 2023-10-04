import {
    CommentOutlined,
    InsertRowAboveOutlined,
    LineChartOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    PartitionOutlined,
    QuestionCircleOutlined,
    SettingOutlined,
    UserOutlined,
    UsergroupAddOutlined
} from '@ant-design/icons';
import { Select } from 'antd';
import { memo, useState } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames';
import { Icon } from '@/shared/ui/Icon/Icon';

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
        path: '/',
        icon: UsergroupAddOutlined
    },
    {
        title: 'Заявки',
        path: '/',
        icon: CommentOutlined
    },
    {
        title: 'Профиль',
        path: '/',
        icon: UserOutlined
    },
    {
        title: 'Подразделения',
        path: '/',
        icon: PartitionOutlined
    },
    {
        title: 'Статистика',
        path: '/',
        icon: LineChartOutlined
    }
];

const settingsLinks: SidebarItemType[] = [
    {
        title: 'Настройки',
        path: '/',
        icon: SettingOutlined
    },
    {
        title: 'Справочный центр',
        path: '/',
        icon: QuestionCircleOutlined
    }
];

export const Sidebar = memo(({ className }: SidebarProps) => {
    const [isOpen, setIsOpen] = useState(true);

    const MenuIcon = isOpen ? MenuFoldOutlined : MenuUnfoldOutlined;

    return (
        <aside
            data-testid="sidebar"
            className={classNames(cls.Sidebar, { [cls.collapsed]: !isOpen }, [
                className
            ])}
        >
            <div className={cls.sidebarHeader}>
                <h3 className={cls.logo}>ОтпускПлюс!</h3>
                <Icon
                    Icon={MenuIcon}
                    onClick={() => setIsOpen((prev) => !prev)}
                    size={20}
                    className={cls.menuIcon}
                />
            </div>
            <div className={cls.selectWrapper}>
                <Select
                    defaultValue="Подразделение 1"
                    size="large"
                    style={{ width: '100%' }}
                    onChange={undefined}
                    options={[
                        { value: 'Подразделение 1', label: 'Подразделение 1' },
                        { value: 'Подразделение 2', label: 'Подразделение 2' },
                        { value: 'Подразделение 3', label: 'Подразделение 3' }
                    ]}
                />
            </div>
            <hr className={cls.hr} />
            <div role="navigation" className={cls.items}>
                {links.map((link) => (
                    <SidebarItem
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
