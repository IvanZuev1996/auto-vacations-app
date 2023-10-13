import { Modal, Spin } from 'antd';
import { Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';

import { getAddVacationModalData } from '../../model/selectors/addVacationModal';
import { addVacation } from '../../model/services/addVacation';
import { AddVacationFormAsync as AddVacationForm } from '../AddVacationForm/AddVacationForm.async';

interface AddVacationModalProps {
    isOpen?: boolean;
    onCloseModal?: () => void;
}

export const AddVacationModal = (props: AddVacationModalProps) => {
    const { isOpen, onCloseModal } = props;
    const dispatch = useAppDispatch();
    const vacationData = useSelector(getAddVacationModalData);

    const onAddVacation = useCallback(() => {
        dispatch(addVacation(vacationData));
    }, [dispatch, vacationData]);

    return (
        <Modal
            footer={null}
            centered
            open={isOpen}
            width="60%"
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
                <AddVacationForm
                    onCancel={onCloseModal}
                    onSuccess={onAddVacation}
                />
            </Suspense>
        </Modal>
    );
};
