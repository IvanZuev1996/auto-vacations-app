import { LinkOutlined } from '@ant-design/icons';
import { Button, Table, Tag } from 'antd';
import Column from 'antd/es/table/Column';
import { useSelector } from 'react-redux';

import { getRouteProfile, getRouteUserDetails } from '@/shared/consts/router';
import { AppLink } from '@/shared/ui/AppLink';
import { HStack } from '@/shared/ui/Stack';

import { getUserAuthData } from '../../model/selectors/getUserAuthData/getUserAuthData';
import { User } from '../../model/types/user';

import cls from './UserList.module.scss';

interface UserListProps {
    users?: User[];
    isLoading?: boolean;
    error?: string;
}

interface DataType extends User {
    key: React.Key;
    fullName: string;
}

export const UserList = (props: UserListProps) => {
    const { users, error, isLoading } = props;
    const authData = useSelector(getUserAuthData);
    const data: DataType[] = [];

    users?.forEach((user) =>
        data.push({
            ...user,
            key: user._id,
            fullName: `${user.lastname} ${user.firstname} ${user.patronymic}`
        })
    );

    return (
        <Table
            pagination={false}
            dataSource={data}
            style={{ width: '100%', minHeight: '300px' }}
            loading={isLoading}
        >
            <Column title="Сотрудник" dataIndex="fullName" key="fullName" />
            <Column title="Должность" dataIndex="post" key="post" />
            <Column
                title="Текущий баланс (дней)"
                dataIndex="balance"
                key="balance"
            />
            <Column
                title="Статус"
                dataIndex="nowInVacation"
                key="nowInVacation"
                render={(nowInVacation) =>
                    nowInVacation ? (
                        <Tag color="success" style={{ fontSize: '12px' }}>
                            В отпуске
                        </Tag>
                    ) : (
                        <Tag style={{ fontSize: '12px' }}>Работает</Tag>
                    )
                }
            />
            <Column
                dataIndex="_id"
                key="_id"
                render={(id: string) => (
                    <AppLink
                        to={
                            authData?._id === id
                                ? getRouteProfile(id)
                                : getRouteUserDetails(id)
                        }
                        className={cls.link}
                    >
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
