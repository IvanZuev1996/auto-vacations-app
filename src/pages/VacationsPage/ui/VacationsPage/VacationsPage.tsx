// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { Button } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

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
import { PageError } from '@/widgets/PageError';
import { Table } from '@/widgets/Table';

import {
    getVacationsPageError,
    getVacationsPageIsLoading,
    getVacationsPageMonth,
    getVacationsPageVacations,
    getVacationsPageView,
    getVacationsPageYear
} from '../../model/selectors/vacationsPage';
import { fetchVacations } from '../../model/services/fetchVacations';
import { vacationsPageReducer } from '../../model/slice/vacationsPageSlice';
import { VacationsPageFilters } from '../VacationsPageFilters/VacationsPageFilters';

const reducers: ReducerList = {
    vacationsPage: vacationsPageReducer
};

const VacationsPage = () => {
    const vacations = useSelector(getVacationsPageVacations);
    const month = useSelector(getVacationsPageMonth);
    const viewType = useSelector(getVacationsPageView);
    const year = useSelector(getVacationsPageYear);
    const isLoading = useSelector(getVacationsPageIsLoading);
    const error = useSelector(getVacationsPageError);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    useEffect(() => {
        dispatch(fetchVacations());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAnmount={false}>
            <AddEmployeeModal
                isOpen={isModalOpen}
                onCloseModal={onCloseModal}
            />
            <Page>
                <VStack gap="4" max>
                    <Breadcrumb />
                    <HStack justify="between" gap="16" align="center" max>
                        <Text size="L" weight="bold_weight">
                            График отпусков
                        </Text>
                        <Button
                            type="primary"
                            style={{ fontSize: '13px' }}
                            onClick={onOpenModal}
                        >
                            + Добавить сотрудника
                        </Button>
                    </HStack>
                    <Line />
                    <VacationsPageFilters />
                    {error ? (
                        <PageError title="Не удалось построить график отпусков" />
                    ) : (
                        <Table
                            vacations={vacations}
                            isLoading={isLoading}
                            month={month}
                            year={year}
                            viewType={viewType}
                        />
                    )}
                    <div style={{ height: '100px' }} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default VacationsPage;
