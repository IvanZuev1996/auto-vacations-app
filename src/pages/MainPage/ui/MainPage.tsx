import { Button } from 'antd';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { getIsUserAdmin, getUserAuthData } from '@/entities/User';
import { getRouteVacations } from '@/shared/consts/router';
import { VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import cls from './MainPage.module.scss';

const MainPage = () => {
    const navigate = useNavigate();
    const authData = useSelector(getUserAuthData);
    const isAdmin = useSelector(getIsUserAdmin);

    if (isAdmin) {
        return (
            <Page>
                <VStack
                    align="center"
                    justify="center"
                    max
                    className={cls.content}
                >
                    <Text
                        size="XL"
                        weight="bold_weight"
                        className={cls.mainText}
                    >
                        Добро пожаловать, {authData?.firstname}{' '}
                        {authData?.patronymic} !
                    </Text>
                    <VStack gap="12" align="center" max>
                        <Text size="M">
                            У вас есть заявки для которых требуется ваше
                            действие
                        </Text>
                        <Button
                            type="primary"
                            onClick={() => navigate(getRouteVacations())}
                        >
                            Перейти к графику отпусков
                        </Button>
                    </VStack>
                </VStack>
            </Page>
        );
    }

    return (
        <Page>
            <VStack align="center" justify="center" max className={cls.content}>
                <Text size="XL" weight="bold_weight" className={cls.mainText}>
                    Добро пожаловать, {authData?.firstname}{' '}
                    {authData?.patronymic} !
                </Text>
                <VStack gap="12" align="center" max>
                    <Text size="M">
                        У вас осталось {authData?.balance} незапланированных
                        отпускных дней.
                    </Text>
                    <Text size="M">Запланируйте отпуск прямо сейчас!</Text>
                    <Button
                        type="primary"
                        onClick={() => navigate(getRouteVacations())}
                    >
                        Перейти к графику отпусков
                    </Button>
                </VStack>
            </VStack>
        </Page>
    );
};

export default MainPage;
