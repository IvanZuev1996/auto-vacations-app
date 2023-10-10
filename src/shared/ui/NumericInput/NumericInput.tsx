import { Input, Tooltip } from 'antd';
import React from 'react';

interface NumericInputProps {
    style?: React.CSSProperties;
    value: string;
    onChange: (value: string) => void;
}

const formatNumber = (value: number) => new Intl.NumberFormat().format(value);

export const NumericInput = (props: NumericInputProps) => {
    const { value = '', onChange } = props;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };
    const handleBlur = () => {
        let valueTemp = value;
        if (value.charAt(value.length - 1) === '.' || value === '-') {
            valueTemp = value.slice(0, -1);
        }
        onChange(valueTemp.replace(/0*(\d+)/, '$1'));
    };

    const title = value ? (
        <span className="numeric-input-title">
            {value !== '-' ? formatNumber(Number(value)) : '-'}
        </span>
    ) : (
        '0'
    );

    return (
        <Tooltip
            trigger={['focus']}
            title={title}
            placement="topLeft"
            overlayClassName="numeric-input"
        >
            <Input
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="0"
                maxLength={16}
            />
        </Tooltip>
    );
};
