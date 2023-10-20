import { Button, Popover } from 'antd';

import { User } from '@/entities/User';
import { Vacation } from '@/entities/Vacation';
import { getRouteVacationDetails } from '@/shared/consts/router';
import { classNames, Mods } from '@/shared/lib/helpers/classNames';
import { getDaysByMonth } from '@/shared/lib/helpers/dates';
import { getShortName } from '@/shared/lib/helpers/names';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from '../Table/Table.module.scss';

interface TableVacationMonthProps {
    item: Vacation;
    index: number;
    month: number;
    user?: User;
    year: number;
}

export const TableVacationYear = (props: TableVacationMonthProps) => {
    const { index, item, month, year, user } = props;
    const isOdd = index % 2 === 0;
    const currentMonth = index + 1;

    const popoverContent = (
        <VStack align="start" justify="start" max gap="8">
            <Text weight="bold_weight">
                {item.status === 'pending' ? 'Требуется действие' : 'Одобрено'}
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

    const mods: Mods = {
        [cls.pending]: item.status === 'pending'
    };

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
                <Popover content={popoverContent}>
                    <AppLink
                        to={getRouteVacationDetails(item._id)}
                        className={classNames(cls.active, mods)}
                        style={{ width: `${middlePercent}%` }}
                    />
                </Popover>
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
                <Popover content={popoverContent}>
                    <AppLink
                        to={getRouteVacationDetails(item._id)}
                        className={classNames(cls.active, mods)}
                        style={{ width: '100%' }}
                    />
                </Popover>
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
                <Popover content={popoverContent}>
                    <AppLink
                        to={getRouteVacationDetails(item._id)}
                        className={classNames(cls.active, mods)}
                        style={{ width: `${startPercent}%` }}
                    />
                </Popover>
                <div style={{ width: `${endPercent}%` }} />
            </HStack>
        );
    }

    return null;
};
