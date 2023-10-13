import { Tooltip } from 'antd';

import { Mods, classNames } from '@/shared/lib/helpers/classNames';

import cls from '../Table/Table.module.scss';

interface TableItemProps {
    monthItem?: string;
    index?: number;
    visible?: boolean;
    active?: boolean;
    weekend?: boolean;
    className?: string;
}

export const TableItem = (props: TableItemProps) => {
    const { visible, monthItem, active, className, weekend, index = 0 } = props;
    const isOdd = index % 2 === 0;

    if (active) {
        return <div className={classNames(cls.active, {}, [className])} />;
    }

    const visibleMods: Mods = {
        [cls.odd]: isOdd,
        [cls.weekend]: weekend
    };

    if (visible) {
        return weekend ? (
            <Tooltip
                title="Выходной"
                className={classNames(cls.item, visibleMods, [cls.visible])}
            >
                {monthItem || index}
            </Tooltip>
        ) : (
            <div className={classNames(cls.item, visibleMods, [cls.visible])}>
                {monthItem || index}
            </div>
        );
    }

    return (
        <div
            className={classNames(cls.item, {
                [cls.odd]: isOdd,
                [cls.weekend]: weekend
            })}
        />
    );
};
