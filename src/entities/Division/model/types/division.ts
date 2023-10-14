export interface Division {
    _id: string;
    divisionNumber: number; // номер подразделения
    name?: string; // название подразделения
    submitApplications?: number; // кол-во отправленных заявок
    agreedApplications?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DivisionSchema {
    currentDivision?: Division;
    _inited?: boolean;
}
