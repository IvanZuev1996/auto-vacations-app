import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';
import { Select } from 'antd';
import { memo } from 'react';
import { useSelector } from 'react-redux';

import { classNames } from '@/shared/lib/helpers/classNames';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';
// eslint-disable-next-line babun4ek-fsd-plugin/layer-imports-checker
import { Icon } from '@/shared/ui/Icon/Icon';
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

    return (
        <nav className={classNames(cls.Navbar, {}, [className])}>
            <div className={cls.logoSection}>
                <Icon Icon={MenuIcon} onClick={handleClick} size={20} />
                <h2 className={cls.logo}>ОтпускПлюс!</h2>
            </div>
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
        </nav>
    );
});
