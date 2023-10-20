import { QuestionCircleOutlined, SettingOutlined } from '@ant-design/icons';

import { SidebarItemType } from '../types/sidebar';

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
