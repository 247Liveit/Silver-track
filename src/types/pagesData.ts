import { ReactNode } from "react";
import { LocationSpecialDay, SpecialDay } from "./preferences";
import { Client, User } from "./types";

export type Category = {
    id: number;
    name: string;
    image: string;
    parent_id: number;
    files?: { id: number, path: string }
    is_restricted: { [key: string]: string } | string;
}

export type Country = {
    id: number;
    name: string;
    icon: string;
    image: string;
    code: number;
}

export type Location = {

    id: number;
    name: string;
    shortName: string;
    department: string;
    location: string;
    reference: string;
    image: string;
    address: string;
    billingAddress: string;
    other: string;
    created_at: string;
    geoLocationUrl: string;
    normalRate: number;
    overTimeRate: number;
    specialDayRate: number;
    status: boolean;
    specialDays: SpecialDay[],
    shifts: LocationShift[],
    locationSpecialDays: LocationSpecialDay[],
    locationGuardType: string;
    clientId: number;
    client: Client;
    clientName?: string | undefined;
    issueTypes?: IssueType[];

}

export type LocationExtraCharges = {
    id: number;
    description: string;
    amount: number;
    type: string
}

export type Employee = {

    id: number;
    firstName: string;
    lastName: string;
    name: string;
    shortName: string;
    photo: string;
    address: string;
    geoLocationUrl: string;
    department: string;
    status: boolean;
    employeeType: string;
}

export type EmployeeShift = {
    id?: number;
    employeeId?: number;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
    planStartDate: string;
    planEndDate: string;
    planStartTime: string;
    planEndTime: string;
    comment?: string;
    payRate?: number;
    payHours?: number;
    payBreak?: boolean;
    billRate?: number;
    billHours?: number;
    billBreak?: boolean;
    note?: string;
}

export type EmployeeExclusion = {
    id: number;
    employee: Employee;
    location: Location;
    reason: string;
    created_at: Date;
}

export type Files = {
    id: number;
    modelId: number;
    attachableType: string;
    path: string;
    type: string;
    created_at: Date;
    originalName: string;
}

export type LocationHistory = {
    id: number;
    employee: Employee;
    location: Location;
    text: string;
    firstDate: Date;
    lastDate: Date;
    created_at: Date;
}

export type UserHistory = {
    id: number;
    user: User;
    text: string;
    action: string;
    created_at: Date;
}
export type EmployeeLocationHistory = {
    name: string;
    shiftName: string;
    firstStartDate: Date;
    lastEndDate: Date;
    startTime: string;
    endTime: string;

}

export type LocationShift = {
    id?: number;
    locationId?: number | undefined;
    shiftName: string;
    shiftType: string;
    shiftStartDate: string;
    shiftValidTo: string;
    startTime: string;
    status: boolean;
    endTime: string;
    planStartTime: string;
    planEndTime: string;
    breakStartTime: string;
    breakEndTime: string;
    breakLength: string;
    description: string;
    pay: boolean;
    bill: boolean;
    days: string[];


}

export type EmployeeAvailability = {
    id?: number;
    employeeId: number;
    shiftValidFrom: string;
    shiftValidTo: string;
    type: string,
    frequencyType: string,
    startTime: string;
    endTime: string;
    days: any;
    breakStartTime: string;
    breakEndTime: string;
    reason: string;
    pay: boolean;
}

export type ShiftScheduleTable = {
    address: ReactNode;
    shiftId: string;
    shiftName: string;
    fromDate: Date;
    startTime: string;
    endTime: string;
    planStartTime: string;
    planEndTime: string;
    toDate: Date;
    daysShifts: { [date: string]: DayShiftDto[] }
}

export enum ShiftStaus {
    Available = 1,
    NotAvailable = 2,
    OutOfRange = 3,
    Canceled = 4
}

export enum ShiftType {
    Normal = 1,
    Overtime = 2,
    SpecialDay = 3
}

export type DayShiftDto = {
    employeeShiftId: string;
    day: string;
    status: ShiftStaus;
    assingeeName: string;
    assigneeId: string;
    canceled: boolean;
    manualAdded: boolean;
    manualEdited: boolean;
    startTime: string;
    endTime: string;
    planStartTime: string;
    planEndTime: string;
    comment: string;
    alerts: { message: string, type: string }[];

}

export type City = {
    id: number;
    name: string;
    image: string;
    country_id: number;
}

export enum IssueTypes {
    Security = "Security",
    Parking = "Parking",
    Maintenance = "Maintenance",
}
export enum IssueLevels {
    Level1 = "Level1",
    Level2 = "Level2",
    Level3 = "Level3",

}
 export  const LeveloptionsArray = Object.keys(IssueLevels)
    .map(key => ({
      label: key, // Use the enum key as the label
      value: IssueLevels[key as keyof typeof IssueLevels] // Use the enum value
    }));
export  const typeOptions = Object.keys(IssueTypes)
    .map(key => ({
      label: key, // Use the enum key as the label
      value: IssueTypes[key as keyof typeof IssueTypes] // Use the enum value
    }));

export type IssueType = {
    id: number;
    name: string;
    description: string;
    isActive: boolean;
    displayForDispatch: boolean;
    displayForWebUsers: boolean;
    autoClose: boolean;
    checkPointOnly: boolean;
    displayInHandHeld: boolean;
    type: IssueTypes;
    level: IssueLevels;
}

export enum IssueStatus {
    Open = "Open",
    Closed = "Closed"
}

export type Issue = {
    id: number;
    details: string | null;
    address: string;
    status: IssueStatus;
    closedDate: Date | null;
    issueTypeId: number;
    locationId: number;
    clientId: number;
    issueType?: IssueType;
    location?: Location;
    client?: Client;
    geoLocation?: {lat:number, lng:number};
    user?: User;
    assigendTo?: User;
    attachments?: {id: number, path: string,originalName:string, created_at: Date }[];
    notes?: { id: number, text: string,created_at:Date }[];
    created_at: Date;
    updated_at: Date;
    happenedAt:string;
}

export type Checkpoint = {
    id: number;
    name: string;
    address: string;
    qrCode: string;
    officerInstuction: string;
    reportNote: string;
    isActive: boolean;
    allowKeepOpen: boolean;
    reportIfMissing: boolean;
    requiredPhoto: boolean;
    issueType: IssueType;
    issue_type_id: IssueType;
    location: Location;
}
export type LocationIssueType = {
    id: number;
    location_id: number;
    issue_type_id: number;

}
