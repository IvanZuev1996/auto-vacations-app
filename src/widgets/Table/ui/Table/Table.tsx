import { Card } from 'antd';
import { MutableRefObject, useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { Division } from '@/entities/Division';
import { SortByUserVacation } from '@/entities/Vacation';
import { classNames } from '@/shared/lib/helpers/classNames';
import { getCurrentDate } from '@/shared/lib/helpers/dates';
import { getShortName } from '@/shared/lib/helpers/names';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { TableView } from '../../model/types/table';
import { TableContent } from '../TableContent/TableContent';

import cls from './Table.module.scss';

interface TableProps {
    vacations: SortByUserVacation[];
    className?: string;
    year?: number;
    month?: number;
    viewType?: TableView;
    isLoading?: boolean;
    division?: Division;
}

export const Table = (props: TableProps) => {
    const { currentYear, currentMonth } = getCurrentDate();
    const {
        className,
        vacations,
        isLoading,
        division,
        month = currentMonth,
        year = currentYear,
        viewType = 'month'
    } = props;
    const ref = useRef<HTMLDivElement>() as MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true
    });

    return (
        <>
            {division && (
                <Card className={cls.divisions}>
                    <HStack
                        align="center"
                        gap="8"
                        max
                        className={cls.divisions}
                    >
                        <Text weight="bold_weight">Подразделение #</Text>
                        <Text weight="bold_weight">
                            {division.divisionNumber}
                        </Text>
                    </HStack>
                </Card>
            )}
            <Card
                bordered={false}
                className={classNames(
                    cls.Card,
                    { [cls.year]: viewType === 'year' },
                    [className]
                )}
                ref={ref}
                {...events}
            >
                <HStack justify="start" align="start" max>
                    <VStack className={cls.namesColumn}>
                        {vacations?.map(({ userData }) => (
                            <div className={cls.name} key={userData?._id}>
                                {getShortName({
                                    firstname: userData!.firstname,
                                    lastname: userData!.lastname,
                                    patronymic: userData?.patronymic
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
        </>
    );
};
