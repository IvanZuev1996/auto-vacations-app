import {
    CommentOutlined,
    LineChartOutlined,
    PartitionOutlined,
    UserOutlined,
    UsergroupAddOutlined,
    CalendarOutlined,
    HomeOutlined,
    InsertRowAboveOutlined
} from '@ant-design/icons';
import { createSelector } from '@reduxjs/toolkit';

import { getUserAuthData } from '@/entities/User';
import {
    getRouteApplications,
    getRouteDivisions,
    getRouteEmployeeList,
    getRouteMain,
    getRouteOtherVacations,
    getRouteProfile,
    getRouteStatistics,
    getRouteVacations
} from '@/shared/consts/router';

import { SidebarItemType } from '../types/sidebar';

export const getSidebarLinks = createSelector(getUserAuthData, (authData) => {
    const links: SidebarItemType[] = [
        {
            title: 'Главная',
            path: getRouteMain(),
            icon: HomeOutlined
        },
        {
            title: 'График отпусков',
            path: getRouteVacations(),
            icon: CalendarOutlined,
            adminOnly: false
        },
        {
            title: 'Иные отпуска',
            path: getRouteOtherVacations(),
            icon: InsertRowAboveOutlined,
            adminOnly: true
        },
        {
            title: 'Сотрудники',
            path: getRouteEmployeeList(),
            icon: UsergroupAddOutlined,
            adminOnly: true
        },
        {
            title: 'Заявки',
            path: getRouteApplications(authData?._id || ''),
            icon: CommentOutlined,
            userOnly: true
        },
        {
            title: 'Профиль',
            path: getRouteProfile(authData?._id || ''),
            icon: UserOutlined
        },
        {
            title: 'Подразделения',
            path: getRouteDivisions(),
            icon: PartitionOutlined,
            adminOnly: true
        },
        {
            title: 'Статистика',
            path: getRouteStatistics(),
            icon: LineChartOutlined
        }
    ];

    return links;
});
