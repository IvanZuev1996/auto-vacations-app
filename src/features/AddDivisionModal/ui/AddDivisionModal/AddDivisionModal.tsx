import { Modal, Spin } from 'antd';
import { Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { getDivisionInited } from '@/entities/Division';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';

import { getAddDivisionModalData } from '../../model/selectors/addDivisionModal';
import { addDivision } from '../../model/services/addDivision';
import { AddDivisionFromAsync as AddDivisionFrom } from '../AddDivisionForm/AddDivisionForm.async';

interface AddEmployeeModalProps {
    isOpen?: boolean;
    onCloseModal?: () => void;
}

export const AddDivisionModal = (props: AddEmployeeModalProps) => {
    const { isOpen, onCloseModal } = props;
    const divisionInited = useSelector(getDivisionInited);
    const newDivisionData = useSelector(getAddDivisionModalData);
    const dispatch = useAppDispatch();

    const onAddDivision = useCallback(() => {
        if (!divisionInited) return;

        dispatch(addDivision(newDivisionData));
    }, [dispatch, divisionInited, newDivisionData]);

    return (
        <Modal
            footer={null}
            centered
            open={isOpen}
            width="40%"
            onCancel={onCloseModal}
            destroyOnClose
        >
            <Suspense
                fallback={
                    <HStack
                        align="center"
                        justify="center"
                        max
                        style={{ height: '60vh' }}
                    >
                        <Spin />
                    </HStack>
                }
            >
                <AddDivisionFrom
                    onSuccess={onAddDivision}
                    onCancel={onCloseModal}
                />
            </Suspense>
        </Modal>
    );
};
