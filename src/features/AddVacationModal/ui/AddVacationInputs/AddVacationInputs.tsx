import { CloseCircleFilled } from '@ant-design/icons';
import { Select, DatePicker, Input, Button, Skeleton } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import isBetween from 'dayjs/plugin/isBetween';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData, useUserVacations } from '@/entities/User';
import { Vacation } from '@/entities/Vacation';
import { vacationTypeOptions } from '@/shared/consts/vacationTypeOptions';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import {
    getAddVacationModalEndDate,
    getAddVacationModalStartDate
} from '../../model/selectors/addVacationModal';

import cls from './AddVacationInputs.module.scss';

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);

const { RangePicker } = DatePicker;

interface AddVacationInputsProps {
    onChangeType?: (value: string) => void;
    onChangeDates?: (dayjsDates: any, dates: [string, string]) => void;
    daysCount?: string;
    onRemoveInputs?: () => void;
    index: number;
}

export const AddVacationInputs = (props: AddVacationInputsProps) => {
    const { daysCount, onChangeDates, onChangeType, onRemoveInputs, index } =
        props;
    const [fetchUserVacations, { data, isLoading }] = useUserVacations();
    const authData = useSelector(getUserAuthData);
    const endDate = useSelector(getAddVacationModalEndDate);
    const startDate = useSelector(getAddVacationModalStartDate);

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
        return <Skeleton.Input active style={{ width: '100%' }} />;
    }

    return (
        <HStack align="end" gap="32" max>
            <VStack gap="4" max className={cls.inputItem}>
                <Text>Тип отпуска</Text>
                <Select
                    defaultValue="1"
                    options={vacationTypeOptions}
                    size="middle"
                    onChange={onChangeType}
                    className={cls.select}
                />
            </VStack>
            <VStack gap="4" max className={cls.dateInputItem}>
                <Text>Даты</Text>
                <RangePicker
                    value={
                        startDate
                            ? [dayjs(startDate), dayjs(endDate)]
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
                <Input className={cls.input} value={daysCount} />
            </VStack>
            {index !== 0 && (
                <Button
                    type="text"
                    danger
                    icon={<CloseCircleFilled />}
                    onClick={onRemoveInputs}
                />
            )}
        </HStack>
    );
};
