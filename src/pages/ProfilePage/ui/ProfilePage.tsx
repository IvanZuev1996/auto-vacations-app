import { useSelector } from 'react-redux';

import { getUserAuthData } from '@/entities/User';
import { Breadcrumb } from '@/shared/ui/Breadcrumb/Breadcrumb';
import { Line } from '@/shared/ui/Line';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import cls from './ProfilePage.module.scss';

const ProfilePage = () => {
    const a = 0;
    const authData = useSelector(getUserAuthData);
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
                    Страница профиля
                </Text>
                <HStack gap="16" className={cls.balance}>
                    <Text size="M" weight="bold_weight">
                        Ваш баланс:
                    </Text>
                    <Text size="M" weight="bold_weight">
                        {authData?.balance}
                    </Text>
                </HStack>
            </HStack>
            <Line />
        </Page>
    );
};

export default ProfilePage;
