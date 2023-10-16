import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    DivisionSelect,
    divisionActions,
    getCurrentDivisionId,
    useDivisions
} from '@/entities/Division';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const ChangeDivisionSelect = () => {
    const dispatch = useAppDispatch();
    const { data } = useDivisions();
    const currentDivisionId = useSelector(getCurrentDivisionId);

    useEffect(() => {
        if (data) {
            dispatch(divisionActions.initDivision());
        }
    }, [data, dispatch]);

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
                { value: '', label: 'Все', _id: '', divisionNumber: 0 }
            ]}
            value={currentDivisionId || ''}
            style={{ width: '180px' }}
        />
    );
};
