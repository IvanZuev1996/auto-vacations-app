import {
    Button,
    Checkbox,
    DatePicker,
    Input,
    Result,
    Select,
    Spin
} from 'antd';
import dayjs from 'dayjs';
import { ChangeEvent, useEffect, useState } from 'react';

import { DivisionSelect, useDivisions } from '@/entities/Division';
import { classNames } from '@/shared/lib/helpers/classNames';
import { getNormalizedDate } from '@/shared/lib/helpers/dates/getNormalizedDate';
import { Line } from '@/shared/ui/Line';
import { NumericInput } from '@/shared/ui/NumericInput/NumericInput';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { NewUserData } from '../../../model/types/AddEmployeeModalSchema';
import cls from '../AddEmployeeForm.module.scss';

import type { CheckboxChangeEvent } from 'antd/es/checkbox';

interface AddEmployeeFormContentProps {
    data?: NewUserData;
    isLoading?: boolean;
    isSuccess?: boolean;
    error?: string;
    onCancel?: () => void;
    onSuccess?: () => void;
    onChangeFirstname?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeLastName?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangePatronymic?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangePost?: (e: ChangeEvent<HTMLInputElement>) => void;
    onChangeDivision?: (divisionId: string) => void;
    onChangeBalance: (value: string) => void;
    onChangeIntersections?: (value: string[]) => void;
    onChangeStartWork?: (_: any, date: string) => void;
    className?: string;
}

export const AddEmployeeFormContent = (props: AddEmployeeFormContentProps) => {
    const {
        className,
        data,
        error,
        isLoading,
        isSuccess,
        onCancel,
        onSuccess,
        onChangeBalance,
        onChangeDivision,
        onChangeFirstname,
        onChangeIntersections,
        onChangeLastName,
        onChangePatronymic,
        onChangePost,
        onChangeStartWork
    } = props;
    const { data: divisions } = useDivisions();
    const [isApprove, setIsApprove] = useState<boolean>(false);
    const [checkboxState, setCheckboxState] = useState<boolean>(true);
    const choosenDivison = divisions?.find(
        (item) => item._id === data?.division
    );

    const onChangeCheckbox = (e: CheckboxChangeEvent) => {
        setCheckboxState(e.target.checked);
    };

    useEffect(() => {
        const isComplete =
            data &&
            data.firstname &&
            data.lastname &&
            data.division &&
            data.post;

        setIsApprove(Boolean(isComplete));
    }, [data]);

    if (isSuccess) {
        return (
            <Result status="success" title="Пользователь добавлен успешно!">
                <Text size="M">Данные для входа в аккаунт:</Text>
                <VStack gap="4" style={{ marginTop: 12, marginBottom: 12 }}>
                    <HStack gap="12">
                        <Text size="M" weight="bold_weight">
                            Логин:
                        </Text>
                        <Text size="M">{data?.auth.username}</Text>
                    </HStack>
                    <HStack gap="12">
                        <Text size="M" weight="bold_weight">
                            Пароль:
                        </Text>
                        <Text size="M">{data?.auth.testPassword}</Text>
                    </HStack>
                </VStack>
                <HStack
                    align="center"
                    justify="end"
                    max
                    gap="16"
                    style={{ marginLeft: 'auto' }}
                >
                    <Button key="buy" type="text">
                        Закрыть
                    </Button>
                    <Button type="primary" key="console">
                        Отправить
                    </Button>
                </HStack>
            </Result>
        );
    }

    if (error) {
        return (
            <Result
                status="error"
                title="Что-то пошло не так"
                subTitle="Попробуйте снова"
                extra={[
                    <Button type="primary" key="console">
                        Отмена
                    </Button>,
                    <Button key="buy">Вернуться на главную</Button>
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
            justify="center"
            max
            className={classNames(cls.formWrap, {}, [className])}
            gap="32"
        >
            <Text size="L" weight="bold_weight">
                Новый сотрудник
            </Text>
            <HStack align="start" gap="32" className={cls.inputsWrap}>
                <VStack gap="16" className={cls.inputsArea}>
                    <HStack gap="12" max>
                        <VStack gap="8" max>
                            <Text>Фамилия</Text>
                            <Input
                                placeholder="Иванов"
                                value={data?.lastname}
                                onChange={onChangeLastName}
                                className={cls.input}
                            />
                        </VStack>
                        <VStack gap="8" max>
                            <Text>Имя</Text>
                            <Input
                                placeholder="Иван"
                                value={data?.firstname}
                                onChange={onChangeFirstname}
                                className={cls.input}
                            />
                        </VStack>
                        <VStack gap="8" max>
                            <Text>Отчество</Text>
                            <Input
                                placeholder="Иванович"
                                value={data?.patronymic}
                                onChange={onChangePatronymic}
                                className={cls.input}
                            />
                        </VStack>
                    </HStack>
                    <HStack gap="16" align="center" max>
                        <VStack gap="8" max>
                            <Text>Должность</Text>
                            <Input
                                placeholder="Юрист"
                                value={data?.post}
                                onChange={onChangePost}
                            />
                        </VStack>
                        <VStack max gap="8">
                            <Text>Дата начала работы</Text>
                            <DatePicker
                                className={cls.datePicker}
                                value={dayjs(
                                    getNormalizedDate(
                                        data?.startWork || new Date()
                                    )
                                )}
                                onChange={onChangeStartWork}
                            />
                        </VStack>
                    </HStack>
                    <VStack
                        style={{ marginTop: 15 }}
                        justify="center"
                        gap="8"
                        max
                    >
                        <HStack align="center" max>
                            <Text max>На кого пишется заявление на отпуск</Text>
                            <Checkbox
                                style={{ width: '300px' }}
                                onChange={onChangeCheckbox}
                                checked={checkboxState}
                            >
                                На меня
                            </Checkbox>
                        </HStack>
                        <Select
                            className={cls.selectDivision}
                            disabled={checkboxState}
                            size="middle"
                            value={data?.intersections}
                            onChange={onChangeIntersections}
                            options={[
                                {
                                    value: 'Сотрудник 1',
                                    label: 'Сотрудник 1'
                                },
                                {
                                    value: 'Сотрудник 2',
                                    label: 'Сотрудник 2'
                                },
                                {
                                    value: 'Сотрудник 3',
                                    label: 'Сотрудник 3'
                                }
                            ]}
                            allowClear
                            style={{ width: '100%' }}
                            placeholder="Выберете сотрудника"
                        />
                    </VStack>
                </VStack>
                <VStack gap="16" className={cls.inputsArea}>
                    <VStack gap="8" max>
                        <Text>Подразделение</Text>
                        <DivisionSelect
                            onChangeDivision={onChangeDivision}
                            value={choosenDivison?.name}
                            style={{ width: '100%' }}
                        />
                    </VStack>
                    <HStack gap="16" align="center">
                        <VStack gap="8">
                            <Text>Отпускные дни с прошлого года</Text>
                            <NumericInput
                                value={String(data?.balance)}
                                onChange={onChangeBalance}
                            />
                        </VStack>
                    </HStack>
                </VStack>
            </HStack>
            <Line height={2} />
            <Text>Информация о сотруднике:</Text>
            <HStack align="center" gap="32" max>
                <VStack gap="8" max>
                    <HStack align="center" gap="12">
                        <Text weight="bold_weight">ФИО:</Text>
                        <Text>{`${data?.lastname} ${data?.firstname} ${data?.patronymic}`}</Text>
                    </HStack>
                    <HStack align="center" gap="12">
                        <Text weight="bold_weight">Должность:</Text>
                        <Text>{data?.post}</Text>
                    </HStack>
                    <HStack align="center" gap="12">
                        <Text weight="bold_weight">Отпускные дни:</Text>
                        <Text>{data?.balance || 0}</Text>
                    </HStack>
                </VStack>
                <VStack gap="8" max>
                    <HStack align="center" gap="12" max>
                        <Text weight="bold_weight">Подразделение:</Text>
                        <Text>{choosenDivison?.name}</Text>
                    </HStack>
                    <HStack align="center" gap="12">
                        <Text weight="bold_weight">Дата начала работы:</Text>
                        <Text>
                            {getNormalizedDate(data?.startWork || new Date())}
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
                <Button size="large" type="text" onClick={onCancel}>
                    Отменить
                </Button>
                <Button
                    size="large"
                    type="primary"
                    onClick={onSuccess}
                    disabled={!isApprove}
                >
                    Добавить сотрудника
                </Button>
            </HStack>
        </VStack>
    );
};
