export interface doctorsData {
    Name: string,
    Gender: string,
    Text: string,
    Id: string,
    DepartmentId: number,
    Color: string,
    Education: string,
    Designation: string,
    Specialization: string,
    Experience: string,
    DutyTiming: string,
    Email: string,
    Mobile: string,
    Availability: string,
    StartHour: string,
    EndHour: string,
    AvailableDays: object,
    WorkDays: [],
    username: string,
    Avatar: string
}

export interface workHours{
    Day: string,
    Index: number,
    Enable: boolean,
    WorkStartHour: Date,
    WorkEndHour: Date,
    BreakStartHour: Date,
    BreakEndHour: Date,
    State: string,
}

export interface success {
    message: string;
}

export interface patientData{
    Name: string,
    Gender: string,
    Text: string,
    DOB:Date,
    Mobile: string,
    Address:string,
    username:string
}

export interface appointmentData{
    PatientUsername: string,
    DoctorUsername: string,
    PatientName: string,
    DoctorName: string,
    StartTime: Date,
    EndTime: Date,
    Symptims: string,
    RecurrenceRule:string,
    IsBlock: boolean
}

export interface breakhour{
    PatientName:string,
    StartTime: Date,
    EndTime: Date,
    IsBlock:boolean

}