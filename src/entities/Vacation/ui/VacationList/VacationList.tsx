import { MoreOutlined } from '@ant-design/icons';
import { PDFDownloadLink } from '@react-pdf/renderer';
import { Dropdown, MenuProps, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useState } from 'react';

import { Icon } from '@/shared/ui/Icon/Icon';
import { PDFDocument } from '@/shared/ui/PDFDocument/PDFDocument';
import { HStack } from '@/shared/ui/Stack';

import { Vacation } from '../../model/types/vacation';

interface UserListProps {
    vacations: Vacation[];
    isLoading?: boolean;
    error?: string;
}

interface DataType extends Vacation {
    key: React.Key;
}

const items = [
    {
        label: 'Подробная информация',
        key: '1',
        value: 'info'
    },
    {
        key: '2',
        label: 'Распечатать заявление',
        value: 'print'
    },
    {
        key: '3',
        label: 'Отменить',
        value: 'cancel',
        danger: true
    }
];

export const VacationList = (props: UserListProps) => {
    const { vacations, error, isLoading } = props;
    const [isPDFOpen, setIsPDFOpen] = useState<boolean>(false);

    const data: DataType[] = [];

    vacations.forEach((vacation) =>
        data.push({
            ...vacation,
            key: vacation._id
        })
    );

    const openPDF = () => {
        setIsPDFOpen(true);
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (
            items.find((item) => item?.key === e.key && item.value === 'print')
        ) {
            openPDF();
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick
    };

    return (
        <>
            {isPDFOpen && (
                <PDFDownloadLink
                    document={<PDFDocument />}
                    fileName="somename.pdf"
                >
                    {({ blob, url, loading, error }) => {
                        let link;

                        if (blob !== null) {
                            link = URL.createObjectURL(blob);
                            window.open(link);
                            setIsPDFOpen(false);
                        }

                        return null;
                    }}
                </PDFDownloadLink>
            )}
            <Table
                pagination={false}
                dataSource={data}
                style={{ width: '100%', minHeight: '300px', marginTop: '20px' }}
                loading={isLoading}
            >
                <Column
                    title="Дата начала отпуска"
                    dataIndex="start"
                    key="start"
                />
                <Column title="Дата конца отпуска" dataIndex="end" key="end" />
                <Column title="Тип отпуска" dataIndex="type" key="type" />
                <Column title="Статус заявки" dataIndex="status" key="status" />
                <Column
                    dataIndex="_id"
                    key="_id"
                    render={(id: string) => (
                        <Dropdown
                            menu={menuProps}
                            trigger={['click']}
                            placement="bottomLeft"
                        >
                            <HStack align="end" gap="8">
                                <Icon Icon={MoreOutlined} size={25} clicked />
                            </HStack>
                        </Dropdown>
                    )}
                />
            </Table>
        </>
    );
};
