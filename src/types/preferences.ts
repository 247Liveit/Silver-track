export type Alert = {
  id: number;
  name: string;
  isActive: boolean | string;
};
export type Preference = {
  id: number;
  payRate: number;
  payRateOverTime: number;
  payRateSpecialDay: number;
  billRate: number;
  billRateOverTime: number;
  billRateSpecialDay: number;

};
export type SpecialDay = {
  id: number;
  repeat: boolean;
  start: Date;
  name: string;
  end: Date
};

export type LocationSpecialDay = {
  specialDayId:number;
  locationId:number;
  payType:number;
  billType:number;
};