import { Vacation } from '@/entities/Vacation';
import { Mods, classNames } from '@/shared/lib/helpers/classNames';
import { getCurrentEnging, getDaysByMonth } from '@/shared/lib/helpers/dates';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from '../Table/Table.module.scss';
import { TableItem } from '../TableItem/TableItem';

interface TableVacationYearProps {
    items: Vacation[];
    index: number;
    month: number;
    year: number;
}

export const TableVacationMonth = (props: TableVacationYearProps) => {
    const { items, index, month, year } = props;

    const getTableItem = (item: Vacation) => {
        // days
        const startDay = new Date(item.start).getUTCDate();
        let endDay = new Date(item.end).getUTCDate();

        // months
        const startMonth = new Date(item.start).getUTCMonth() + 1;
        const endMonth = new Date(item.end).getUTCMonth() + 1;

        // years
        const startYear = new Date(item.start).getUTCFullYear();
        const endYear = new Date(item.end).getUTCFullYear();

        const monthDaysCount = getDaysByMonth({
            month: startMonth,
            year: startYear
        });

        const isEnd = index === endDay && endMonth === month;
        const isStart = index === startDay && startMonth === month;

        const mods: Mods = {
            [cls.end]: isEnd,
            [cls.start]: isStart
        };

        if (startMonth === month && startYear === year) {
            if (startMonth !== endMonth) {
                endDay += monthDaysCount;
            }

            if (index >= startDay && index <= endDay) {
                return isStart ? (
                    <HStack
                        align="center"
                        justify="start"
                        className={classNames(cls.active, mods)}
                    >
                        <Text className={cls.daysCount}>
                            {getCurrentEnging(endDay - startDay + 1)}
                        </Text>
                    </HStack>
                ) : (
                    <div className={classNames(cls.active, mods)} />
                );
            }

            return 0;
        }

        if (endMonth > month && startMonth < month && startYear === endYear) {
            return <div className={classNames(cls.active, mods)} />;
        }

        if (endYear !== year) {
            return 0;
        }

        if (endMonth === month) {
            if (index <= endDay) {
                return <div className={classNames(cls.active, mods)} />;
            }
        }

        return 0;
    };

    const mapTableItems = () => {
        for (let i = 0; i < items.length; i += 1) {
            const result = getTableItem(items[i]);
            if (result !== 0) {
                return result;
            }
        }

        return <TableItem index={index} />;
    };

    return mapTableItems();
};
