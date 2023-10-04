import { Sidebar } from '@/widgets/Sidebar';

import './styles/index.scss';
import { AppRouter } from './providers/router';

export const App = () => {
    const a = 0;

    return (
        <div className="app">
            <div className="content-page">
                <Sidebar />
                <AppRouter />
            </div>
        </div>
    );
};
