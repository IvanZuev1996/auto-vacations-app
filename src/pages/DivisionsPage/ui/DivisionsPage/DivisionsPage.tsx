import { Button, Card } from 'antd';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { DivisionList, useDivisions } from '@/entities/Division';
import {
    AddDivisionModal,
    getAddDivisionModalIsSuccess
} from '@/features/AddDivisionModal';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import cls from './DivisionsPage.module.scss';

const DivisionsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data = [], isLoading, error } = useDivisions();
    const isSuccess = useSelector(getAddDivisionModalIsSuccess);

    const onOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsModalOpen(false);

        if (isSuccess) {
            window.location.reload();
        }
    }, [isSuccess]);

    return (
        <Page>
            <AddDivisionModal
                isOpen={isModalOpen}
                onCloseModal={onCloseModal}
            />
            <VStack gap="8" max>
                <HStack justify="between" gap="32" align="center" max>
                    <HStack gap="32" align="center">
                        <Text size="L" weight="bold_weight">
                            Список подразделений
                        </Text>
                    </HStack>
                    <Button
                        type="primary"
                        style={{ fontSize: '13px' }}
                        onClick={onOpenModal}
                    >
                        + Добавить подразделение
                    </Button>
                </HStack>
                <Text size="S">Всего подразделений: {data.length}</Text>
                <Line />
                <Card className={cls.card} bordered={false}>
                    <DivisionList divisions={data} />
                </Card>
            </VStack>
        </Page>
    );
};

export default DivisionsPage;
