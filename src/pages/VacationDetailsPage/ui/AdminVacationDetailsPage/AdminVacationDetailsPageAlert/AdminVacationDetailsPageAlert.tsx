import { Alert } from 'antd';

import { VacationStatus } from '@/entities/Vacation';
import { adminMessages } from '@/shared/consts/messages/vacationDetails';

import cls from './AdminVacationDetailsPageAlert.module.scss';

interface VacationAlertProps {
    status: VacationStatus;
}

export const AdminVacationDetailsPageAlert = ({
    status
}: VacationAlertProps) => {
    if (status === 'pending') {
        return (
            <Alert
                message={adminMessages.pendingStatus}
                type="warning"
                showIcon
                className={cls.warningAlert}
            />
        );
    }

    if (status === 'agreed') {
        return (
            <Alert
                message={adminMessages.successStatus}
                type="success"
                showIcon
                className={cls.warningAlert}
            />
        );
    }

    return null;
};
