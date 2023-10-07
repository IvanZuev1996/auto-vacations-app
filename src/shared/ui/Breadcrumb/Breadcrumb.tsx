import { Breadcrumb as AntdBreadcrumb } from 'antd';
import {
    BreadcrumbItemType,
    BreadcrumbSeparatorType
} from 'antd/es/breadcrumb/Breadcrumb';
import { useLocation } from 'react-router-dom';

import { AppLink } from '../AppLink';

export const Breadcrumb = () => {
    const location = useLocation();
    const paths = location.pathname.split('/').slice(1);

    const items: Partial<BreadcrumbItemType & BreadcrumbSeparatorType>[] = [];

    paths.forEach((item) => {
        items.push({
            title: <AppLink to={`/${item}`}>{item || 'Home'}</AppLink>
        });
    });

    return <AntdBreadcrumb items={items} />;
};
