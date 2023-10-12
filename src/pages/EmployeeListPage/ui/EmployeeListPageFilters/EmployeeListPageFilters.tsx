import {
    LinkOutlined,
    SearchOutlined,
    VerticalAlignBottomOutlined
} from '@ant-design/icons';
import { Button, Input, Tabs } from 'antd';
import { ChangeEvent, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getRouteMain } from '@/shared/consts/router';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { useDebounce } from '@/shared/lib/hooks/useDebounce/useDebouce';
import { SortType } from '@/shared/types/sort';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import {
    getEmployeeListPageSearch,
    getEmployeeListPageSort
} from '../../model/selectors/employeeListPage';
import { fetchUsersList } from '../../model/services/fetchUsersList';
import { employeeListPageActions } from '../../model/slice/employeeListPageSlice';

import cls from './EmployeeListPageFilters.module.scss';

interface ViewItem {
    key: string;
    label: string;
    value: SortType;
}

const items: ViewItem[] = [
    {
        key: '1',
        label: 'Все',
        value: 'all'
    },
    {
        key: '2',
        label: 'В отпуске',
        value: 'on vacation'
    },
    {
        key: '3',
        label: 'Работают',
        value: 'working'
    }
];

export const EmployeeListPageFilters = () => {
    const dispatch = useAppDispatch();
    const search = useSelector(getEmployeeListPageSearch);
    const sort = useSelector(getEmployeeListPageSort);

    const fetchData = useCallback(() => {
        dispatch(fetchUsersList());
    }, [dispatch]);

    const debouncedFetchData = useDebounce(fetchData, 500);

    const onChangeStatus = useCallback(
        (key: string) => {
            const newStatus = items.find((item) => item.key === key);
            dispatch(
                employeeListPageActions.setSort(newStatus?.value || 'all')
            );
            fetchData();
        },
        [dispatch, fetchData]
    );

    const onChangeSearch = useCallback(
        (e: ChangeEvent<HTMLInputElement>) => {
            dispatch(employeeListPageActions.setSearch(e.target.value));
            debouncedFetchData();
        },
        [debouncedFetchData, dispatch]
    );

    return (
        <VStack className={cls.filtersWrap} gap="16" max>
            <HStack justify="between" className={cls.header} max>
                <HStack align="center" gap="16" className={cls.search} max>
                    <Text>Поиск:</Text>
                    <Input
                        prefix={<SearchOutlined />}
                        onChange={onChangeSearch}
                        value={search}
                    />
                </HStack>
                <HStack justify="end" align="center" gap="12" max>
                    <AppLink to={getRouteMain()} className={cls.link}>
                        <HStack align="center" gap="8">
                            <Button type="link">
                                Посмотреть график отпусков
                            </Button>
                            <LinkOutlined />
                        </HStack>
                    </AppLink>
                    <Button
                        type="default"
                        icon={<VerticalAlignBottomOutlined />}
                        className={cls.btn}
                    >
                        Сохранить
                    </Button>
                </HStack>
            </HStack>
            <Tabs
                centered
                items={items}
                defaultActiveKey="1"
                onChange={onChangeStatus}
            />
        </VStack>
    );
};
