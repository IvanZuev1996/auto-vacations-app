import { Vacation } from '@/entities/Vacation';
import { Mods, classNames } from '@/shared/lib/helpers/classNames';
import { getDaysByMonth } from '@/shared/lib/helpers/dates';

import cls from '../Table/Table.module.scss';
import { TableItem } from '../TableItem/TableItem';

interface TableVacationYearProps {
    item: Vacation;
    index: number;
    month: number;
    year: number;
}

export const TableVacationMonth = (props: TableVacationYearProps) => {
    const { item, index, month, year } = props;

    // days
    const startDay = new Date(item.start).getDate();
    let endDay = new Date(item.end).getDate();

    // months
    const startMonth = new Date(item.start).getMonth() + 1;
    const endMonth = new Date(item.end).getMonth() + 1;

    // years
    const startYear = new Date(item.start).getFullYear();
    const endYear = new Date(item.end).getFullYear();

    if (startYear !== year) {
        return <TableItem index={index} />;
    }

    const monthDaysCount = getDaysByMonth({
        month: startMonth,
        year: startYear
    });

    const isEnd = index === endDay;
    const isStart = index === startDay;

    const mods: Mods = {
        [cls.end]: isEnd,
        [cls.start]: isStart
    };

    if (startMonth === month) {
        if (startMonth !== endMonth) {
            endDay += monthDaysCount;
        }

        if (index >= startDay && index <= endDay) {
            return <div className={classNames(cls.active, mods)} />;
        }

        return <TableItem index={index} />;
    }

    if (endMonth > month && startMonth < month && startYear === endYear) {
        return <div className={classNames(cls.active)} />;
    }

    if (endMonth === month) {
        if (index <= endDay) {
            return <div className={classNames(cls.active, mods)} />;
        }
    }

    return <TableItem index={index} />;
};
