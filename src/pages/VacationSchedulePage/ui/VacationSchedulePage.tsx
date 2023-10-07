// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { Button } from 'antd';
import { useState } from 'react';

import { Breadcrumb } from '@/shared/ui/Breadcrumb/Breadcrumb';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';
import { Table } from '@/widgets/Table';

const VacationSchedulePage = () => {
    const [state, setState] = useState(false);
    const users = [
        {
            start: 1,
            end: 12
        },
        {
            start: 3,
            end: 8
        },
        {
            start: 8,
            end: 9
        },
        {
            start: 28,
            end: 30
        },
        {
            start: 13,
            end: 25
        },
        {
            start: 2,
            end: 23
        }
    ];

    // useEffect(() => {
    //     const loadData = async () => {
    //         const res = await axios.post(
    //             'http://localhost:8000/api/auth/login',
    //             {
    //                 username: 'PBaedT12Zm',
    //                 password: 'DKr3atufY3'
    //             }
    //         );

    //         const feedback = res.data ? 'Вы вошли!' : 'Что-то пошло не так!';
    //         alert(feedback);
    //     };
    //     if (state) {
    //         loadData();
    //     }
    // }, [state]);

    return (
        <Page>
            <VStack gap="16" max>
                <Breadcrumb />
                <HStack justify="between" gap="16" align="center" max>
                    <Text size="L" weight="bold_weight">
                        График отпусков
                    </Text>
                    <Button
                        type="primary"
                        onClick={() => setState(true)}
                        style={{ fontSize: '13px' }}
                    >
                        + Добавить сотрудника
                    </Button>
                </HStack>
                <Line />
                <Table vacations={[...users, ...users]} />
                <div style={{ height: '100px' }} />
            </VStack>
        </Page>
    );
};

export default VacationSchedulePage;
