import { useSelector } from 'react-redux';

import { getIsUserAdmin } from '@/entities/User';

import { AdminVacationDetailsPage } from '../AdminVacationDetailsPage';
import { UserVacationDetailsPage } from '../UserVacationDetailsPage';

const VacationDetailsPage = () => {
    const isAdmin = useSelector(getIsUserAdmin);

    if (isAdmin) {
        return <AdminVacationDetailsPage />;
    }

    return <UserVacationDetailsPage />;
};

export default VacationDetailsPage;
