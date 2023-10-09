import { memo } from 'react';

import { classNames, Mods } from '@/shared/lib/helpers/classNames';
import { AntdIconType } from '@/shared/types/icon';

import cls from './Icon.module.scss';

interface SidebarProps {
    Icon: AntdIconType;
    size?: number;
    onClick?: () => void;
    clicked?: boolean;
    className?: string;
}

export const Icon = memo((props: SidebarProps) => {
    const { Icon, className, onClick, clicked, size = 20 } = props;

    const mods: Mods = {
        [cls.cliked]: clicked
    };

    return (
        <Icon
            onClick={onClick || undefined}
            className={classNames(cls.Icon, mods, [className])}
            style={{ fontSize: `${size}px` }}
        />
    );
});
