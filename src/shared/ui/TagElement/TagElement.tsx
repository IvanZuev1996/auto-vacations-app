import {
    CheckCircleOutlined,
    CloseCircleOutlined,
    ExclamationCircleOutlined
} from '@ant-design/icons';
import { Tag } from 'antd';

// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { VacationStatus } from '@/entities/Vacation';

interface TagElementProps {
    status: VacationStatus;
}

export const TagElement = ({ status }: TagElementProps) => {
    if (status === 'agreed') {
        return (
            <Tag icon={<CheckCircleOutlined />} color="success">
                Одобрено
            </Tag>
        );
    }

    if (status === 'pending') {
        return (
            <Tag color="gold" icon={<ExclamationCircleOutlined />}>
                В ожидании
            </Tag>
        );
    }

    return (
        <Tag icon={<CloseCircleOutlined />} color="error">
            Отклонено
        </Tag>
    );
};
