import { useCallback } from 'react';
import { useSelector } from 'react-redux';

import {
    DivisionSelect,
    divisionActions,
    getCurrentDivisionId
} from '@/entities/Division';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const ChangeDivisionSelect = () => {
    const dispatch = useAppDispatch();
    const currentDivisionId = useSelector(getCurrentDivisionId);

    const onChangeDivision = useCallback(
        (divisionId: string) => {
            if (divisionId) {
                dispatch(divisionActions.changeDivision(divisionId));
            } else {
                dispatch(divisionActions.removeDivision());
            }
        },
        [dispatch]
    );

    return (
        <DivisionSelect
            onChangeDivision={onChangeDivision}
            selectOptions={[
                { value: 'all', label: 'Все', _id: 'all', divisionNumber: 0 }
            ]}
            value={currentDivisionId || ''}
            style={{ width: '180px' }}
        />
    );
};
