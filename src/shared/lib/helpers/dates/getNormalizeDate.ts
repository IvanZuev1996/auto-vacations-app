export const getNormalizeDate = (year: number, month: number, day?: number) => {
    if (day) {
        return `${year}-${month}-${day}`;
    }

    return `${year}-${month}`;
};
