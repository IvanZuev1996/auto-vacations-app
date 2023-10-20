import { Modal, Spin } from 'antd';
import { Suspense } from 'react';

import { HStack } from '@/shared/ui/Stack';

import { ApproveVacationFormAsync as ApproveVacationForm } from '../ApproveVacationForm/ApproveVacationForm.async';

interface ApproveVacationModalProps {
    isOpen?: boolean;
    onCloseModal?: () => void;
    onApprove?: () => void;
}

export const ApproveVacationModal = (props: ApproveVacationModalProps) => {
    const { isOpen, onCloseModal, onApprove } = props;

    return (
        <Modal
            okText="Согласовать"
            cancelText="Отменить"
            open={isOpen}
            onOk={onApprove}
            onCancel={onCloseModal}
            centered
            width="30%"
            destroyOnClose
        >
            <Suspense
                fallback={
                    <HStack
                        align="center"
                        justify="center"
                        max
                        style={{ height: '40vh' }}
                    >
                        <Spin />
                    </HStack>
                }
            >
                <ApproveVacationForm onSuccess={onCloseModal} />
            </Suspense>
        </Modal>
    );
};
