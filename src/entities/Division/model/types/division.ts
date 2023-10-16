export interface Division {
    _id: string;
    divisionNumber?: number; // номер подразделения
    name?: string; // название подразделения
    submitApplications?: number; // кол-во отправленных заявок
    agreedApplications?: number;
    createdAt?: Date;
    updatedAt?: Date;
}

export interface DivisionSchema {
    currentDivisionId?: string;
    _inited?: boolean;
}
