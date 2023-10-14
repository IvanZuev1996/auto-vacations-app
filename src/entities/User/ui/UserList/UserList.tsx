import { LinkOutlined } from '@ant-design/icons';
import { Button, Card, Spin, Table } from 'antd';
import Column from 'antd/es/table/Column';

import { getRouteUserDetails } from '@/shared/consts/router';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack } from '@/shared/ui/Stack';

import { User } from '../../model/types/user';

import cls from './UserList.module.scss';

interface UserListProps {
    users: User[];
    isLoading?: boolean;
    error?: string;
}

interface DataType extends User {
    key: React.Key;
    fullName: string;
}

export const UserList = (props: UserListProps) => {
    const { users, error, isLoading } = props;

    const data: DataType[] = [];

    users.forEach((user) =>
        data.push({
            ...user,
            key: user._id,
            fullName: `${user.lastname} ${user.firstname} ${user.patronymic}`
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
        <Table pagination={false} dataSource={data} style={{ width: '100%' }}>
            <Column title="Сотрудник" dataIndex="fullName" key="fullName" />
            <Column title="Должность" dataIndex="post" key="post" />
            <Column
                title="Текущий баланс (дней)"
                dataIndex="balance"
                key="balance"
            />
            <Column
                dataIndex="_id"
                key="_id"
                render={(id: string) => (
                    <AppLink to={getRouteUserDetails(id)} className={cls.link}>
                        <HStack align="center" gap="8">
                            <Button type="link">Подробнее</Button>
                            <LinkOutlined />
                        </HStack>
                    </AppLink>
                )}
            />
        </Table>
    );
};
