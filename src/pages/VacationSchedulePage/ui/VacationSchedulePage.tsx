// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { Button } from 'antd';

import { Navbar } from '@/widgets/Navbar';
import { Page } from '@/widgets/Page';

const VacationSchedulePage = () => (
    <Page>
        <Navbar>
            <h2>График отпусков</h2>
            <Button type="primary">+ Добавить сотрудника</Button>
        </Navbar>
        <div style={{ height: '50vh' }} />
    </Page>
);

export default VacationSchedulePage;
