import { Card } from 'antd';
import { useRef } from 'react';
import { useDraggable } from 'react-use-draggable-scroll';

import { Mods, classNames } from '@/shared/lib/helpers/classNames';
import { HStack, VStack } from '@/shared/ui/Stack';

import cls from './Table.module.scss';

interface Vacation {
    end: number;
    start: number;
}

interface TableProps {
    vacations?: Vacation[];
    className?: string;
}

export const Table = ({ vacations, className }: TableProps) => {
    const daysList = new Array(31).fill(0).map((_, index) => index + 1);
    const ref =
        useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;
    const { events } = useDraggable(ref, {
        applyRubberBandEffect: true
    });

    const mapDaysList = (item: number, visible?: boolean) => {
        const isOdd = item % 2 === 0;

        return (
            <div className={classNames(cls.item, { [cls.odd]: isOdd })}>
                {visible && item}
            </div>
        );
    };

    const mapActiveList = (item: any, index: number) => {
        const isEnd = index === item.end;
        const isStart = index === item.start;

        const mods: Mods = {
            [cls.end]: isEnd,
            [cls.start]: isStart
        };

        if (index >= item.start && index <= item.end) {
            return <div className={classNames(cls.active, mods)} />;
        }

        return mapDaysList(index);
    };

    return (
        <Card
            className={classNames(cls.Card, {}, [className])}
            ref={ref}
            {...events}
        >
            <HStack justify="start" align="start" max>
                <VStack style={{ marginTop: '40px' }}>
                    {vacations?.map(() => (
                        <div className={cls.name}>Иванов И.И.</div>
                    ))}
                </VStack>
                <VStack max>
                    <HStack justify="start" className={cls.days} max>
                        {daysList.map((item) => mapDaysList(item, true))}
                    </HStack>
                    {vacations?.map((item) => (
                        <HStack justify="start" className={cls.rows} max>
                            {daysList.map((index) =>
                                mapActiveList(item, index)
                            )}
                        </HStack>
                    ))}
                </VStack>
            </HStack>
        </Card>
    );
};

export default Table;
