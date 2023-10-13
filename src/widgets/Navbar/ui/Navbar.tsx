import {
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space } from 'antd';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import { getUserAuthData, userActions } from '@/entities/User';
import { ChangeDivisionSelect } from '@/features/ChangeDivisionSelect';
import { getRouteMain } from '@/shared/consts/router';
import { classNames } from '@/shared/lib/helpers/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
import { AppLink } from '@/shared/ui/AppLink';
import { Icon } from '@/shared/ui/Icon/Icon';
import { HStack } from '@/shared/ui/Stack';
import { Text } from '@/shared/ui/Text';
// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { getSidabarState, sidebarActions } from '@/widgets/Sidebar';

import cls from './Navbar.module.scss';

interface NavbarProps {
    className?: string;
}

const items = [
    {
        label: <AppLink to={getRouteMain()}>Мой профиль</AppLink>,
        key: '1',
        icon: <UserOutlined />
    },
    {
        key: '2',
        label: 'Выйти',
        icon: <LogoutOutlined />,
        danger: true
    }
];

export const Navbar = memo(({ className }: NavbarProps) => {
    const isOpen = useSelector(getSidabarState);
    const userData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const MenuIcon = isOpen ? MenuFoldOutlined : MenuUnfoldOutlined;

    const onLogout = () => {
        dispatch(userActions.logout());
    };

    const handleSidebarClick = () => {
        dispatch(sidebarActions.toggleState(!isOpen));
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (
            items.find((item) => item?.key === e.key && item.label === 'Выйти')
        ) {
            onLogout();
        }
    };

    const menuProps = {
        items,
        onClick: handleMenuClick
    };

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <HStack gap="4" justify="center" align="center">
                <Icon Icon={MenuIcon} onClick={handleSidebarClick} size={20} />
                <Text size="L" weight="bold_weight" className={cls.logo}>
                    ОтпускПлюс!
                </Text>
            </HStack>
            <div>
                <ChangeDivisionSelect />
            </div>
            <Dropdown
                menu={menuProps}
                trigger={['click']}
                className={cls.logout}
            >
                <Button>
                    <Space>
                        {`${userData?.firstname} ${userData?.lastname[0]}.`}
                        <DownOutlined />
                    </Space>
                </Button>
            </Dropdown>
        </nav>
    );
});
