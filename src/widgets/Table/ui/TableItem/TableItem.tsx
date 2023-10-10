import { classNames } from '@/shared/lib/helpers/classNames';

import cls from '../Table/Table.module.scss';

interface TableItemProps {
    monthItem?: string;
    index?: number;
    visible?: boolean;
    active?: boolean;
    className?: string;
}

export const TableItem = (props: TableItemProps) => {
    const { visible, monthItem, active, className, index = 0 } = props;
    const isOdd = index % 2 === 0;

    if (active) {
        return <div className={classNames(cls.active, {}, [className])} />;
    }

    if (visible) {
        return (
            <div className={classNames(cls.item, { [cls.odd]: isOdd })}>
                {monthItem || index}
            </div>
        );
    }

    return <div className={classNames(cls.item, { [cls.odd]: isOdd })} />;
};
