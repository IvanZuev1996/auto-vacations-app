import { LinkOutlined } from '@ant-design/icons';
import { Button, Card, Spin, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';

import { getCurrentDivision } from '../../model/selectors/division';
import { divisionActions } from '../../model/slice/divisionSlice';
import { Division } from '../../model/types/division';

import cls from './DivisionList.module.scss';

interface DivisionListProps {
    divisions: Division[];
    isLoading?: boolean;
    error?: string;
}

export const DivisionList = (props: DivisionListProps) => {
    const { divisions, error, isLoading } = props;
    const dispatch = useAppDispatch();
    const currentDivision = useSelector(getCurrentDivision);
    const data: Division[] = divisions;

    const onDivisionClick = useCallback(
        (id: string) => {
            const newDivision = divisions.find((el) => el._id === id);

            if (newDivision) {
                dispatch(divisionActions.changeDivision(newDivision));
            }
        },
        [dispatch, divisions]
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
            <Column
                title="№ Подразделения"
                dataIndex="divisionNumber"
                key="divisionNumber"
            />
            <Column
                title="Название подразделения"
                dataIndex="name"
                key="name"
            />
            <Column
                title="Дата добавления"
                dataIndex="createdAt"
                key="createdAt"
                render={(createdAt: string) => createdAt.slice(0, 10)}
            />
            <Column
                dataIndex="_id"
                key="_id"
                render={(id: string) => {
                    if (currentDivision?._id === id) {
                        return (
                            <Button type="text" disabled>
                                Выбрано
                            </Button>
                        );
                    }

                    return (
                        <Button type="link" onClick={() => onDivisionClick(id)}>
                            <HStack align="center" gap="8" className={cls.link}>
                                Перейти к подразделению
                                <LinkOutlined />
                            </HStack>
                        </Button>
                    );
                }}
            />
        </Table>
    );
};
