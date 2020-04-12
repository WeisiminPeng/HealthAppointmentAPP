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
    WorkDays: []
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