import { Space, Table, Tag } from 'antd';
import { ColumnsType } from 'antd/es/table';

import { Breadcrumb } from '@/shared/ui/Breadcrumb/Breadcrumb';
import { Line } from '@/shared/ui/Line';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';

interface DataType {
    key: string;
    name: string;
    age: number;
    address: string;
    tags: string[];
}

const columns: ColumnsType<DataType> = [
    {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        render: (text: any) => <div>{text}</div>
    },
    {
        title: 'Age',
        dataIndex: 'age',
        key: 'age'
    },
    {
        title: 'Address',
        dataIndex: 'address',
        key: 'address'
    },
    {
        title: 'Tags',
        key: 'tags',
        dataIndex: 'tags',
        render: (_: any, { tags }: { tags: any }) => (
            <>
                {tags.map((tag: any) => {
                    let color = tag.length > 5 ? 'geekblue' : 'green';
                    if (tag === 'loser') {
                        color = 'volcano';
                    }
                    return (
                        <Tag color={color} key={tag}>
                            {tag.toUpperCase()}
                        </Tag>
                    );
                })}
            </>
        )
    },
    {
        title: 'Action',
        key: 'action',
        render: (_: any, record: any) => (
            <Space size="middle">
                <div>Invite {record.name}</div>
                <div>Delete</div>
            </Space>
        )
    }
];

const data: DataType[] = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: ['nice', 'developer']
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: ['loser']
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sydney No. 1 Lake Park',
        tags: ['cool', 'teacher']
    }
];

const EmployeeListPage = () => {
    const test = new Array(10).fill(0);
    return (
        <Page>
            <VStack gap="8" max>
                <Breadcrumb />
                <HStack justify="start" gap="32" align="center" max>
                    <Text size="L" weight="bold_weight">
                        Список сотрудников
                    </Text>
                    <Text size="S">Кол-во сотрудников: 3</Text>
                </HStack>
                <Text size="S">Подразделение 1</Text>
                <Line />
                <Table
                    pagination={false}
                    columns={columns}
                    dataSource={data}
                    style={{ width: '100%' }}
                />
            </VStack>
        </Page>
    );
};

export default EmployeeListPage;
