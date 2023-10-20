import { Button, Card } from 'antd';

import { HStack } from '@/shared/ui/Stack';

import cls from '../AdminVacationDetailsPage/AdminVacationDetailsPage.module.scss';
import { AdminVacationDetailsPageAlert } from '../AdminVacationDetailsPageAlert/AdminVacationDetailsPageAlert';

interface VacationDetailsPageActionsProps {
    onSuccess?: () => void;
    onCancel?: () => void;
}

export const AdminVacationDetailsPageActions = ({
    onCancel,
    onSuccess
}: VacationDetailsPageActionsProps) => (
    <Card bordered className={cls.actions}>
        <AdminVacationDetailsPageAlert status="pending" />
        <HStack align="center" justify="start" max gap="16">
            <Button type="default" onClick={onCancel}>
                Редактировать
            </Button>
            <Button type="primary" onClick={onSuccess}>
                Согласовать
            </Button>
        </HStack>
    </Card>
);
