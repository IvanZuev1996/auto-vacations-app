// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { Button } from 'antd';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
import { Table } from '@/widgets/Table';

import {
    getVacationsPageIsLoading,
    getVacationsPageMonth,
    getVacationsPageView,
    getVacationsPageYear
} from '../../model/selectors/vacationsPage';
import { fetchVacations } from '../../model/services/fetchVacations';
import {
    getVacations,
    vacationsPageReducer
} from '../../model/slice/vacationsPageSlice';
import { VacationsPageFilters } from '../VacationsPageFilters/VacationsPageFilters';

const users = [
    {
        start: new Date('2023-09-01'),
        end: new Date('2023-10-10')
    },
    {
        start: new Date('2023-10-03'),
        end: new Date('2023-10-08')
    },
    {
        start: new Date('2023-10-08'),
        end: new Date('2023-12-10')
    },
    {
        start: new Date('2023-10-28'),
        end: new Date('2023-10-30')
    },
    {
        start: new Date('2024-01-13'),
        end: new Date('2024-01-25')
    },
    {
        start: new Date('2023-12-25'),
        end: new Date('2024-01-10')
    },
    {
        start: new Date('2023-03-13'),
        end: new Date('2023-03-20')
    }
];

const reducers: ReducerList = {
    vacationsPage: vacationsPageReducer
};

const VacationsPage = () => {
    const vacations = useSelector(getVacations.selectAll);
    const month = useSelector(getVacationsPageMonth);
    const viewType = useSelector(getVacationsPageView);
    const year = useSelector(getVacationsPageYear);
    const isLoading = useSelector(getVacationsPageIsLoading);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchVacations());
    }, [dispatch]);

    return (
        <DynamicModuleLoader reducers={reducers}>
            <Page>
                <VStack gap="4" max>
                    <Breadcrumb />
                    <HStack justify="between" gap="16" align="center" max>
                        <Text size="L" weight="bold_weight">
                            График отпусков
                        </Text>
                        <Button type="primary" style={{ fontSize: '13px' }}>
                            + Добавить сотрудника
                        </Button>
                    </HStack>
                    <Line />
                    <VacationsPageFilters />
                    <Table
                        vacations={vacations}
                        isLoading={isLoading}
                        month={month}
                        year={year}
                        viewType={viewType}
                    />
                    <div style={{ height: '100px' }} />
                </VStack>
            </Page>
        </DynamicModuleLoader>
    );
};

export default VacationsPage;
