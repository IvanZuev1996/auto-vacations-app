import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    DivisionSelect,
    divisionActions,
    getCurrentDivision,
    useDivisions
} from '@/entities/Division';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

export const ChangeDivisionSelect = () => {
    const dispatch = useAppDispatch();
    const { data } = useDivisions();
    const currentDivision = useSelector(getCurrentDivision);

    useEffect(() => {
        if (data) {
            dispatch(divisionActions.initDivision());
        }
    }, [data, dispatch]);

    const onChangeDivision = useCallback(
        (divisionId: string) => {
            const newDivision = data?.find((item) => item._id === divisionId);
            if (newDivision) {
                dispatch(divisionActions.changeDivision(newDivision));
            } else {
                dispatch(divisionActions.removeDivision());
            }
        },
        [data, dispatch]
    );

    return (
        <DivisionSelect
            onChangeDivision={onChangeDivision}
            selectOptions={[
                { value: 'Все', label: 'Все', _id: '', divisionNumber: 0 }
            ]}
            value={currentDivision?.name || 'Все'}
            style={{ width: '180px' }}
        />
    );
};
