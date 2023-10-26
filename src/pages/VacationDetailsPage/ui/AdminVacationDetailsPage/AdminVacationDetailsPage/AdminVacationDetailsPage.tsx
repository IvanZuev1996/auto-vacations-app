import { Card, Descriptions } from 'antd';
import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';

import { useDivisionById } from '@/entities/Division';
import { vacationTypeMap } from '@/entities/Vacation';
import {
    ApproveVacationModal,
    useApproveVacation,
    useLazyVacation
} from '@/features/ApproveVacationModal';
import {
    EditVacationModal,
    getEditVacationModalIsSuccess
} from '@/features/EditVacationModal';
import { getRouteVacations } from '@/shared/consts/router';
import { formatStartDate } from '@/shared/lib/helpers/applications/formatStartDate';
import {
    getCurrentEnging,
    getNormalizedDate
} from '@/shared/lib/helpers/dates';
import { Line } from '@/shared/ui/Line';
import { HStack } from '@/shared/ui/Stack';
import { TagElement } from '@/shared/ui/TagElement/TagElement';
import { Text } from '@/shared/ui/Text';
import { Page } from '@/widgets/Page';
import { PageLoader } from '@/widgets/PageLoader';

import { AdminVacationDetailsPageActions } from '../AdminVacationDetailsPageActions/AdminVacationDetailsPageActions';
import { AdminVacationDetailsPageAlert } from '../AdminVacationDetailsPageAlert/AdminVacationDetailsPageAlert';

import cls from './AdminVacationDetailsPage.module.scss';

const AdminVacationDetailsPage = () => {
    const { id = '' } = useParams<{ id: string }>();
    const [fetchVaction, { data, isLoading, isFetching }] = useLazyVacation();
    const { data: divisionData, isLoading: isDivisionLoading } =
        useDivisionById({
            id: data?.user?.division || ''
        });
    const [approveVacation, { isSuccess: isApprove }] = useApproveVacation();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [isCancelModalOpen, setIsCancelModalOpen] = useState<boolean>(false);
    const isSuccessEditVacation = useSelector(getEditVacationModalIsSuccess);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            await fetchVaction({ id }, false);
        };

        fetchData();
    }, [fetchVaction, id]);

    const user = data?.user;
    const isPending = data?.status === 'pending';
    const isSuccess = data?.status === 'agreed';

    const onCloseModal = useCallback(() => {
        setIsModalOpen(false);

        if (isApprove) {
            navigate(getRouteVacations());
        }
    }, [isApprove, navigate]);

    const onCloseCancelModal = useCallback(async () => {
        setIsCancelModalOpen(false);

        if (isSuccessEditVacation) {
            await fetchVaction({ id }, false);
        }
    }, [fetchVaction, id, isSuccessEditVacation]);

    const onOpenModal = useCallback(() => {
        setIsModalOpen(true);
    }, []);

    const onOpenCancelModal = useCallback(() => {
        setIsCancelModalOpen(true);
    }, []);

    const onApprove = useCallback(async () => {
        await approveVacation({ id });
        navigate(getRouteVacations());
    }, [approveVacation, id, navigate]);

    if (!data || isLoading || isFetching) {
        return <PageLoader />;
    }

    return (
        <Page>
            <ApproveVacationModal
                isOpen={isModalOpen}
                onCloseModal={onCloseModal}
                onApprove={onApprove}
            />
            <EditVacationModal
                isOpen={isCancelModalOpen}
                onCloseModal={onCloseCancelModal}
            />
            <HStack justify="between" gap="16" align="center" max>
                <Text size="L" weight="bold_weight">
                    Заявка на отпуск
                </Text>
            </HStack>
            <Line />
            <Card className={cls.card}>
                {isPending && (
                    <AdminVacationDetailsPageActions
                        onSuccess={onOpenModal}
                        onCancel={onOpenCancelModal}
                    />
                )}
                {isSuccess && <AdminVacationDetailsPageAlert status="agreed" />}
                <HStack align="center" justify="between" max>
                    <HStack
                        align="start"
                        justify="start"
                        gap="16"
                        max
                        className={cls.content}
                    >
                        <Descriptions
                            title="Информация о заявке"
                            column={1}
                            style={{ width: '100%' }}
                        >
                            <Descriptions.Item label="Дата начала отпуска">
                                <HStack align="center" gap="8">
                                    <Text>
                                        {formatStartDate(
                                            getNormalizedDate(
                                                new Date(data?.start)
                                            )
                                        )}
                                    </Text>
                                    <Text>
                                        (
                                        {dayjs(
                                            getNormalizedDate(
                                                new Date(data?.start)
                                            )
                                        ).format('DD-MM-YYYY')}
                                        )
                                    </Text>
                                </HStack>
                            </Descriptions.Item>
                            <Descriptions.Item label="Дата конца отпуска">
                                <HStack align="center" gap="8">
                                    <Text>
                                        {formatStartDate(
                                            getNormalizedDate(
                                                new Date(data?.end)
                                            )
                                        )}
                                    </Text>
                                    <Text>
                                        (
                                        {dayjs(
                                            getNormalizedDate(
                                                new Date(data?.end)
                                            )
                                        ).format('DD-MM-YYYY')}
                                        )
                                    </Text>
                                </HStack>
                            </Descriptions.Item>
                            <Descriptions.Item label="Статус заявки">
                                <TagElement status={data.status} />
                            </Descriptions.Item>
                            <Descriptions.Item label="Тип отпуска">
                                {vacationTypeMap[data.type]}
                            </Descriptions.Item>
                        </Descriptions>
                        <Descriptions
                            title="Информация о сотруднике"
                            column={1}
                            style={{ width: '100%' }}
                        >
                            <Descriptions.Item label="ФИО">
                                {`${user?.lastname} ${user?.firstname} ${user?.patronymic}`}
                            </Descriptions.Item>
                            <Descriptions.Item label="Подразделение">
                                {isDivisionLoading ? (
                                    'Загрузка...'
                                ) : (
                                    <HStack align="center" gap="8">
                                        <Text>
                                            {divisionData?.divisionNumber}
                                        </Text>
                                        <Text>({divisionData?.name})</Text>
                                    </HStack>
                                )}
                            </Descriptions.Item>
                            <Descriptions.Item label="Текущий баланс">
                                {getCurrentEnging(user?.balance || 0)}
                            </Descriptions.Item>
                            <Descriptions.Item label="Должность">
                                {user?.post}
                            </Descriptions.Item>
                            <Descriptions.Item label="Дата начала работы">
                                {formatStartDate(
                                    getNormalizedDate(
                                        new Date(user?.startWork || '')
                                    )
                                )}
                            </Descriptions.Item>
                        </Descriptions>
                    </HStack>
                </HStack>
            </Card>
        </Page>
    );
};

export default AdminVacationDetailsPage;
