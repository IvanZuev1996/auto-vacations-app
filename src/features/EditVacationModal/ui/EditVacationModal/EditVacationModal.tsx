import { Modal, Spin } from 'antd';
import { Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';

import { getEditVacationModalData } from '../../model/selectors/editVacationModal';
import { editVacation } from '../../model/services/editVacation';
import { EditVacationFormAsync as EditVacationForm } from '../EditVacationForm/EditVacationForm.async';

interface EditVacationModalProps {
    isOpen?: boolean;
    onCloseModal?: () => void;
}

export const EditVacationModal = (props: EditVacationModalProps) => {
    const { isOpen, onCloseModal } = props;
    const dispatch = useAppDispatch();
    const vacationData = useSelector(getEditVacationModalData);

    const onEditVacation = useCallback(async () => {
        await dispatch(editVacation(vacationData));
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
                <EditVacationForm
                    onCancel={onCloseModal}
                    onSuccess={onEditVacation}
                />
            </Suspense>
        </Modal>
    );
};
