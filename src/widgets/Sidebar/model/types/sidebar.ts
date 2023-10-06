import { AntdIconType } from '@/shared/types/icon';

export interface SidebarItemType {
    icon?: AntdIconType;
    title?: string;
    path?: string;
}

export interface SidebarSchema {
    isOpen?: boolean;
}
