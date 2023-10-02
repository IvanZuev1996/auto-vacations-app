import { createRoot } from 'react-dom/client';

import App from './App';

const container = document.getElementById('root');

if (!container) {
    throw new Error(
        'Не удалось вмонтировать реакт приложение!: Не найден root'
    );
}

const root = createRoot(container);

root.render(<App/>);
