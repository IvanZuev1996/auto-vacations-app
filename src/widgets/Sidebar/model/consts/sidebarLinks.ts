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

import { SidebarItemType } from '../types/sidebar';

export const links: SidebarItemType[] = [
    {
        title: 'График отпусков',
        path: '/',
        icon: InsertRowAboveOutlined,
        adminOnly: false
    },
    {
        title: 'Сотрудники',
        path: '/staff',
        icon: UsergroupAddOutlined,
        adminOnly: true
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
        icon: PartitionOutlined,
        adminOnly: true
    },
    {
        title: 'Статистика',
        path: '/statistics',
        icon: LineChartOutlined
    }
];

export const settingsLinks: SidebarItemType[] = [
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
