import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Button, Select } from 'antd';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import { userActions } from '@/entities/User';
import { classNames } from '@/shared/lib/helpers/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { getSidabarState, sidebarActions } from '@/widgets/Sidebar';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

export const Navbar = memo(({ className }: NavbarProps) => {
    const isOpen = useSelector(getSidabarState);
    const dispatch = useAppDispatch();
    const MenuIcon = isOpen ? MenuFoldOutlined : MenuUnfoldOutlined;

    const handleClick = () => {
        dispatch(sidebarActions.toggleState(!isOpen));
    };

    const onLogout = () => {
        dispatch(userActions.logout());
    };

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <HStack gap="4" justify="center" align="center">
                <Icon Icon={MenuIcon} onClick={handleClick} size={20} />
                <Text size="L" weight="bold_weight" className={cls.logo}>
                    ОтпускПлюс!
                </Text>
            </HStack>
            <div className={cls.selectWrapper}>
                <Select
                    defaultValue="Подразделение 1"
                    size="middle"
                    style={{ width: '100%' }}
                    onChange={undefined}
                    options={[
                        { value: 'Подразделение 1', label: 'Подразделение 1' },
                        { value: 'Подразделение 2', label: 'Подразделение 2' },
                        { value: 'Подразделение 3', label: 'Подразделение 3' }
                    ]}
                />
            </div>
            <Button type="primary" onClick={onLogout} className={cls.logout}>
                Выйти
            </Button>
        </nav>
    );
});
