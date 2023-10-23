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

export const getCurrentEnging = (date: number) => {
    const lastDigit = date % 10;
    const lastTwoDigits = date % 100;

    if (lastTwoDigits >= 11 && lastTwoDigits <= 20) {
        return `${date} дней`;
    }

    if (lastDigit === 1) {
        return `${date} день`;
    }

    if (lastDigit >= 2 && lastDigit <= 4) {
        return `${date} дня`;
    }

    return `${date} дней`;
};
