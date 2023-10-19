import { Button, DatePicker, Input, Result, Select, Spin } from 'antd';
import { RangePickerProps } from 'antd/es/date-picker';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';

import { User } from '@/entities/User';
import { classNames } from '@/shared/lib/helpers/classNames';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import {
    getAddVacationModalEndDate,
    getAddVacationModalStartDate
} from '../../model/selectors/addVacationModal';
import cls from '../AddVacationForm/AddVacationForm.module.scss';

const { RangePicker } = DatePicker;

const disabledDate: RangePickerProps['disabledDate'] = (current) =>
    (current && current < dayjs().endOf('day')) ||
    current.year() === dayjs().year();

interface AddVacationFromContentProps {
    userData?: User;
    onChangeType?: (value: string) => void;
    onChangeDates?: (dayjsDates: any, dates: [string, string]) => void;
    onCancel?: () => void;
    onSuccess?: () => void;
    isApprove?: boolean;
    daysCount?: string;
    isSuccess?: boolean;
    isLoading?: boolean;
    error?: string;
    className?: string;
}

export const AddVacationFromContent = (props: AddVacationFromContentProps) => {
    const {
        className,
        userData,
        onChangeType,
        onChangeDates,
        daysCount,
        isApprove,
        onCancel,
        isSuccess,
        error,
        isLoading,
        onSuccess
    } = props;
    const endDate = useSelector(getAddVacationModalEndDate);
    const startDate = useSelector(getAddVacationModalStartDate);

    if (isSuccess) {
        return <Result status="success" title="Заявка отправлена!" />;
    }

    if (error) {
        return (
            <Result
                status="error"
                title="Что-то пошло не так"
                subTitle="Попробуйте снова"
                extra={[
                    <Button type="primary" key="console">
                        Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>
                ]}
            />
        );
    }

    if (isLoading) {
        return (
            <VStack justify="center" align="center" max className={cls.loading}>
                <Spin size="large" />
            </VStack>
        );
    }

    return (
        <VStack
            gap="16"
            className={classNames(cls.formWrap, {}, [className])}
            max
        >
            <Text size="L" weight="bold_weight" className={cls.mainText}>
                Заявка на отпуск
            </Text>
            <Text>Баланс:</Text>
            <HStack gap="32" justify="start" align="start" max>
                <VStack align="start" gap="16" max>
                    <VStack gap="4">
                        <HStack gap="16" align="center" max>
                            <Text>Остаток с 2022г:</Text>
                            <Text>{userData?.prevBalance || 0} дней</Text>
                        </HStack>

                        <HStack gap="16" align="center" max>
                            <Text>Право на 2023г:</Text>
                            <Text>28 дней</Text>
                        </HStack>

                        <HStack gap="16" align="center" max>
                            <Text>Израсходовано:</Text>
                            <Text>0 дней</Text>
                        </HStack>
                    </VStack>
                    <HStack gap="16" align="center" max>
                        <Text weight="bold_weight">Итоговый баланс:</Text>
                        <Text>28 дней</Text>
                    </HStack>
                </VStack>
                <VStack gap="4" max>
                    <HStack gap="16" align="center" max>
                        <Text>ФИО:</Text>
                        <Text>{`${userData?.lastname} ${userData?.firstname} ${userData?.patronymic}`}</Text>
                    </HStack>
                    <HStack gap="16" align="center" max>
                        <Text>Должность:</Text>
                        <Text>{userData?.post}</Text>
                    </HStack>
                </VStack>
            </HStack>
            <HStack align="end" gap="32" max className={cls.inputWrap}>
                <VStack gap="4" max className={cls.inputItem}>
                    <Text>Тип отпуска</Text>
                    <Select
                        defaultValue="1"
                        options={[
                            {
                                value: '1',
                                label: 'Ежегодный оплачиваемый'
                            },
                            {
                                value: '2',
                                label: 'Донорский'
                            },
                            {
                                value: '3',
                                label: 'Без сохранения ЗП'
                            },
                            {
                                value: '4',
                                label: 'По беременности и родам'
                            },
                            {
                                value: '5',
                                label: 'По уходу за ребенком'
                            }
                        ]}
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
                        defaultValue={[
                            dayjs('2024-01-01', 'YYYY-MM-DD'),
                            dayjs('2024-01-01', 'YYYY-MM-DD')
                        ]}
                        disabledDate={disabledDate}
                        onChange={onChangeDates}
                        className={cls.datePicker}
                    />
                </VStack>

                <VStack gap="4" max className={cls.daysCountInputItem}>
                    <Text>Кол-во дней</Text>
                    <Input className={cls.input} value={daysCount} />
                </VStack>
            </HStack>
            <Line />
            <HStack gap="32" justify="start" align="start" max>
                <VStack align="start" gap="16" max>
                    <VStack gap="4">
                        <HStack gap="16" align="center" max>
                            <Text>Тип отпуска:</Text>
                            <Text>Оплачиваемый</Text>
                        </HStack>

                        <HStack gap="16" align="center" max>
                            <Text>Даты:</Text>
                            <Text>{`${startDate} - ${endDate}`}</Text>
                        </HStack>
                    </VStack>
                </VStack>
                <VStack gap="4" max>
                    <HStack gap="16" align="center" max>
                        <Text>Текущий баланс:</Text>
                        <Text>{userData?.balance}</Text>
                    </HStack>
                    <HStack gap="16" align="center" max>
                        <Text>Кол-во дней планируемого отпуска:</Text>
                        <Text>{daysCount}</Text>
                    </HStack>
                    <HStack
                        gap="16"
                        align="center"
                        max
                        className={cls.finalBalance}
                    >
                        <Text weight="bold_weight">Баланс после отпуска:</Text>
                        <Text>
                            {userData?.balance &&
                                userData.balance - Number(daysCount)}
                        </Text>
                    </HStack>
                </VStack>
            </HStack>
            <HStack
                justify="end"
                align="center"
                max
                gap="16"
                className={cls.btns}
            >
                <Button type="text" onClick={onCancel}>
                    Отменить
                </Button>
                <Button
                    type="primary"
                    onClick={onSuccess}
                    disabled={!isApprove}
                >
                    + Запланировать отпуск
                </Button>
            </HStack>
        </VStack>
    );
};
