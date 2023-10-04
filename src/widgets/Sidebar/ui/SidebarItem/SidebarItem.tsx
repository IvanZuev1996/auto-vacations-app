import { Tooltip } from 'antd';
import { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames';
import { AntdIconType } from '@/shared/types/icon';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';

import cls from './SidebarItem.module.scss';

interface SidebarItemProps {
    icon?: AntdIconType;
    collapsed?: boolean;
    title?: string;
    path?: string;
    className?: string;
}

export const SidebarItem = memo((props: SidebarItemProps) => {
    const { className, collapsed, icon, path = '', title } = props;

    const content = (
        <AppLink
            to={path}
            className={classNames(cls.item, { [cls.collapsed]: collapsed }, [
                className
            ])}
        >
            {icon && <Icon Icon={icon} />}

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
