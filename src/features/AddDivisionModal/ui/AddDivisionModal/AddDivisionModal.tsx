import { Modal, Spin } from 'antd';
import { Suspense } from 'react';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { HStack } from '@/shared/ui/Stack';

import { AddDivisionFromAsync as AddDivisionFrom } from '../AddDivisionForm/AddDivisionForm.async';

interface AddEmployeeModalProps {
    isOpen?: boolean;
    onCloseModal?: () => void;
}

export const AddDivisionModal = (props: AddEmployeeModalProps) => {
    const { isOpen, onCloseModal } = props;
    const dispatch = useAppDispatch();

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
                <AddDivisionFrom />
            </Suspense>
        </Modal>
    );
};
