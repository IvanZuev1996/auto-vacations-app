import { Card, Descriptions, Input, Skeleton, Tag } from 'antd';
import { useCallback, useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { useDivisionById } from '@/entities/Division';
import { useLazyUserData, useUserVacations } from '@/entities/User';
import { VacationList } from '@/entities/Vacation';
import { formatStartDate } from '@/shared/lib/helpers/applications/formatStartDate';
import { getNormalizedDate } from '@/shared/lib/helpers/dates';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import cls from './UserDetailsPage.module.scss';

const UserDetailsPage = () => {
    const { id: userId = '' } = useParams<{ id: string }>();
    const [
        fetchUserData,
        {
            data: userData,
            isLoading: isUserDataLoading,
            isFetching: isUserDataFetching
        }
    ] = useLazyUserData();
    const divisionId = userData?.division || '';
    const { data: divisionData, isLoading: isDivisionLoading } =
        useDivisionById({
            id: divisionId
        });
    const [fetchUserVacations, { data, isLoading, isFetching, error }] =
        useUserVacations();

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserData({ userId: userId || '' }, false);
            await fetchUserVacations({ id: userId }, false);
        };

        fetchData();
    }, [fetchUserData, fetchUserVacations, userId]);

    const onEditVacation = useCallback(async () => {
        await fetchUserVacations({ id: userId }, false);
    }, [fetchUserVacations, userId]);

    return (
        <Page>
            <Skeleton
                loading={
                    isUserDataLoading || isUserDataFetching || isDivisionLoading
                }
                active
            >
                <HStack
                    justify="start"
                    gap="16"
                    align="center"
                    max
                    className={cls.header}
                >
                    <Text size="L" weight="bold_weight">
                        Профиль:
                        {` ${userData?.lastname} ${userData?.firstname} ${userData?.patronymic}`}
                    </Text>
                    <Tag color="green">
                        <HStack gap="16">
                            <Text size="LARGE_S">Баланс:</Text>
                            <Text size="LARGE_S">{userData?.balance} д.</Text>
                        </HStack>
                    </Tag>
                </HStack>
                <Line />
                <VStack gap="32">
                    <Card title="Личные данные" style={{ width: '100%' }}>
                        <HStack align="start" className={cls.info}>
                            <Descriptions style={{ width: '100%' }} column={1}>
                                <Descriptions.Item label="Отпускные дни с прошлого года">
                                    <Text weight="bold_weight">
                                        {userData?.prevBalance} д.
                                    </Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Право на 2023 год">
                                    <Text weight="bold_weight">28 д.</Text>
                                </Descriptions.Item>
                                <Descriptions.Item label="Итоговый баланс">
                                    <Text weight="bold_weight">
                                        {userData?.balance} д.
                                    </Text>
                                </Descriptions.Item>
                            </Descriptions>
                            <Descriptions style={{ width: '100%' }} column={1}>
                                <Descriptions.Item label="ФИО">
                                    {`${userData?.lastname} ${userData?.firstname} ${userData?.patronymic}`}
                                </Descriptions.Item>
                                <Descriptions.Item label="Подразделение">
                                    <HStack align="center" gap="4">
                                        <Text>
                                            {divisionData?.divisionNumber}
                                        </Text>
                                        <Text>({divisionData?.name})</Text>
                                    </HStack>
                                </Descriptions.Item>
                                <Descriptions.Item label="Должность">
                                    {userData?.post}
                                </Descriptions.Item>
                                <Descriptions.Item label="Дата начала работы">
                                    {`${formatStartDate(
                                        getNormalizedDate(
                                            new Date(userData?.startWork || '')
                                        )
                                    )}`}
                                </Descriptions.Item>
                            </Descriptions>
                            <VStack gap="8" max>
                                <Text>Почта для уведомлений</Text>
                                <Input
                                    value={userData?.email}
                                    disabled
                                    placeholder="Не указано"
                                />
                            </VStack>
                        </HStack>
                    </Card>
                    <Text size="L" weight="bold_weight">
                        История заявок
                    </Text>
                </VStack>
            </Skeleton>
            <VacationList
                onEditVacation={onEditVacation}
                vacations={data}
                isLoading={isLoading || isFetching}
                error={String(error)}
            />
        </Page>
    );
};

export default UserDetailsPage;
