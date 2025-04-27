export interface Patient {
    id: number;
    name: string;
    surname: string;
    birthdate: string;
    doctorRemarks?: string;
    history?: Array<PatientHistory>
}

export interface PatientHistory {
    id: number;
    date: string;
    description: string;
}