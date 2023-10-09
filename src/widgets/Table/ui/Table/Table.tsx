import { Card } from 'antd';
import { MutableRefObject, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { Vacation } from '@/entities/Vacation';
import { shortMonthsArray as mounthList } from '@/shared/consts/dates';
import { Mods, classNames } from '@/shared/lib/helpers/classNames';
import {
    getCurrentDate,
    getDaysArray,
    getDaysByMonth
} from '@/shared/lib/helpers/dates';
import { HStack, VStack } from '@/shared/ui/Stack';

import { TableView } from '../../model/types/table';

import cls from './Table.module.scss';

interface TableProps {
    vacations?: Vacation[];
    className?: string;
    year?: number;
    month?: number;
    viewType?: TableView;
    isLoading?: boolean;
}

export const Table = (props: TableProps) => {
    const { currentYear, currentMonth } = getCurrentDate();
    const {
        className,
        vacations,
        isLoading,
        month = currentMonth,
        year = currentYear,
        viewType = 'month'
    } = props;
    const daysList = getDaysArray({ month, year });
    const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true
    });

    const mapMonthList = (item: string, index: number, visible?: boolean) => {
        const isOdd = index % 2 === 0;

        return (
            <div className={classNames(cls.item, { [cls.odd]: isOdd })}>
                {visible && item}
            </div>
        );
    };

    const mapDaysList = (item: number, visible?: boolean) => {
        const isOdd = item % 2 === 0;

        return (
            <div className={classNames(cls.item, { [cls.odd]: isOdd })}>
                {visible && item}
            </div>
        );
    };

    const mapActiveListByDay = (item: Vacation, index: number) => {
        const startVacationDay = new Date(item.start).getDate();
        let endVacationDay = new Date(item.end).getDate();
        const startVacationMonth = new Date(item.start).getMonth() + 1;
        const endVacationMonth = new Date(item.end).getMonth() + 1;
        const startVacationYear = new Date(item.start).getFullYear();
        const endVacationYear = new Date(item.end).getFullYear();

        if (startVacationYear !== year) {
            return mapDaysList(index);
        }

        const monthDaysCount = getDaysByMonth({
            month: startVacationMonth,
            year: startVacationYear
        });

        if (startVacationMonth === month) {
            if (startVacationMonth !== endVacationMonth) {
                endVacationDay += monthDaysCount;
            }

            const isEnd = index === endVacationDay;
            const isStart = index === startVacationDay;

            const mods: Mods = {
                [cls.end]: isEnd,
                [cls.start]: isStart
            };

            if (index >= startVacationDay && index <= endVacationDay) {
                return <div className={classNames(cls.active, mods)} />;
            }

            return mapDaysList(index);
        }

        if (
            endVacationMonth > month &&
            startVacationMonth < month &&
            startVacationYear === endVacationYear
        ) {
            return <div className={classNames(cls.active)} />;
        }

        if (endVacationMonth === month) {
            if (index <= endVacationDay) {
                console.log(startVacationMonth, endVacationMonth);
                return <div className={classNames(cls.active)} />;
            }
        }

        return mapDaysList(index);
    };

    const mapActiveListByMonth = (item: Vacation, index: number) => {
        const startVacationDay = new Date(item.start).getDate();
        let endVacationDay = new Date(item.end).getDate();
        const startVacationMonth = new Date(item.start).getMonth() + 1;
        const endVacationMonth = new Date(item.end).getMonth() + 1;
        const startVacationYear = new Date(item.start).getFullYear();
        const endVacationYear = new Date(item.end).getFullYear();

        if (startVacationYear !== year && endVacationYear !== year) {
            return mapMonthList('', index);
        }

        let monthDaysCount = getDaysByMonth({
            month: startVacationMonth,
            year: startVacationYear
        });

        if (startVacationMonth === index + 1) {
            if (endVacationMonth !== startVacationMonth) {
                endVacationDay += monthDaysCount;
            }

            const middlePercent = Math.ceil(
                ((endVacationDay - startVacationDay) / monthDaysCount) * 100
            );

            const startPercent =
                startVacationDay !== 1
                    ? Math.floor((startVacationDay / monthDaysCount) * 100)
                    : 0;

            const endPercent =
                startVacationDay !== monthDaysCount
                    ? Math.ceil(
                        ((monthDaysCount - endVacationDay) / monthDaysCount) *
                              100
                    )
                    : 0;

            const isOdd = index % 2 === 0;

            return (
                <HStack className={classNames(cls.item, { [cls.odd]: isOdd })}>
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
            endVacationMonth > index + 1 &&
            startVacationMonth < index + 1 &&
            startVacationYear === endVacationYear
        ) {
            const isOdd = index % 2 === 0;

            return (
                <HStack className={classNames(cls.item, { [cls.odd]: isOdd })}>
                    <div className={cls.active} style={{ width: '100%' }} />
                </HStack>
            );
        }

        if (endVacationMonth === index + 1) {
            monthDaysCount = getDaysByMonth({
                month: endVacationMonth,
                year: endVacationYear
            });

            const startPercent = Math.ceil(
                (endVacationDay / monthDaysCount) * 100
            );

            const endPercent =
                endVacationDay !== monthDaysCount
                    ? Math.ceil(
                        ((monthDaysCount - endVacationDay) / monthDaysCount) *
                              100
                    )
                    : 0;

            const isOdd = index % 2 === 0;

            return (
                <HStack className={classNames(cls.item, { [cls.odd]: isOdd })}>
                    <div
                        className={cls.active}
                        style={{ width: `${startPercent}%` }}
                    />
                    <div style={{ width: `${endPercent}%` }} />
                </HStack>
            );
        }

        return mapMonthList('', index);
    };

    if (viewType === 'year') {
        return (
            <Card
                bordered={false}
                className={classNames(cls.Card, {}, [className, cls.year])}
                ref={ref}
                {...events}
            >
                <HStack justify="start" align="start" max>
                    <VStack className={cls.namesColumn}>
                        {vacations?.map(() => (
                            <div className={cls.name}>Иванов И.И.</div>
                        ))}
                    </VStack>
                    <VStack max>
                        <HStack justify="start" className={cls.days} max>
                            {mounthList.map((item, index) =>
                                mapMonthList(item, index, true)
                            )}
                        </HStack>
                        {vacations?.map((item) => (
                            <HStack justify="start" className={cls.rows} max>
                                {mounthList.map((_, index) =>
                                    mapActiveListByMonth(item, index)
                                )}
                            </HStack>
                        ))}
                    </VStack>
                </HStack>
            </Card>
        );
    }

    return (
        <Card
            bordered={false}
            className={classNames(cls.Card, {}, [className])}
            ref={ref}
            {...events}
        >
            <HStack justify="start" align="start" max>
                <VStack className={cls.namesColumn}>
                    {vacations?.map((vacation) => (
                        <div className={cls.name}>
                            {`${vacation.user.firstname} ${
                                vacation.user.lastname[0]
                            }.${
                                vacation.user?.patronymic &&
                                vacation.user?.patronymic[0]
                            } `}
                        </div>
                    ))}
                </VStack>
                <VStack max>
                    <HStack justify="start" className={cls.days} max>
                        {daysList.map((item) => mapDaysList(item, true))}
                    </HStack>
                    {vacations?.map((item) => (
                        <HStack justify="start" className={cls.rows} max>
                            {daysList.map((index) =>
                                mapActiveListByDay(item, index)
                            )}
                        </HStack>
                    ))}
                </VStack>
            </HStack>
        </Card>
    );
};

export default Table;
