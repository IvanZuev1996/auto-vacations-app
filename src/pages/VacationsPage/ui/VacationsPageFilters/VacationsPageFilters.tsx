import { FilterOutlined, VerticalAlignBottomOutlined } from '@ant-design/icons';
import { Button, Card, DatePicker, Drawer, Radio, Slider, Tabs } from 'antd';
import { SliderMarks } from 'antd/es/slider';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
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

const marks: SliderMarks = {
    1: 'Янв',
    2: 'Фев',
    3: 'Мар',
    4: 'Апр',
    5: 'Май',
    6: 'Июн',
    7: 'Июл',
    8: 'Авг',
    9: 'Сен',
    10: 'Окт',
    11: 'Ноя',
    12: 'Дек'
};

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
                size="large"
            >
                <VStack gap="32" max>
                    <Button className={cls.onlyMyBtn}>
                        Показать только мои отпуска
                    </Button>
                    <VStack gap="16" max>
                        <Text className={cls.filterText}>
                            По статусу заявки
                        </Text>
                        <Radio.Group
                            size="large"
                            className={cls.radioGroup}
                            value={1}
                        >
                            <Radio className={cls.radio} value={1}>
                                Только согласованные
                            </Radio>
                            <Radio className={cls.radio} value={2}>
                                Только не согласованые
                            </Radio>
                        </Radio.Group>
                    </VStack>
                    <VStack gap="16" max>
                        <Text className={cls.filterText}>
                            По дате (выбете нужный промежуток)
                        </Text>
                        <Slider
                            className={cls.slider}
                            range={{ draggableTrack: true }}
                            marks={marks}
                            defaultValue={[10, 12]}
                            min={1}
                            max={12}
                        />
                    </VStack>
                </VStack>
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
