import { FilterOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Drawer, Tabs } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';
import { TableView } from '@/widgets/Table';

import {
    getVacationsPageMonth,
    getVacationsPageView,
    getVacationsPageYear
} from '../../model/selectors/vacationsPage';
import { vacationsPageActions } from '../../model/slice/vacationsPageSlice';

import cls from './VacationsPageFilters.module.scss';

interface ViewItem {
    key: string;
    label: string;
    value: TableView;
}

const items: ViewItem[] = [
    {
        key: '1',
        label: 'Год',
        value: 'year'
    },
    {
        key: '2',
        label: 'Месяц',
        value: 'month'
    }
];

export const VacationsPageFilters = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
    const selectedMonth = useSelector(getVacationsPageMonth);
    const selectedYear = useSelector(getVacationsPageYear);
    const tableView = useSelector(getVacationsPageView);
    const dispatch = useAppDispatch();

    const getCurrentDate = () => `${selectedYear}-${selectedMonth}`;

    const onCloseDrawer = useCallback(() => {
        setIsDrawerOpen(false);
    }, []);

    const onOpenDrawer = useCallback(() => {
        setIsDrawerOpen(true);
    }, []);

    const onChangeTableView = useCallback(
        (key: string) => {
            const newType = items.find((item) => item.key === key);
            dispatch(
                vacationsPageActions.setTableView(newType?.value || 'month')
            );
        },
        [dispatch]
    );

    const onChangeMonth = useCallback(
        (_: any, date: string) => {
            const newDate = new Date(date);
            const newMonth = newDate.getMonth() + 1;
            const newYear = newDate.getFullYear();

            dispatch(vacationsPageActions.setYear(newYear));
            dispatch(vacationsPageActions.setMonth(newMonth));
        },
        [dispatch]
    );

    const onChangeYear = useCallback(
        (_: any, date: string) => {
            const newDate = new Date(date);
            const newYear = newDate.getFullYear();

            dispatch(vacationsPageActions.setYear(newYear));
        },
        [dispatch]
    );

    return (
        <Card className={cls.filtersCard}>
            <Drawer
                title="Фильтры"
                placement="right"
                open={isDrawerOpen}
                onClose={onCloseDrawer}
            >
                Фильтры
            </Drawer>
            <HStack align="center" justify="between">
                <Tabs
                    centered
                    items={items}
                    defaultActiveKey="2"
                    activeKey={
                        items.find((item) => item.value === tableView)?.key
                    }
                    onChange={onChangeTableView}
                />
                {tableView === 'month' ? (
                    <DatePicker
                        value={dayjs(getCurrentDate())}
                        onChange={onChangeMonth}
                        picker="month"
                        style={{ width: '300px' }}
                    />
                ) : (
                    <DatePicker
                        value={dayjs(getCurrentDate())}
                        onChange={onChangeYear}
                        picker="year"
                        style={{ width: '300px' }}
                    />
                )}
                <HStack align="center" gap="12">
                    <Button
                        type="default"
                        icon={<VerticalAlignBottomOutlined />}
                    >
                        Сохранить
                    </Button>
                    <Button
                        type="default"
                        icon={<FilterOutlined />}
                        onClick={onOpenDrawer}
                    >
                        Фильтр
                    </Button>
                </HStack>
            </HStack>
        </Card>
    );
};
