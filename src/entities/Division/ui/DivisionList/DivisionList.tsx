import { LinkOutlined } from '@ant-design/icons';
import { Button, Table } from 'antd';
import Column from 'antd/es/table/Column';
import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';

import { getCurrentDivisionId } from '../../model/selectors/division';
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
    const currentDivisionId = useSelector(getCurrentDivisionId);
    const data: Division[] = divisions;

    const onDivisionClick = useCallback(
        (id: string) => {
            if (id) {
                dispatch(divisionActions.changeDivision(id));
            }
        },
        [dispatch]
    );

    return (
        <Table
            pagination={false}
            dataSource={data}
            style={{ width: '100%' }}
            loading={isLoading}
        >
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
                    if (currentDivisionId === id) {
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
