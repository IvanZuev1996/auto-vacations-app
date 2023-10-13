export interface Division {
    _id: string;
    divisionNumber: number; // номер подразделения
    name?: string; // название подразделения
    submitApplications?: number; // кол-во отправленных заявок
    agreedApplications?: number;
}

export interface DivisionSchema {
    currentDivision?: Division;
}
