import { ArrowUpOutlined } from '@ant-design/icons';
import { Card, Spin, Statistic } from 'antd';
import { useSelector } from 'react-redux';

import { getCurrentDivisionId } from '@/entities/Division';
import { Breadcrumb } from '@/shared/ui/Breadcrumb/Breadcrumb';
import { Line } from '@/shared/ui/Line';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import { useStatistics } from '../api/statisticsPageApi';

import cls from './StatisticsPage.module.scss';

const StatisticsPage = () => {
    const currentDivisionId = useSelector(getCurrentDivisionId);
    const { data, isLoading, error, isFetching } = useStatistics({
        divisionId: currentDivisionId || 'all'
    });

    return (
        <Page>
            <Breadcrumb />
            <Spin spinning={isLoading || isFetching}>
                <HStack
                    justify="start"
                    gap="16"
                    align="center"
                    max
                    className={cls.header}
                >
                    <Text size="L" weight="bold_weight">
                        Статистика
                    </Text>
                </HStack>
                <Line />
                <Card bordered={false} style={{ width: '300px' }}>
                    <Statistic
                        title="Кол-во сотрудников в отпуске"
                        value={data?.inVacationUsersCount}
                        valueStyle={{ color: '#3f8600' }}
                        prefix={<ArrowUpOutlined />}
                    />
                </Card>
            </Spin>
        </Page>
    );
};

export default StatisticsPage;
