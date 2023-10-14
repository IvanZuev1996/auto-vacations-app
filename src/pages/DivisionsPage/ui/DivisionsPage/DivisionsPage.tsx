import { Button, Card } from 'antd';
import { useCallback, useState } from 'react';

import { DivisionList } from '@/entities/Division';
import { AddEmployeeModal } from '@/features/AddEmployeeModal';
import { useDivisions } from '@/features/ChangeDivisionSelect';
import { Breadcrumb } from '@/shared/ui/Breadcrumb/Breadcrumb';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import cls from './DivisionsPage.module.scss';

// const reducers: ReducerList = {
//     employeeListPage: employeeListPageReducer
// };

const DivisionsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const { data = [], isLoading, error } = useDivisions();

    const onOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    return (
        <Page>
            <AddEmployeeModal
                isOpen={isModalOpen}
                onCloseModal={onCloseModal}
            />
            <VStack gap="8" max>
                <Breadcrumb />
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
