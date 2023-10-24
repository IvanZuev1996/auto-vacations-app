import { MoreOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Modal, Spin, Table } from 'antd';
import Column from 'antd/es/table/Column';
import dayjs from 'dayjs';
import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';

import { fetchUserData, getUserAuthData } from '@/entities/User';
import { getRouteVacationDetails } from '@/shared/consts/router';
import { formatCurrentDate } from '@/shared/lib/helpers/applications/formatCurrentDate';
import { formatName } from '@/shared/lib/helpers/applications/formatName';
import { formatStartDate } from '@/shared/lib/helpers/applications/formatStartDate';
import { getDatesDiff } from '@/shared/lib/helpers/dates';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';
import { PDFDocument } from '@/shared/ui/PDFDocument/PDFDocument';
import { HStack } from '@/shared/ui/Stack';
import { TagElement } from '@/shared/ui/TagElement/TagElement';
import { Text } from '@/shared/ui/Text';

import { vacationTypeMap } from '../../model/consts/vacationConsts';
import { DropdownItem } from '../../model/types/actionsDropdown';
import { DataType } from '../../model/types/tableVacation';
import {
    Vacation,
    VacationStatus,
    VacationType
} from '../../model/types/vacation';
import { useDeleteVacation } from '../api/vacationsListApi';

interface UserListProps {
    onEditVacation?: () => void;
    vacations?: Vacation[];
    isLoading?: boolean;
    error?: string;
    isOwner?: boolean;
}

export const VacationList = (props: UserListProps) => {
    const { vacations, error, isLoading, onEditVacation, isOwner } = props;
    const dispatch = useAppDispatch();
    const authData = useSelector(getUserAuthData);
    const [isPDFOpen, setIsPDFOpen] = useState<boolean>(false);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [deletedVacaionId, setDeletedVacaionId] = useState<
        string | undefined
    >(undefined);
    const [openedVacation, setOpenedVacation] = useState<Vacation>();
    const [fetchDeleteVacation, { isLoading: isDeleteLoading }] =
        useDeleteVacation();

    const data: DataType[] = [];
    const deleteDropdownItems: DropdownItem[] = [];
    const openPDFDropdownItems: DropdownItem[] = [];
    let dropdownItems: DropdownItem[] = [];

    vacations?.forEach((vacation) => {
        data.push({
            ...vacation,
            key: vacation._id
        });
    });

    const onCloseModal = useCallback(() => {
        setIsModalOpen(false);
    }, []);

    const onOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const deleteVacation = async () => {
        if (deletedVacaionId) {
            await fetchDeleteVacation({ vacationId: deletedVacaionId });
            await dispatch(fetchUserData(authData?._id || ''));
            onCloseModal();
            setDeletedVacaionId(undefined);
            onEditVacation?.();
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

        if (!isOwner) {
            return dropdownItems;
        }

        if (status === 'agreed') {
            dropdownItems.push({
                key: `${id}print`,
                label: 'Распечатать заявление',
                value: 'print',
                vacationid: id
            });

            openPDFDropdownItems.push({
                key: `${id}print`,
                label: 'Распечатать заявление',
                value: 'print',
                vacationid: id
            });
        }

        dropdownItems.push({
            key: id,
            label: 'Отменить',
            value: 'cancel',
            danger: true,
            vacationid: id
        });

        deleteDropdownItems.push({
            key: id,
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
            openPDFDropdownItems.find(
                (item) => item?.key === e.key && item.value === 'print'
            )
        ) {
            const currentVacation = vacations?.find(
                (vacation) => vacation._id === e.key.replace('print', '')
            );
            setOpenedVacation(currentVacation);

            return openPDF();
        }

        const currentItem = deleteDropdownItems.find(
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
            <PDFDocument
                isOpen={isPDFOpen}
                onOpen={setIsPDFOpen}
                name={formatName(
                    authData?.firstname,
                    authData?.lastname,
                    authData?.patronymic
                )}
                currentDate={formatCurrentDate(dayjs())}
                date={formatStartDate(openedVacation?.start)}
                daysCount={getDatesDiff(
                    openedVacation?.start,
                    openedVacation?.end
                )}
            />
            <Modal
                open={isModalOpen}
                onCancel={onCloseModal}
                onOk={deleteVacation}
                okText="Да, отменить"
                cancelText="Нет, вернуться"
                centered
            >
                <Spin spinning={isDeleteLoading}>
                    <Text size="M">
                        Вы уверены, что хотите отменить заявку?
                    </Text>
                </Spin>
            </Modal>
            <Table
                pagination={false}
                dataSource={data}
                style={{ width: '100%', marginTop: '20px' }}
                loading={isLoading}
            >
                <Column
                    title="Дата начала отпуска"
                    dataIndex="start"
                    key="start"
                    render={(date: string) => (
                        <HStack align="center" gap="8">
                            <Text>{formatStartDate(date.slice(0, 10))}</Text>
                            <Text size="S">({date.slice(0, 10)})</Text>
                        </HStack>
                    )}
                />
                <Column
                    title="Дата конца отпуска"
                    dataIndex="end"
                    key="end"
                    render={(date: string) => (
                        <HStack align="center" gap="8">
                            <Text>{formatStartDate(date.slice(0, 10))}</Text>
                            <Text size="S">({date.slice(0, 10)})</Text>
                        </HStack>
                    )}
                />
                <Column
                    title="Тип отпуска"
                    dataIndex="type"
                    key="type"
                    render={(type: VacationType) => vacationTypeMap[type]}
                />
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
