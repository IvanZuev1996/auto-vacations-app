import { Button, Input, Result, Spin } from 'antd';
import { ChangeEvent } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames';
import { NumericInput } from '@/shared/ui/NumericInput/NumericInput';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { getAddDivisionModalData } from '../../model/selectors/addDivisionModal';

import cls from './AddDivisionFormContent.module.scss';

interface AddDivisionFormContentProps {
    onChangeNumber: (divisionNumber: string) => void;
    onChangeName?: (e: ChangeEvent<HTMLInputElement>) => void;
    onCancel?: () => void;
    onSuccess?: () => void;
    isSuccess?: boolean;
    isLoading?: boolean;
    error?: string;
    className?: string;
}

export const AddDivisionFormContent = (props: AddDivisionFormContentProps) => {
    const {
        className,
        error,
        isLoading,
        isSuccess,
        onCancel,
        onChangeName,
        onChangeNumber,
        onSuccess
    } = props;

    const data = useSelector(getAddDivisionModalData);

    if (isSuccess) {
        return (
            <Result
                status="success"
                title="Подразделение добавлено!"
                subTitle="Теперь оно появится в списке ваших подразделений"
            />
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
            <Text size="L" weight="bold_weight" className={cls.mainText}>
                Новое подразделение
            </Text>
            <HStack gap="12" align="center" className={cls.inputsContent} max>
                <VStack gap="4" max className={cls.numberInput}>
                    <Text>Номер</Text>
                    <NumericInput
                        onChange={onChangeNumber}
                        value={String(data?.divisionNumber || '')}
                    />
                </VStack>
                <VStack gap="4" max className={cls.nameInput}>
                    <Text>Название</Text>
                    <Input
                        placeholder="Название подразделения"
                        onChange={onChangeName}
                        value={data?.name}
                    />
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
                <Button size="large" type="primary" onClick={onSuccess}>
                    Добавить подразделение
                </Button>
            </HStack>
        </VStack>
    );
};
