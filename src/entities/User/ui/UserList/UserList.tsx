import { Card, Spin, Table } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { HStack } from '@/shared/ui/Stack';

import { User } from '../../model/types/user';

interface UserListProps {
    users: User[];
    isLoading?: boolean;
    error?: string;
}

const columns: ColumnsType<User> = [
    {
        title: 'Сотрудник',
        dataIndex: 'firstname',
        key: 'firstname',
        render: (text: any) => <div>{text}</div>
    },
    {
        title: 'Должность',
        dataIndex: 'post',
        key: 'post'
    },
    {
        title: 'Был в отпуске (дней)',
        dataIndex: 'daysOnVacations',
        key: 'daysOnVacations'
    },
    {
        title: 'Статус',
        key: 'vacationStatus',
        dataIndex: 'vacationStatus'
    },
    {
        title: '',
        key: '',
        dataIndex: ''
    }
];

export const UserList = (props: UserListProps) => {
    const { users, error, isLoading } = props;

    const data: User[] = [];

    users.forEach((user) =>
        data.push({
            ...user,
            firstname: `${user.lastname} ${user.firstname} ${user.patronymic}`
        })
    );

    if (isLoading) {
        return (
            <Card bordered={false} style={{ width: '100%', padding: '50px' }}>
                <HStack justify="center" align="center" max>
                    <Spin />
                </HStack>
            </Card>
        );
    }

    return (
        <Table
            pagination={false}
            columns={columns}
            dataSource={data}
            style={{ width: '100%' }}
        />
    );
};
