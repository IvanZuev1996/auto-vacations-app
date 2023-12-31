import { AntdIconType } from '@/shared/types/icon';

export interface SidebarItemType {
    icon?: AntdIconType;
    title?: string;
    path?: string;
    adminOnly?: boolean;
    userOnly?: boolean;
}

export interface SidebarSchema {
    isOpen?: boolean;
}
