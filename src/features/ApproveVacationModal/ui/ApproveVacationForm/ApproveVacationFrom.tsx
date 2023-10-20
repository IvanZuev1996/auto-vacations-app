import { Button, Result, Spin } from 'antd';
import React from 'react';

import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { useApproveVacation } from '../../api/approveVacationApi';

interface ApproveVacationFormProps {
    onSuccess?: () => void;
    className?: string;
}

const ApproveVacationForm = (props: ApproveVacationFormProps) => {
    const { className, onSuccess } = props;
    const [_, { isSuccess, isLoading, error }] = useApproveVacation();

    if (isSuccess) {
        return (
            <Result status="success" title="Заявка подтверждена!">
                <Button onClick={onSuccess}>Перейти к графику отпусков</Button>
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
                        Go Console
                    </Button>,
                    <Button key="buy">Buy Again</Button>
                ]}
            />
        );
    }

    if (isLoading) {
        return (
            <VStack
                justify="center"
                align="center"
                max
                style={{ height: '60vh' }}
            >
                <Spin size="large" />
            </VStack>
        );
    }

    return (
        <VStack
            justify="center"
            gap="16"
            max
            style={{ marginBottom: '30px' }}
            className={className}
        >
            <Text weight="bold_weight">Подтверждение заявки на отпуск</Text>
            <Text>Вы уверены, что хотите согласовать заявку?</Text>
        </VStack>
    );
};

export default ApproveVacationForm;
