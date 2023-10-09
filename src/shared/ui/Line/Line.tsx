import { classNames } from '@/shared/lib/helpers/classNames';

import cls from './Line.module.scss';

interface LineProps {
    className?: string;
    height?: number;
    margin?: number;
}

export const Line = ({ className, height = 3, margin = 10 }: LineProps) => (
    <hr
        className={classNames(cls.Line, {}, [className])}
        style={{ height: `${height}px`, margin: `${10}px 0` }}
    />
);
