import { ReactNode, memo } from 'react';

import { classNames } from '@/shared/lib/helpers/classNames';

import cls from './Text.module.scss';

type TextSize = 'XS' | 'S' | 'M' | 'L' | 'XL';
type HeaderTagType = 'h1' | 'h2' | 'h3' | 'p';
type TextTheme = 'primary' | 'error';
type TextAlign = 'center' | 'left' | 'right';
type TextWeight = 'normal_weight' | 'bold_weight';

interface TextProps {
    className?: string;
    theme?: TextTheme;
    align?: TextAlign;
    size?: TextSize;
    weight?: TextWeight;
    max?: boolean;
    children?: ReactNode;
}

const mapSizeToHeaderTag: Record<TextSize, HeaderTagType> = {
    XS: 'p',
    S: 'p',
    M: 'h3',
    L: 'h2',
    XL: 'h1'
};

export const Text = memo((props: TextProps) => {
    const {
        className,
        children,
        align = 'left',
        theme = 'primary',
        size = 'S',
        max,
        weight = 'normal_weight'
    } = props;

    const HeaderTag = mapSizeToHeaderTag[size];

    return (
        <div
            className={classNames('', { [cls.max]: max }, [
                className,
                cls[theme],
                cls[align],
                cls[size]
            ])}
        >
            {children && (
                <HeaderTag className={classNames(cls.text, {}, [cls[weight]])}>
                    {children}
                </HeaderTag>
            )}
        </div>
    );
});
