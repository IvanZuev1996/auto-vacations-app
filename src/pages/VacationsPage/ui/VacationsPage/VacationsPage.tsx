import { Button, Skeleton } from 'antd';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { getCurrentDivision } from '@/entities/Division';
import { AddVacationModal } from '@/features/AddVacationModal';
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

import cls from './VacationsPage.module.scss';

const reducers: ReducerList = {
    vacationsPage: vacationsPageReducer
};

const VacationsPage = () => {
    const vacations = useSelector(getVacationsPageVacations);
    const month = useSelector(getVacationsPageMonth);
    const viewType = useSelector(getVacationsPageView);
    const year = useSelector(getVacationsPageYear);
    const currentDivision = useSelector(getCurrentDivision);
    const isLoading = useSelector(getVacationsPageIsLoading);
    const error = useSelector(getVacationsPageError);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    const onOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const onCloseModal = useCallback(() => {
        setIsModalOpen(false);
        dispatch(fetchVacations());
    }, [dispatch]);

    useEffect(() => {
        dispatch(fetchVacations());
    }, [dispatch, currentDivision]);

    return (
        <DynamicModuleLoader reducers={reducers} removeAfterAnmount={false}>
            <AddVacationModal
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
                        <Button type="primary" onClick={onOpenModal}>
                            + Запланировать отпуск
                        </Button>
                    </HStack>
                    <Line />
                    <VacationsPageFilters />
                    {error ? (
                        <PageError title="Не удалось построить график отпусков" />
                    ) : (
                        <Skeleton
                            paragraph={{ rows: 7, width: '100%' }}
                            active
                            loading={isLoading}
                            className={cls.skeleton}
                        >
                            {vacations.map((vacationsInDivision) => (
                                <Table
                                    vacations={
                                        vacationsInDivision.vacations || []
                                    }
                                    isLoading={isLoading}
                                    month={month}
                                    year={year}
                                    viewType={viewType}
                                    division={vacationsInDivision.division}
                                    key={vacationsInDivision.division._id}
                                />
                            ))}
                        </Skeleton>
                    )}
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default VacationsPage;
