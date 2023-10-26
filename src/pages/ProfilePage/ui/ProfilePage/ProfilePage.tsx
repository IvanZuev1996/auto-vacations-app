import { Card, Descriptions, Tag } from 'antd';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { useDivisionById } from '@/entities/Division';
import {
    getIsUserAdmin,
    getUserAuthData,
    useUserVacations
} from '@/entities/User';
import { VacationList } from '@/entities/Vacation';
import { EditableEmailInput } from '@/features/editableEmailInput';
import { formatStartDate } from '@/shared/lib/helpers/applications/formatStartDate';
import { getNormalizedDate } from '@/shared/lib/helpers/dates';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import cls from './ProfilePage.module.scss';

const ProfilePage = () => {
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(getIsUserAdmin);
    const divisionId = authData?.division || 'all';
    const userId = authData?._id || '';
    const { data: divisionData, isLoading: isDivisionLoading } =
        useDivisionById({
            id: divisionId
        });
    const [fetchUserVacations, { data, isLoading, isFetching, error }] =
        useUserVacations();

    useEffect(() => {
        const fetchData = async () => {
            await fetchUserVacations({ id: userId }, false);
        };

        fetchData();
    }, [fetchUserVacations, userId]);

    const onEditVacation = useCallback(async () => {
        await fetchUserVacations({ id: userId }, false);
    }, [fetchUserVacations, userId]);

    return (
        <Page>
            <HStack
                justify="start"
                gap="16"
                align="center"
                max
                className={cls.header}
            >
                <Text size="L" weight="bold_weight">
                    Страница профиля
                </Text>
                <Tag color="green">
                    <HStack gap="16">
                        <Text size="LARGE_S">Ваш баланс:</Text>
                        <Text size="LARGE_S">{authData?.balance} д.</Text>
                    </HStack>
                </Tag>
            </HStack>
            <Line />
            <VStack gap="32">
                <Card title="Ваши личные данные" style={{ width: '100%' }}>
                    <HStack align="start" className={cls.info}>
                        <Descriptions style={{ width: '100%' }} column={1}>
                            <Descriptions.Item label="Отпускные дни с прошлого года">
                                <Text weight="bold_weight">
                                    {authData?.prevBalance} д.
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Право на 2023 год">
                                <Text weight="bold_weight">28 д.</Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Израсходовано">
                                <Text weight="bold_weight">
                                    {authData?.spentVacationDays} д.
                                </Text>
                            </Descriptions.Item>
                            <Descriptions.Item label="Итоговый баланс">
                                <Text weight="bold_weight">
                                    {authData?.balance} д.
                                </Text>
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions style={{ width: '100%' }} column={1}>
                            <Descriptions.Item label="ФИО">
                                {`${authData?.lastname} ${authData?.firstname} ${authData?.patronymic}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Подразделение">
                                <HStack align="center" gap="4">
                                    {isDivisionLoading ? (
                                        'Загрузка...'
                                    ) : (
                                        <>
                                            <Text>
                                                {divisionData?.divisionNumber}
                                            </Text>
                                            <Text>({divisionData?.name})</Text>
                                        </>
                                    )}
                                </HStack>
                            </Descriptions.Item>
                            <Descriptions.Item label="Должность">
                                {authData?.post}
                            </Descriptions.Item>
                            <Descriptions.Item label="Дата начала работы">
                                {`${formatStartDate(
                                    getNormalizedDate(
                                        new Date(authData?.startWork || '')
                                    )
                                )}`}
                            </Descriptions.Item>
                        </Descriptions>
                        <EditableEmailInput
                            email={authData?.email}
                            userId={authData?._id || ''}
                        />
                    </HStack>
                </Card>
                <HStack align="center" gap="16">
                    <Text size="L" weight="bold_weight">
                        Ваши заявки
                    </Text>
                </HStack>
            </VStack>
            <VacationList
                onEditVacation={onEditVacation}
                vacations={isAdmin ? data : data?.slice(0, 3)}
                isLoading={isLoading || isFetching}
                error={String(error)}
                isOwner
            />
        </Page>
    );
};

export default ProfilePage;
