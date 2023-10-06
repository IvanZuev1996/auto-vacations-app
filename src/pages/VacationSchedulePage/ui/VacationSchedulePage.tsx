// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { Button } from 'antd';
import axios from 'axios';
import { useEffect, useState } from 'react';

import { Page } from '@/widgets/Page';

const VacationSchedulePage = () => {
    const [state, setState] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            const res = await axios.post(
                'http://localhost:8000/api/auth/login',
                {
                    username: 'PBaedT12Zm',
                    password: 'DKr3atufY3'
                }
            );

            const feedback = res.data ? 'Вы вошли!' : 'Что-то пошло не так!';
            alert(feedback);
        };
        if (state) {
            loadData();
        }
    }, [state]);

    return (
        <Page>
            <div
                style={{
                    display: 'flex',
                    gap: '20px',
                    justifyContent: 'space-between',
                    width: '100%',
                    alignItems: 'center'
                }}
            >
                <h2>График отпусков</h2>
                <Button
                    type="primary"
                    onClick={() => setState(true)}
                    style={{ fontSize: '13px' }}
                >
                    + Добавить сотрудника
                </Button>
            </div>
            <div style={{ height: '50vh' }} />
        </Page>
    );
};

export default VacationSchedulePage;
