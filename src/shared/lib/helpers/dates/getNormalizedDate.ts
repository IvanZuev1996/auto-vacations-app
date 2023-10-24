export const getNormalizedDate = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    const currentMonth = month < 10 ? `0${month}` : `${month}`;
    const currentDay = day < 10 ? `0${day}` : `${day}`;

    return `${year}-${currentMonth}-${currentDay}`;
};
