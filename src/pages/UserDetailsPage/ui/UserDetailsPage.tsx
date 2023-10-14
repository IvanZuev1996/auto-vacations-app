import { useParams } from 'react-router-dom';

import { Breadcrumb } from '@/shared/ui/Breadcrumb/Breadcrumb';
import { Page } from '@/widgets/Page';

const UserDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    return (
        <Page>
            <Breadcrumb />
            {id}
        </Page>
    );
};

export default UserDetailsPage;
