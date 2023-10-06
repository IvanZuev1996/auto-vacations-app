import { Tooltip } from 'antd';
import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames';
import { AntdIconType } from '@/shared/types/icon';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';

import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    icon?: AntdIconType;
    collapsed?: boolean;
    title?: string;
    path?: string;
    active?: boolean;
    className?: string;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { className, collapsed, icon, path = '', title, active } = props;

    const mods: Mods = {
        [cls.collapsed]: collapsed,
        [cls.active]: active
    };

    const content = (
        <AppLink to={path} className={classNames(cls.item, mods, [className])}>
            <div className={cls.activeBlink} />
            {icon && <Icon Icon={icon} className={cls.icon} />}
            <p className={cls.title}>{title}</p>
        </AppLink>
    );

    if (collapsed) {
        return (
            <Tooltip placement="right" title={title} arrow>
                {content}
            </Tooltip>
        );
    }

    return content;
});
