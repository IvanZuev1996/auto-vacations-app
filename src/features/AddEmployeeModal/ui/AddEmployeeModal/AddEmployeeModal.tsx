import { Modal, Spin } from 'antd';
import { Suspense, useCallback } from 'react';
import { useSelector } from 'react-redux';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { getAddEmployeeUserData } from '../../model/selectors/addEmployeeModal';
import { addEmployee } from '../../model/services/addEmployee';
import { AddEmployeeFormAsync as AddEmployeeForm } from '../AddEmployeeForm/AddEmployeeForm.async';

interface AddEmployeeModalProps {
    isOpen?: boolean;
    onCloseModal?: () => void;
}

export const AddEmployeeModal = (props: AddEmployeeModalProps) => {
    const { isOpen, onCloseModal } = props;
    const createdUserData = useSelector(getAddEmployeeUserData);
    const dispatch = useAppDispatch();

    const onAddEmployee = useCallback(() => {
        dispatch(addEmployee(createdUserData));
    }, [createdUserData, dispatch]);

    return (
        <Modal
            footer={null}
            centered
            open={isOpen}
            width="60%"
            onCancel={onCloseModal}
            destroyOnClose
        >
            <Suspense fallback={<Spin />}>
                <AddEmployeeForm
                    onCancel={onCloseModal}
                    onSuccess={onAddEmployee}
                />
            </Suspense>
        </Modal>
    );
};
