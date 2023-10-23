import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData, useUserVacations } from '@/entities/User';
import { VacationList } from '@/entities/Vacation';
import { Breadcrumb } from '@/shared/ui/Breadcrumb/Breadcrumb';
import { Line } from '@/shared/ui/Line';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import cls from './ApplicationPage.module.scss';

const ApplicationsPage = () => {
    const authData = useSelector(getUserAuthData);
    const userId = authData?._id || '';
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
            <Breadcrumb />
            <HStack
                justify="start"
                gap="16"
                align="center"
                max
                className={cls.header}
            >
                <Text size="L" weight="bold_weight">
                    Ваши заявки
                </Text>
            </HStack>
            <Line />
            <VacationList
                onEditVacation={onEditVacation}
                vacations={data}
                isLoading={isLoading || isFetching}
                error={String(error)}
                isOwner
            />
        </Page>
    );
};

export default ApplicationsPage;
