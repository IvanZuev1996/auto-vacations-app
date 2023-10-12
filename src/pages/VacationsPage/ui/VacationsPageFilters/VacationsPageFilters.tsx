import { FilterOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Tabs } from 'antd';
import dayjs from 'dayjs';
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
    const selectedMonth = useSelector(getVacationsPageMonth);
    const selectedYear = useSelector(getVacationsPageYear);
    const tableView = useSelector(getVacationsPageView);
    const dispatch = useAppDispatch();

    const getCurrentDate = () => `${selectedYear}-${selectedMonth}`;

    const onChangeTableView = (key: string) => {
        const newType = items.find((item) => item.key === key);
        dispatch(vacationsPageActions.setTableView(newType?.value || 'month'));
    };

    const onChangeMonth = (_: any, date: string) => {
        const newDate = new Date(date);
        const newMonth = newDate.getMonth() + 1;
        const newYear = newDate.getFullYear();

        dispatch(vacationsPageActions.setYear(newYear));
        dispatch(vacationsPageActions.setMonth(newMonth));
    };

    const onChangeYear = (_: any, date: string) => {
        const newDate = new Date(date);
        const newYear = newDate.getFullYear();

        dispatch(vacationsPageActions.setYear(newYear));
    };

    return (
        <Card className={cls.filtersCard}>
            <HStack align="center" justify="between">
                <Tabs
                    centered
                    items={items}
                    defaultActiveKey="2"
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
                    <Button type="default" icon={<FilterOutlined />}>
                        Фильтр
                    </Button>
                </HStack>
            </HStack>
        </Card>
    );
};
