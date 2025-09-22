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
    image: string;
    address: string;
    created_at: string;
    geoLocationUrl: string;
    normalRate: number;
    overTimeRate: number;
    specialDayRate: number;
    status: boolean;
    specialDays:SpecialDay[],
    shifts:LocationShift[],
    locationSpecialDays:LocationSpecialDay[],
    locationGuardType: string;
    clientId:number;
    client:Client;

}

export type LocationExtraCharges ={
    id:number;
    description:string;
    amount:number;
    type:string
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
    employeeId?:number;
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
    payBreak?:boolean;
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
    startTime:string;
    endTime:string;
    
}

export type LocationShift = {
    id?: number;
    locationId?: number|undefined;
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
    startTime:string;
    endTime:string;
    planStartTime:string;
    planEndTime:string;
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
    comment:string;
    alerts: {message:string,type:string}[];

}

export type City = {
    id: number;
    name: string;
    image: string;
    country_id: number;
}