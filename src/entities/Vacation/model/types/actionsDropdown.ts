import { ReactNode } from 'react';

export interface DropdownItem {
    key: string;
    label: ReactNode;
    value: string;
    vacationid: string;
    danger?: boolean;
}
