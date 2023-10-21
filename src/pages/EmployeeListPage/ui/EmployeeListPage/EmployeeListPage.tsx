import { Button, Card } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentDivisionId, useDivisionById } from '@/entities/Division';
import { UserList } from '@/entities/User';
import { AddEmployeeModal } from '@/features/AddEmployeeModal';
import {
    DynamicModuleLoader,
    ReducerList
} from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Breadcrumb } from '@/shared/ui/Breadcrumb/Breadcrumb';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import {
    getEmployeeListPageError,
    getEmployeeListPageIsLoading
} from '../../model/selectors/employeeListPage';
import { fetchUsersList } from '../../model/services/fetchUsersList';
import {
    employeeListPageReducer,
    getUsers
} from '../../model/slice/employeeListPageSlice';
import { EmployeeListPageFilters } from '../EmployeeListPageFilters/EmployeeListPageFilters';

import cls from './EmployeeListPage.module.scss';

const reducers: ReducerList = {
    employeeListPage: employeeListPageReducer
};

const EmployeeListPage = () => {
    const dispatch = useAppDispatch();
    const users = useSelector(getUsers.selectAll);
    const isLoading = useSelector(getEmployeeListPageIsLoading);
    const error = useSelector(getEmployeeListPageError);
    const currentDivisionId = useSelector(getCurrentDivisionId);
    const { data: divisionData, isLoading: isDivisionLoading } =
        useDivisionById({
            id: currentDivisionId || 'all'
        });

    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const onOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        dispatch(fetchUsersList());
    }, [dispatch, currentDivisionId]);

    return (
        <DynamicModuleLoader reducers={reducers}>
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
                                Список сотрудников
                            </Text>
                            <Text size="S">
                                Кол-во сотрудников: {users.length}
                            </Text>
                        </HStack>
                        <Button
                            type="primary"
                            style={{ fontSize: '13px' }}
                            onClick={onOpenModal}
                        >
                            + Добавить сотрудника
                        </Button>
                    </HStack>
                    <HStack gap="12" align="center">
                        <Text size="S">Подразделение</Text>
                        <Text size="S">
                            {isDivisionLoading
                                ? 'Загрузка...'
                                : divisionData?.divisionNumber}
                        </Text>
                    </HStack>
                    <Line />
                    <Card className={cls.card} bordered={false}>
                        <EmployeeListPageFilters />
                        <UserList
                            users={users}
                            error={error}
                            isLoading={isLoading}
                        />
                    </Card>
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default EmployeeListPage;
