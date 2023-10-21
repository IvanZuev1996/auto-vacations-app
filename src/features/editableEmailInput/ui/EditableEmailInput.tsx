import { EditOutlined } from '@ant-design/icons';
import { Button, Input, Modal } from 'antd';
import { ChangeEvent, useCallback, useEffect, useState } from 'react';

import { Icon } from '@/shared/ui/Icon/Icon';
import { HStack, VStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';

import { useUpdateUserEmail } from '../api/editableEmailInputApi';

interface EditableEmailInputProps {
    email?: string;
    userId: string;
}

export const EditableEmailInput = ({
    userId,
    email = ''
}: EditableEmailInputProps) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(true);
    const [newEmail, setNewEmail] = useState<string>(email);
    const [updateUserEmail, { isSuccess }] = useUpdateUserEmail();
    const [isSuccessModalOpen, setIsSuccessModalOpen] =
        useState<boolean>(false);

    useEffect(() => {
        setIsSuccessModalOpen(isSuccess);
    }, [isSuccess]);

    const onChangeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setNewEmail(e.target.value);
    }, []);

    const onIconClick = useCallback(() => {
        setIsDisabled(false);
    }, []);

    const onCancelEdit = useCallback(() => {
        setIsDisabled(true);
        setIsSuccessModalOpen(false);
    }, []);

    const onSaveEmail = useCallback(() => {
        updateUserEmail({ email: newEmail, userId });
        setIsDisabled(true);
    }, [newEmail, updateUserEmail, userId]);

    return (
        <>
            <Modal
                footer={null}
                open={isSuccessModalOpen}
                onCancel={onCancelEdit}
                centered
            >
                <VStack align="start" gap="8" max>
                    <Text size="M">Email успешно обновлен!</Text>
                    <Button
                        type="primary"
                        onClick={onCancelEdit}
                        style={{ marginLeft: 'auto' }}
                    >
                        Ок
                    </Button>
                </VStack>
            </Modal>
            <VStack justify="center" gap="8" max>
                <Text>Почта для уведомлений</Text>
                <HStack align="center" gap="8" max>
                    <Input
                        value={newEmail}
                        onChange={onChangeEmail}
                        placeholder="Введите ваш email"
                        disabled={isDisabled}
                    />
                    {isDisabled && (
                        <Icon
                            Icon={EditOutlined}
                            clicked
                            onClick={onIconClick}
                        />
                    )}
                </HStack>
                {!isDisabled && (
                    <HStack
                        align="center"
                        gap="8"
                        style={{ marginLeft: 'auto' }}
                    >
                        <Button type="text" onClick={onCancelEdit}>
                            Отменить
                        </Button>
                        <Button type="primary" onClick={onSaveEmail}>
                            Сохранить
                        </Button>
                    </HStack>
                )}
            </VStack>
        </>
    );
};
