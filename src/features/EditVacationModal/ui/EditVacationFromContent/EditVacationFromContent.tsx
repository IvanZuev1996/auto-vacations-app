/* eslint-disable babun4ek-fsd-plugin/layer-imports-checker */
import { Alert, Button, Result, Spin } from 'antd';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { User } from '@/entities/User';
import { useVacation } from '@/features/ApproveVacationModal';
import { classNames } from '@/shared/lib/helpers/classNames';
import { getWeekendCount } from '@/shared/lib/helpers/dates';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import cls from '../EditVacationForm/EditVacationForm.module.scss';
import { EditVacationInputs } from '../EditVacationInputs/EditVacationInputs';

interface EditVacationFromContentProps {
    userData?: User;
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

export const EditVacationFromContent = (
    props: EditVacationFromContentProps
) => {
    const {
        className,
        userData,
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
    const { id = '' } = useParams<{ id: string }>();
    const { data: vacationData } = useVacation({ id });
    const [isApproveVacation, setIsApproveVacation] = useState<boolean>(true);
    const [isEnoughBalance, setIsEnoughBalance] = useState<boolean>(true);

    console.log(isApproveVacation);

    const defaultWeekendCount = getWeekendCount({
        startDate: vacationData?.start || '',
        endDate: vacationData?.end || ''
    });

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
        return (
            <Result status="success" title="Заявка успешно отредактирована!" />
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
            <Text size="L" weight="bold_weight">
                Редактирование заявки на отпуск
            </Text>
            <VStack gap="16" className={cls.inputWrap} max>
                <EditVacationInputs
                    onChangeDates={onChangeDates}
                    daysCount={daysCount}
                />
                {!isApproveVacation && (
                    <Alert
                        message="Обратите внимание, соласно ТК РФ Вам необходимо выбрать хотябы один отпуск длительностью не менее 14 календарных дней"
                        type="error"
                        showIcon
                        style={{ width: '100%' }}
                    />
                )}
                {!isEnoughBalance && (
                    <Alert
                        message="У сотрудника недостаточно отпускных дней"
                        type="error"
                        showIcon
                        style={{ width: '100%' }}
                    />
                )}
                <Alert
                    message={`Кол-во выходных дней в отпуске: ${
                        weekendCount || defaultWeekendCount
                    }`}
                    type="warning"
                    showIcon
                    style={{ width: '100%' }}
                />
            </VStack>
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
                    disabled={!isEnoughBalance || !isApproveVacation}
                >
                    Подтвердить редактирование
                </Button>
            </HStack>
        </VStack>
    );
};
