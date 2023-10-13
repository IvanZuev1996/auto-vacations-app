import { Select } from 'antd';
import { useCallback } from 'react';

import { Division, divisionActions } from '@/entities/Division';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useDivisions } from '../api/changeDivisionSelectApi';

interface SelectOption extends Division {
    value: string;
    label: string;
}

export const ChangeDivisionSelect = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useDivisions();

    const options: SelectOption[] = [
        { value: 'Все', label: 'Все', _id: '', divisionNumber: 0 }
    ];

    data?.forEach((division) =>
        options.push({
            ...division,
            label: `Подразделение ${division.divisionNumber}`,
            value: String(division.divisionNumber)
        })
    );

    const onChangeDivision = useCallback(
        (value: string) => {
            const newDivision = data?.find(
                (item) => item.divisionNumber === Number(value)
            );
            if (newDivision) {
                dispatch(divisionActions.changeDivision(newDivision));
            } else {
                dispatch(divisionActions.removeDivision());
            }
        },
        [data, dispatch]
    );

    return (
        <Select
            defaultValue="Подразделение 1"
            size="middle"
            style={{ width: '160px' }}
            onChange={onChangeDivision}
            options={options}
        />
    );
};
