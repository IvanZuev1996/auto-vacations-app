import { Card, Skeleton } from 'antd';
import { MutableRefObject, useRef } from 'react';

import { Vacation } from '@/entities/Vacation';
import { classNames } from '@/shared/lib/helpers/classNames';
import { getCurrentDate } from '@/shared/lib/helpers/dates';
import { getShortName } from '@/shared/lib/helpers/names';
import { HStack, VStack } from '@/shared/ui/Stack';

import { TableView } from '../../model/types/table';
import { TableContent } from '../TableContent/TableContent';

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
    const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
    // const { events } = useDraggable(ref, {
    //     applyRubberBandEffect: true
    // });

    return (
        <Skeleton
            paragraph={{ rows: 7, width: '100%' }}
            active
            loading={isLoading}
            className={cls.skeleton}
        >
            <Card
                bordered={false}
                className={classNames(
                    cls.Card,
                    { [cls.year]: viewType === 'year' },
                    [className]
                )}
                ref={ref}
                // {...events}
            >
                <HStack justify="start" align="start" max>
                    <VStack className={cls.namesColumn}>
                        {vacations?.map(({ user }) => (
                            <div className={cls.name}>
                                {getShortName({
                                    firstname: user.firstname,
                                    lastname: user.lastname,
                                    patronymic: user.patronymic
                                })}
                            </div>
                        ))}
                    </VStack>
                    <TableContent
                        view={viewType}
                        month={month}
                        year={year}
                        vacations={vacations}
                    />
                </HStack>
            </Card>
        </Skeleton>
    );
};
