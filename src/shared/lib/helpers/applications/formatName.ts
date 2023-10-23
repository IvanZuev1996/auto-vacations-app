export const formatName = (
    firstname?: string,
    lastname?: string,
    patronymic?: string
) => {
    if (!firstname || !lastname) {
        return '';
    }

    const formattedFirstname = firstname.charAt(0).toUpperCase();
    const formattedPatronymic = patronymic
        ? patronymic.charAt(0).toUpperCase()
        : '';

    const formattedLastname = `${lastname}а`;

    const formattedName = `${formattedFirstname}.${formattedPatronymic}. ${formattedLastname}`;

    return formattedName;
};
