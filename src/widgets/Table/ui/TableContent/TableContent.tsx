import { Vacation } from '@/entities/Vacation';
import { shortMonthsArray as mounthList } from '@/shared/consts/dates';
import { getDaysArray } from '@/shared/lib/helpers/dates';
import { HStack, VStack } from '@/shared/ui/Stack';

import { TableView } from '../../model/types/table';
import cls from '../Table/Table.module.scss';
import { TableItem } from '../TableItem/TableItem';
import { TableVacationMonth } from '../TableVacationMonth/TableVacationMonth';
import { TableVacationYear } from '../TableVacationYear/TableVacationYear';

interface TableContentProps {
    month: number;
    year: number;
    view: TableView;
    vacations?: Vacation[];
}

export const TableContent = (props: TableContentProps) => {
    const { month, year, vacations, view } = props;
    const daysList = getDaysArray({ month, year });

    if (view === 'year') {
        return (
            <VStack max>
                <HStack justify="start" className={cls.days} max>
                    {mounthList.map((item, index) => (
                        <TableItem index={index} monthItem={item} visible />
                    ))}
                </HStack>
                {vacations?.map((item) => (
                    <HStack justify="start" className={cls.rows} max>
                        {mounthList.map((_, index) => (
                            <TableVacationYear
                                item={item}
                                index={index}
                                month={month}
                                year={year}
                            />
                        ))}
                    </HStack>
                ))}
            </VStack>
        );
    }

    return (
        <VStack max>
            <HStack justify="start" className={cls.days} max>
                {daysList.map((item) => (
                    <TableItem index={item} visible />
                ))}
            </HStack>
            {vacations?.map((item) => (
                <HStack justify="start" className={cls.rows} max>
                    {daysList.map((index) => (
                        <TableVacationMonth
                            item={item}
                            index={index}
                            month={month}
                            year={year}
                        />
                    ))}
                </HStack>
            ))}
        </VStack>
    );
};
