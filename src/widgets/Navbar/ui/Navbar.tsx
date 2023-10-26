import {
    DownOutlined,
    LogoutOutlined,
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Space, Tag } from 'antd';
import { memo } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { divisionActions } from '@/entities/Division';
import { getUserAuthData, getIsUserAdmin, userActions } from '@/entities/User';
import { ChangeDivisionSelect } from '@/features/ChangeDivisionSelect';
import { getRouteMain, getRouteProfile } from '@/shared/consts/router';
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

export const Navbar = memo(({ className }: NavbarProps) => {
    const isOpen = useSelector(getSidabarState);
    const userData = useSelector(getUserAuthData);
    const dispatch = useAppDispatch();
    const isUserAdmin = useSelector(getIsUserAdmin);
    const navigate = useNavigate();
    const MenuIcon = isOpen ? MenuFoldOutlined : MenuUnfoldOutlined;

    const items = [
        {
            label: (
                <AppLink to={getRouteProfile(userData?._id || '')}>
                    Мой профиль
                </AppLink>
            ),
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

    const onLogout = () => {
        dispatch(userActions.logout());
        dispatch(divisionActions.removeDivision());
    };

    const handleSidebarClick = () => {
        dispatch(sidebarActions.toggleState(!isOpen));
    };

    const handleMenuClick: MenuProps['onClick'] = (e) => {
        if (
            items.find((item) => item?.key === e.key && item.label === 'Выйти')
        ) {
            onLogout();
            navigate(getRouteMain());
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
                <Link to={getRouteMain()}>
                    <Text size="L" weight="bold_weight" className={cls.logo}>
                        ОтпускПлюс!
                    </Text>
                </Link>
            </HStack>

            {isUserAdmin && <ChangeDivisionSelect />}

            <HStack align="center" gap="12" className={cls.logout}>
                <Tag>
                    Вы зашли как {isUserAdmin ? 'руководитель' : 'сотрудник'}
                </Tag>
                <Dropdown menu={menuProps} trigger={['click']}>
                    <Button>
                        <Space>
                            {`${userData?.lastname} ${userData?.firstname[0]}.${userData?.patronymic?.[0]}.`}
                            <DownOutlined />
                        </Space>
                    </Button>
                </Dropdown>
            </HStack>
        </nav>
    );
});
