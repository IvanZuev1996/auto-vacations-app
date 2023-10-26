import { LinkOutlined } from '@ant-design/icons';
import { Button } from 'antd';

import helpPdf from '@/shared/fonts/help.pdf';
import userGuidePdf from '@/shared/fonts/useGuide.pdf';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

import cls from './HelpPage.module.scss';

const HelpPage = () => {
    const a = 0;
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
                    Справка
                </Text>
            </HStack>
            <Line />
            <VStack gap="16" align="start" justify="center">
                <AppLink to={helpPdf} target="_blank">
                    <Button type="link" className={cls.link}>
                        Справочная информация
                        <Icon Icon={LinkOutlined} clicked />
                    </Button>
                </AppLink>
                <AppLink to={userGuidePdf} target="_blank">
                    <Button type="link" className={cls.link}>
                        Руководство пользователя
                        <Icon Icon={LinkOutlined} clicked />
                    </Button>
                </AppLink>
            </VStack>
        </Page>
    );
};

export default HelpPage;
