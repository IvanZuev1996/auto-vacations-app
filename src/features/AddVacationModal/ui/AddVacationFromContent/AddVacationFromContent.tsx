import { Alert, Button, Result, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { User } from '@/entities/User';
import { classNames } from '@/shared/lib/helpers/classNames';
import { getCurrentEnging } from '@/shared/lib/helpers/dates';
import { AppLink } from '@/shared/ui/AppLink';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import {
    getAddVacationModalEndDate,
    getAddVacationModalStartDate
} from '../../model/selectors/addVacationModal';
import cls from '../AddVacationForm/AddVacationForm.module.scss';
import { AddVacationInputs } from '../AddVacationInputs/AddVacationInputs';

interface AddVacationFromContentProps {
    userData?: User;
    onChangeType?: (value: string) => void;
    onChangeDates?: (dayjsDates: any, dates: [string, string]) => void;
    onCancel?: () => void;
    onSuccess?: () => void;
    isApprove?: boolean;
    daysCount?: string;
    weekendCount?: number;
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
        weekendCount,
        isSuccess,
        error,
        isLoading,
        onSuccess
    } = props;
    const endDate = useSelector(getAddVacationModalEndDate);
    const startDate = useSelector(getAddVacationModalStartDate);
    const [isApproveVacation, setIsApproveVacation] = useState<boolean>(true);
    const [isEnoughBalance, setIsEnoughBalance] = useState<boolean>(true);

    useEffect(() => {
        if (!userData) {
            return;
        }

        const maxVacationDuration = userData.vacationsDuration?.reduce(
            (max, item) => (item > max ? item : max),
            0
        );

        if (
            maxVacationDuration &&
            maxVacationDuration < 14 &&
            userData.balance - Number(daysCount) < 14 &&
            daysCount &&
            Number(daysCount) < 14
        ) {
            setIsApproveVacation(false);
        } else {
            setIsApproveVacation(true);
        }

        if (userData.balance - Number(daysCount) < 0) {
            setIsEnoughBalance(false);
        } else {
            setIsEnoughBalance(true);
        }
    }, [daysCount, userData, userData?.vacationsDuration]);

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
                            <Text>
                                {getCurrentEnging(userData?.prevBalance || 0)}
                            </Text>
                        </HStack>

                        <HStack gap="16" align="center" max>
                            <Text>Право на 2023г:</Text>
                            <Text>28 дней</Text>
                        </HStack>

                        <HStack gap="16" align="center" max>
                            <Text>Израсходовано:</Text>
                            <Text>
                                {getCurrentEnging(
                                    userData?.spentVacationDays || 0
                                )}
                            </Text>
                        </HStack>
                    </VStack>
                    <HStack gap="16" align="center" max>
                        <Text weight="bold_weight">Итоговый баланс:</Text>
                        <Text>{getCurrentEnging(userData?.balance || 0)}</Text>
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
            <VStack gap="16" className={cls.inputWrap} max>
                <AddVacationInputs
                    daysCount={daysCount}
                    onChangeDates={onChangeDates}
                    onChangeType={onChangeType}
                />
                {!isApproveVacation && (
                    <AppLink
                        style={{ width: '100%' }}
                        target="_blank"
                        to="https://www.consultant.ru/document/cons_doc_LAW_34683/befc35b415ff7b334824418693252b451205ffc0/"
                    >
                        <Alert
                            message="Обратите внимание, одна из частей отпуска должна быть не менее 14 дней (ст. 125 ТК РФ)."
                            type="error"
                            showIcon
                            style={{ width: '100%' }}
                        />
                    </AppLink>
                )}
                {!isEnoughBalance && (
                    <Alert
                        message="У вас недостаточно отпускных дней"
                        type="error"
                        showIcon
                        style={{ width: '100%' }}
                    />
                )}
                <Alert
                    message={`Кол-во выходных дней в отпуске: ${weekendCount}`}
                    type="warning"
                    showIcon
                    style={{ width: '100%' }}
                />
            </VStack>
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
                    disabled={!isApprove || !isApproveVacation}
                >
                    + Запланировать отпуск
                </Button>
            </HStack>
        </VStack>
    );
};
