import { Select } from 'antd';
import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import {
    Division,
    divisionActions,
    getCurrentDivision
} from '@/entities/Division';
import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useDivisions } from '../api/changeDivisionSelectApi';

interface SelectOption extends Division {
    value: string;
    label: string;
}

export const ChangeDivisionSelect = () => {
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useDivisions();
    const currentDivision = useSelector(getCurrentDivision);

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

    useEffect(() => {
        if (data) {
            dispatch(divisionActions.initDivision());
        }
    }, [data, dispatch]);

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
            loading={isLoading}
            disabled={isLoading}
            value={
                isLoading
                    ? 'Загрузка...'
                    : String(currentDivision?.divisionNumber || 'Все')
            }
            size="middle"
            style={{ width: '180px' }}
            onChange={onChangeDivision}
            options={options}
        />
    );
};
