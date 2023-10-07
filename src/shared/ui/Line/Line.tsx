import { classNames } from '@/shared/lib/helpers/classNames';

import cls from './Line.module.scss';

interface LineProps {
    className?: string;
    height?: number;
}

export const Line = ({ className, height = 3 }: LineProps) => (
    <hr
        className={classNames(cls.Line, {}, [className])}
        style={{ height: `${height}px` }}
    />
);
