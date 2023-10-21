import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { Tag, Tooltip } from 'antd';

// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { VacationStatus } from '@/entities/Vacation';

interface TagElementProps {
    status: VacationStatus;
}

export const TagElement = ({ status }: TagElementProps) => {
    if (status === 'agreed') {
        return (
            <Tooltip title="Для этой заявки готово заявление">
                <Tag icon={<CheckCircleOutlined />} color="success">
                    Одобрено
                </Tag>
            </Tooltip>
        );
    }

    if (status === 'pending') {
        return (
            <Tooltip title="Заявка на рассмотрении">
                <Tag color="gold" icon={<ExclamationCircleOutlined />}>
                    В ожидании
                </Tag>
            </Tooltip>
        );
    }

    return (
        <Tag icon={<CloseCircleOutlined />} color="error">
            Отклонено
        </Tag>
    );
};
