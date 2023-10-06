import { StateSchema } from '@/app/providers/StoreProvider';

export const getSidabarState = (state: StateSchema) => state.sidebar.isOpen;
