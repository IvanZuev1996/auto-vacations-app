import { Select, SelectProps } from 'antd';

import { useAppDispatch } from '@/shared/lib/hooks/useAppDispatch/useAppDispatch';

import { useDivisions } from '../../api/divisionSelectApi';
import { Division } from '../../model/types/division';

interface SelectOption extends Division {
    value: string;
    label: string;
}

interface DivisionSelectProps extends SelectProps {
    selectOptions?: SelectOption[];
    onChangeDivision?: (divisionId: string) => void;
}

export const DivisionSelect = (props: DivisionSelectProps) => {
    const {
        selectOptions = [],
        onChangeDivision,
        value,
        style,
        placeholder,
        ...otherProps
    } = props;
    const dispatch = useAppDispatch();
    const { data, isLoading, error } = useDivisions();

    const options: SelectOption[] = [...selectOptions];

    data?.forEach((division) =>
        options.push({
            ...division,
            label: `Подразделение ${division.divisionNumber}`,
            value: division._id
        })
    );

    if (error) {
        return (
            <Select
                disabled
                value="Произошла ошибка"
                size="middle"
                style={style}
            />
        );
    }

    return (
        <Select
            loading={isLoading}
            disabled={isLoading}
            value={isLoading ? 'Загрузка...' : value}
            size="middle"
            style={style}
            onChange={onChangeDivision}
            options={options}
            {...otherProps}
        />
    );
};
