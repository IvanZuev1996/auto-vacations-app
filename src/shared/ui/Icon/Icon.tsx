import { memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames';
import { AntdIconType } from '@/shared/types/icon';

import cls from './Icon.module.scss';

interface SidebarProps {
    Icon: AntdIconType;
    size?: number;
    onClick?: () => void;
    className?: string;
}

export const Icon = memo((props: SidebarProps) => {
    const { Icon, className, onClick, size = 20 } = props;

    return (
        <Icon
            onClick={onClick || undefined}
            className={classNames(cls.Icon, {}, [className])}
            style={{ fontSize: `${size}px` }}
        />
    );
});
