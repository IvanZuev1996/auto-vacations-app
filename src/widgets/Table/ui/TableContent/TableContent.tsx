import { SortByUserVacation } from '@/entities/Vacation';
import { shortMonthsArray as mounthList } from '@/shared/consts/dates';
import { getDaysArray, isWeekend } from '@/shared/lib/helpers/dates';
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
    vacations?: SortByUserVacation[];
}

export const TableContent = (props: TableContentProps) => {
    const { month, year, vacations, view } = props;
    const daysList = getDaysArray({ month, year });

    if (view === 'year') {
        return (
            <VStack max>
                <HStack justify="start" className={cls.days} max>
                    {mounthList.map((item, index) => (
                        <TableItem
                            index={index}
                            monthItem={item}
                            visible
                            key={index}
                        />
                    ))}
                </HStack>
                {vacations?.map((vacationData) => (
                    <HStack
                        justify="start"
                        className={cls.rows}
                        max
                        key={vacationData.userData?._id}
                    >
                        {mounthList.map((_, index) => (
                            <HStack
                                style={{ position: 'relative' }}
                                max
                                key={index}
                            >
                                <HStack style={{ position: 'absolute' }} max>
                                    {vacationData.userVacations?.map(
                                        (vacationItem) => (
                                            <TableVacationYear
                                                item={vacationItem}
                                                index={index}
                                                month={month}
                                                year={year}
                                                key={vacationItem._id}
                                            />
                                        )
                                    )}
                                </HStack>
                                <TableItem index={index} />
                            </HStack>
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
                    <TableItem
                        key={item}
                        index={item}
                        visible
                        weekend={isWeekend({ year, month, day: item })}
                    />
                ))}
            </HStack>
            {vacations?.map((vacationData) => (
                <HStack
                    justify="start"
                    className={cls.rows}
                    max
                    key={vacationData.userData?._id}
                >
                    {daysList.map((index) => (
                        <TableVacationMonth
                            items={vacationData.userVacations}
                            index={index}
                            month={month}
                            year={year}
                            key={index}
                        />
                    ))}
                </HStack>
            ))}
        </VStack>
    );
};
