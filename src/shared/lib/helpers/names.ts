interface getShortNameProps {
    firstname: string;
    lastname: string;
    patronymic?: string;
}

export const getShortName = ({
    firstname,
    lastname,
    patronymic = ''
}: getShortNameProps) =>
    `${lastname} ${firstname[0]}.${patronymic && patronymic[0]} `;
