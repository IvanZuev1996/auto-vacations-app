import { StateSchema } from '@/app/providers/StoreProvider';
import { getCurrentDate } from '@/shared/lib/helpers/dates';

const { currentMonth, currentYear } = getCurrentDate();

export const getVacationsPageIsLoading = (state: StateSchema) =>
    state.vacationsPage?.isLoading;
export const getVacationsPageError = (state: StateSchema) =>
    state.vacationsPage?.error;
export const getVacationsPageMonth = (state: StateSchema) =>
    state.vacationsPage?.selectors.month || currentMonth;
export const getVacationsPageYear = (state: StateSchema) =>
    state.vacationsPage?.selectors.year || currentYear;
export const getVacationsPageView = (state: StateSchema) =>
    state.vacationsPage?.selectors.view || 'month';
