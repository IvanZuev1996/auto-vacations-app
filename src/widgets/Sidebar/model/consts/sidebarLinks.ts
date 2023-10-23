import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';

import { getRouteHelp } from '@/shared/consts/router';

import { SidebarItemType } from '../types/sidebar';

export const settingsLinks: SidebarItemType[] = [
    {
        title: 'Настройки',
        path: '/settings',
        icon: SettingOutlined
    },
    {
        title: 'Справка',
        path: getRouteHelp(),
        icon: QuestionCircleOutlined
    }
];
