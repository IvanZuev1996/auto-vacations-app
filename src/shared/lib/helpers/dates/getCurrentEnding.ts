const daysEndingMap: Record<number, string> = {
    0: 'дней',
    1: 'день',
    2: 'дня',
    3: 'дня',
    4: 'дня',
    5: 'дней',
    6: 'дней',
    7: 'дней',
    8: 'дней',
    9: 'дней'
};

export const getCurrentEnging = (date: number) =>
    `${date} ${daysEndingMap[date % 10]}`;
