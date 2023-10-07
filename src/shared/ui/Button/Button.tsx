import { Button as AntdButton, ButtonProps as AntdButtonProps } from 'antd';
import { CSSProperties, ReactNode } from 'react';

type ButtonSize = 'S' | 'M' | 'L' | 'XL';

interface ButtonProps
    extends Omit<AntdButtonProps, 'size' | 'disabled' | 'className'> {
    className?: string;
    size?: ButtonSize;
    disabled?: boolean;
    children?: ReactNode;
}

const ButtonSizeMapper: Record<ButtonSize, number> = {
    S: 13,
    M: 15,
    L: 17,
    XL: 19
};

export const Button = (props: ButtonProps) => {
    const { className, size = 'S', disabled, children, ...otherProps } = props;
    const currentSize = ButtonSizeMapper[size];

    const styles: CSSProperties = {
        fontSize: `${currentSize}px`,
        justifyContent: 'center',
        display: 'flex',
        alignItems: 'center'
    };

    return (
        <AntdButton
            className={className}
            disabled={disabled}
            style={styles}
            {...otherProps}
        >
            Выйти
        </AntdButton>
    );
};
