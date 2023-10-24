/* eslint-disable babun4ek-fsd-plugin/layer-imports-checker */
import { Select, DatePicker, Input, Skeleton } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

import { getUserAuthData, useUserVacations } from '@/entities/User';
import { Vacation } from '@/entities/Vacation';
import { useVacation } from '@/features/ApproveVacationModal';
import { vacationTypeOptions } from '@/shared/consts/vacationTypeOptions';
import { getDatesDiff } from '@/shared/lib/helpers/dates';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import {
    getEditVacationModalEndDate,
    getEditVacationModalStartDate
} from '../../model/selectors/editVacationModal';

import cls from './EditVacationInputs.module.scss';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

interface EditVacationInputsProps {
    daysCount?: string;
    onChangeDates?: (dayjsDates: any, dates: [string, string]) => void;
}

export const EditVacationInputs = (props: EditVacationInputsProps) => {
    const { onChangeDates, daysCount } = props;
    const { id = '' } = useParams<{ id: string }>();
    const [fetchUserVacations, { data, isLoading }] = useUserVacations();
    const authData = useSelector(getUserAuthData);
    const { data: vacationData } = useVacation({ id });
    const startDate = useSelector(getEditVacationModalStartDate);
    const endDate = useSelector(getEditVacationModalEndDate);

    const defaultStartDate = vacationData?.start;
    const defaultEndDate = vacationData?.end;

    const defaultDaysCount = getDatesDiff(defaultStartDate, defaultEndDate);

    const onChooseStartDate = (dates: any, stringDates: [string, string]) => {
        if (!startDate) {
            onChangeDates?.(dates, stringDates);
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserVacations({ id: authData?._id || '' });
        };

        fetchData();
    }, [authData?._id, fetchUserVacations]);

    const isInExistVacation = (current: dayjs.Dayjs) => {
        let isInVacation: boolean = false;
        const userVacationDates: dayjs.Dayjs[] = [];

        if (data) {
            isInVacation = data.some((vacation: Vacation) => {
                const vacationStartDate = dayjs(vacation.start);
                const vacationEndDate = dayjs(vacation.end).add(1, 'day');

                userVacationDates.push(vacationStartDate);

                return (
                    current.isSameOrAfter(vacationStartDate) &&
                    current.isSameOrBefore(vacationEndDate)
                );
            });
        }

        return { isInVacation, userVacationDates };
    };

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
        if (!current) {
            return false;
        }

        if (current.isBefore(dayjs().endOf('day'))) {
            return true;
        }

        if (current.year() === dayjs().year()) {
            return true;
        }

        const { isInVacation, userVacationDates } = isInExistVacation(current);

        if (isInVacation) {
            return true;
        }

        let isBlocked: boolean = false;

        for (let i = 0; i < userVacationDates.length; i += 1) {
            const vacation = userVacationDates[i];

            if (
                current.isAfter(vacation) &&
                vacation.isAfter(startDate) &&
                startDate
            ) {
                isBlocked = true;
                break;
            }
        }

        if (isBlocked) {
            return true;
        }

        return false;
    };

    if (isLoading) {
        return (
            <HStack max>
                <Skeleton.Input active className={cls.skeleton} block />
            </HStack>
        );
    }

    return (
        <HStack align="end" gap="32" max>
            <VStack gap="4" max className={cls.inputItem}>
                <Text>Тип отпуска</Text>
                <Select
                    defaultValue="1"
                    options={vacationTypeOptions}
                    size="middle"
                    className={cls.select}
                    disabled
                />
            </VStack>
            <VStack gap="4" max className={cls.dateInputItem}>
                <Text>Даты</Text>
                <RangePicker
                    value={[
                        dayjs(startDate || defaultStartDate),
                        dayjs(endDate || defaultEndDate)
                    ]}
                    defaultValue={
                        defaultStartDate
                            ? [dayjs(defaultStartDate), dayjs(defaultEndDate)]
                            : undefined
                    }
                    disabledDate={disabledDate}
                    onChange={onChangeDates}
                    onCalendarChange={onChooseStartDate}
                    className={cls.datePicker}
                />
            </VStack>

            <VStack gap="4" max className={cls.daysCountInputItem}>
                <Text>Кол-во дней</Text>
                <Input
                    className={cls.input}
                    value={daysCount || defaultDaysCount}
                />
            </VStack>
        </HStack>
    );
};
