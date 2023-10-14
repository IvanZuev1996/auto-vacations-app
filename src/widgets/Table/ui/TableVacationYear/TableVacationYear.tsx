import { Vacation } from '@/entities/Vacation';
import { classNames } from '@/shared/lib/helpers/classNames';
import { getDaysByMonth } from '@/shared/lib/helpers/dates';
import { HStack } from '@/shared/ui/Stack';

import cls from '../Table/Table.module.scss';

interface TableVacationMonthProps {
    item: Vacation;
    index: number;
    month: number;
    year: number;
}

export const TableVacationYear = (props: TableVacationMonthProps) => {
    const { index, item, month, year } = props;
    const isOdd = index % 2 === 0;
    const currentMonth = index + 1;

    // days
    const startDay = new Date(item.start).getDate();
    let endDay = new Date(item.end).getDate();

    // months
    const startMonth = new Date(item.start).getMonth() + 1;
    const endMonth = new Date(item.end).getMonth() + 1;

    // years
    const startYear = new Date(item.start).getFullYear();
    const endYear = new Date(item.end).getFullYear();

    let monthDaysCount = getDaysByMonth({
        month: startMonth,
        year: startYear
    });

    if (startMonth === currentMonth && startYear === year) {
        if (endMonth !== startMonth) {
            endDay += monthDaysCount;
        }

        const middlePercent = Math.ceil(
            ((endDay - startDay) / monthDaysCount) * 100
        );

        const startPercent =
            startDay !== 1 ? Math.floor((startDay / monthDaysCount) * 100) : 0;

        const endPercent =
            startDay !== monthDaysCount
                ? Math.ceil(((monthDaysCount - endDay) / monthDaysCount) * 100)
                : 0;

        return (
            <HStack
                className={classNames(cls.item, { [cls.odd]: isOdd }, [
                    cls.vacationsOnYearWrapper
                ])}
            >
                <div style={{ width: `${startPercent}%` }} />
                <div
                    className={cls.active}
                    style={{ width: `${middlePercent}%` }}
                />
                <div style={{ width: `${endPercent}%` }} />
            </HStack>
        );
    }

    if (
        endMonth > currentMonth &&
        startMonth < currentMonth &&
        startYear === endYear
    ) {
        return (
            <HStack
                className={classNames(cls.item, { [cls.odd]: isOdd }, [
                    cls.vacationsOnYearWrapper
                ])}
            >
                <div
                    className={classNames(cls.active)}
                    style={{ width: '100%' }}
                />
            </HStack>
        );
    }

    if (endMonth === currentMonth && endYear === year) {
        monthDaysCount = getDaysByMonth({
            month: endMonth,
            year: endYear
        });

        const startPercent = Math.ceil((endDay / monthDaysCount) * 100);

        const endPercent =
            endDay !== monthDaysCount
                ? Math.ceil(((monthDaysCount - endDay) / monthDaysCount) * 100)
                : 0;

        return (
            <HStack
                className={classNames(cls.item, { [cls.odd]: isOdd }, [
                    cls.vacationsOnYearWrapper
                ])}
            >
                <div
                    className={cls.active}
                    style={{ width: `${startPercent}%` }}
                />
                <div style={{ width: `${endPercent}%` }} />
            </HStack>
        );
    }

    return null;
};
