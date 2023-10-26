const vowelChars: string[] = ['а', 'у', 'о', 'ы', 'и', 'э', 'я', 'ю', 'ё', 'е'];

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

    const formattedLastname = vowelChars.includes(lastname[lastname.length - 1])
        ? lastname
        : `${lastname}а`;

    const formattedName = `${formattedFirstname}.${formattedPatronymic}. ${formattedLastname}`;

    return formattedName;
};
