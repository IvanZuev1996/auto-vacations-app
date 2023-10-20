import { Breadcrumb, Card, Descriptions } from 'antd';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useVacation } from '@/features/ApproveVacationModal';
import { getNormalizedDate } from '@/shared/lib/helpers/dates';
import { Line } from '@/shared/ui/Line';
import { HStack } from '@/shared/ui/Stack';
import { TagElement } from '@/shared/ui/TagElement/TagElement';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';
import { PageLoader } from '@/widgets/PageLoader';

import cls from './UserVacationDetailsPage.module.scss';

const UserVacationDetailsPage = () => {
    const { id = '' } = useParams<{ id: string }>();
    const [fetchVaction, { data, isLoading, isFetching }] = useVacation();
    const user = data?.user;

    useEffect(() => {
        const fetchData = async () => {
            await fetchVaction({ id }, false);
        };

        fetchData();
    }, [fetchVaction, id]);

    if (!data || isLoading || isFetching) {
        return <PageLoader />;
    }

    return (
        <Page>
            <Breadcrumb />
            <HStack justify="between" gap="16" align="center" max>
                <Text size="L" weight="bold_weight">
                    Заявка на отпуск #{data?._id.slice(0, 5)}
                </Text>
            </HStack>
            <Line />
            <Card className={cls.card}>
                <HStack align="center" justify="between" max>
                    <HStack
                        align="start"
                        justify="start"
                        gap="16"
                        max
                        className={cls.content}
                    >
                        <Descriptions
                            title="Информация о заявке"
                            column={1}
                            style={{ width: '100%' }}
                        >
                            <Descriptions.Item label="Дата начала отпуска">
                                {getNormalizedDate(new Date(data?.start))}
                            </Descriptions.Item>
                            <Descriptions.Item label="Дата конца отпуска">
                                {getNormalizedDate(new Date(data?.end))}
                            </Descriptions.Item>
                            <Descriptions.Item label="Статус заявки">
                                <TagElement status={data.status} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Тип отпуска">
                                {data.type}
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions
                            title="Информация о сотруднике"
                            column={1}
                            style={{ width: '100%' }}
                        >
                            <Descriptions.Item label="ФИО">
                                {`${user?.lastname} ${user?.firstname} ${user?.patronymic}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Подразделение">
                                {user?.division}
                            </Descriptions.Item>
                            <Descriptions.Item label="Текущий баланс">
                                {user?.balance}
                            </Descriptions.Item>
                            <Descriptions.Item label="Должность">
                                {user?.post}
                            </Descriptions.Item>
                            <Descriptions.Item label="Дата начала работы">
                                {getNormalizedDate(
                                    new Date(user?.startWork || '')
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                    </HStack>
                </HStack>
            </Card>
        </Page>
    );
};

export default UserVacationDetailsPage;
