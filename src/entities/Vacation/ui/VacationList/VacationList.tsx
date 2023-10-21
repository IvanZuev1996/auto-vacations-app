import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Modal, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useCallback, useState } from 'react';

import { getRouteVacationDetails } from '@/shared/consts/router';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';
import { PDFDocument } from '@/shared/ui/PDFDocument/PDFDocument';
import { HStack } from '@/shared/ui/Stack';
import { TagElement } from '@/shared/ui/TagElement/TagElement';
import { Text } from '@/shared/ui/Text';

import { DropdownItem } from '../../model/types/actionsDropdown';
import { DataType } from '../../model/types/tableVacation';
import { Vacation, VacationStatus } from '../../model/types/vacation';
import { useDeleteVacation } from '../api/vacationsListApi';

interface UserListProps {
    onEditVacation?: () => void;
    vacations?: Vacation[];
    isLoading?: boolean;
    error?: string;
}

export const VacationList = (props: UserListProps) => {
    const { vacations, error, isLoading, onEditVacation } = props;
    const [fetchDeleteVacation, { isSuccess }] = useDeleteVacation();
    const [isPDFOpen, setIsPDFOpen] = useState<boolean>(false);
    const [isModalOpen, setModalOpen] = useState<boolean>(false);
    const [deletedVacaionId, setDeletedVacaionId] = useState<
        string | undefined
    >(undefined);

    const data: DataType[] = [];
    let dropdownItems: DropdownItem[] = [];

    vacations?.forEach((vacation) => {
        data.push({
            ...vacation,
            key: vacation._id
        });
    });

    const onCloseModal = useCallback(() => {
        setModalOpen(false);
    }, []);

    const onOpenModal = useCallback(() => {
        setModalOpen(true);
    }, []);

    const deleteVacation = async () => {
        if (deletedVacaionId) {
            await fetchDeleteVacation({ vacationId: deletedVacaionId });
            setDeletedVacaionId(undefined);
            onEditVacation?.();
            onCloseModal();
        }
    };

    const getMenuItems = (id: string) => {
        const menuItem = vacations?.find((vacation) => vacation._id === id);
        const status = menuItem?.status;

        dropdownItems = [
            {
                label: (
                    <AppLink to={getRouteVacationDetails(id)}>
                        Информация о заявке
                    </AppLink>
                ),
                key: '1',
                value: 'info',
                vacationid: id
            }
        ];

        if (status === 'agreed') {
            dropdownItems.push({
                key: '2',
                label: 'Распечатать заявление',
                value: 'print',
                vacationid: id
            });
        }

        dropdownItems.push({
            key: '3',
            label: 'Отменить',
            value: 'cancel',
            danger: true,
            vacationid: id
        });

        return dropdownItems;
    };

    const openPDF = () => {
        setIsPDFOpen(true);
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (
            dropdownItems.find(
                (item) => item?.key === e.key && item.value === 'print'
            )
        ) {
            return openPDF();
        }

        const currentItem = dropdownItems.find(
            (item) => item?.key === e.key && item.value === 'cancel'
        );

        if (currentItem) {
            setDeletedVacaionId(currentItem.vacationid);
            return onOpenModal();
        }

        return null;
    };

    const getMenuProps = (vacationId: string) => {
        const menuProps = {
            items: getMenuItems(vacationId),
            onClick: handleMenuClick
        };

        return menuProps;
    };

    return (
        <>
            <PDFDocument isOpen={isPDFOpen} onOpen={setIsPDFOpen} />
            <Modal
                open={isModalOpen}
                onCancel={onCloseModal}
                onOk={deleteVacation}
                okText="Да, отменить"
                cancelText="Нет, вернуться"
                centered
            >
                <Text size="M">Вы уверены, что хотите отменить заявку?</Text>
            </Modal>
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
                    render={(date: string) => date.slice(0, 10)}
                />
                <Column
                    title="Дата конца отпуска"
                    dataIndex="end"
                    key="end"
                    render={(date: string) => date.slice(0, 10)}
                />
                <Column title="Тип отпуска" dataIndex="type" key="type" />
                <Column
                    title="Статус заявки"
                    dataIndex="status"
                    key="status"
                    render={(status: VacationStatus) => (
                        <TagElement status={status} />
                    )}
                />
                <Column
                    dataIndex="_id"
                    key="_id"
                    render={(id: string) => (
                        <Dropdown
                            menu={getMenuProps(id)}
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
