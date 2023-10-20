import { Button, Popover } from 'antd';

import { User } from '@/entities/User';
import { Vacation } from '@/entities/Vacation';
import { getRouteVacationDetails } from '@/shared/consts/router';
import { Mods, classNames } from '@/shared/lib/helpers/classNames';
import { getCurrentEnging, getDaysByMonth } from '@/shared/lib/helpers/dates';
import { getShortName } from '@/shared/lib/helpers/names';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from '../Table/Table.module.scss';
import { TableItem } from '../TableItem/TableItem';

interface TableVacationYearProps {
    items: Vacation[];
    user?: User;
    index: number;
    month: number;
    year: number;
}

export const TableVacationMonth = (props: TableVacationYearProps) => {
    const { items, index, month, year, user } = props;

    const getTableItem = (item: Vacation) => {
        const popoverContent = (
            <VStack align="start" justify="start" max gap="8">
                <Text weight="bold_weight">
                    {item.status === 'pending'
                        ? 'Требуется действие'
                        : 'Одобрено'}
                </Text>
                <Text>
                    {getShortName({
                        firstname: user?.firstname || '',
                        lastname: user?.lastname || '',
                        patronymic: user?.patronymic
                    })}
                </Text>
                <Text>{`с ${new Date(item.start).getDate()} по ${new Date(
                    item.end
                ).getDate()} число`}</Text>
                <AppLink to={getRouteVacationDetails(item._id)}>
                    <Button type="link">Подробнее о заявке</Button>
                </AppLink>
            </VStack>
        );

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
            [cls.start]: isStart,
            [cls.pending]: item.status === 'pending'
        };

        if (startMonth === month && startYear === year) {
            if (startMonth !== endMonth) {
                endDay += monthDaysCount;
            }

            if (index >= startDay && index <= endDay) {
                return isStart ? (
                    <Popover content={popoverContent}>
                        <AppLink
                            to={getRouteVacationDetails(item._id)}
                            style={{ zIndex: 40000 }}
                        >
                            <HStack
                                align="center"
                                justify="start"
                                className={classNames(cls.active, mods)}
                            >
                                <Text className={cls.daysCount}>
                                    {getCurrentEnging(endDay - startDay + 1)}
                                </Text>
                            </HStack>
                        </AppLink>
                    </Popover>
                ) : (
                    <Popover content={popoverContent}>
                        <AppLink
                            className={classNames(cls.active, mods)}
                            to={getRouteVacationDetails(item._id)}
                        />
                    </Popover>
                );
            }

            return 0;
        }

        if (endMonth > month && startMonth < month && startYear === endYear) {
            return (
                <Popover content={popoverContent}>
                    <AppLink
                        className={classNames(cls.active, mods)}
                        to={getRouteVacationDetails(item._id)}
                    />
                </Popover>
            );
        }

        if (endYear !== year) {
            return 0;
        }

        if (endMonth === month) {
            if (index <= endDay) {
                return (
                    <Popover content={popoverContent}>
                        <AppLink
                            className={classNames(cls.active, mods)}
                            to={getRouteVacationDetails(item._id)}
                        />
                    </Popover>
                );
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
