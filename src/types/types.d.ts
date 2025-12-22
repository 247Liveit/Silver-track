import { Quiz } from "@/types/main/types";
import { Employee, Location, LocationShift } from "./pagesData";

export type User = {
  id: number;
  name: string;
  email: string;
  created_at?: string | undefined;
  isActive: boolean | string;
  roleId: number | string;
  roleName: string;
  phone: string;
  imageUrl?: string;
  orders?: Order[];
  role: string
  employee: Employee;
  verified: boolean;
};
export type UserGroup = {
  id: number;
  name: string;
  created_at?: string | undefined;
  locations?: Location[] | undefined;
  users?: User[] | undefined;
};

export type UserDevice = {
  id: number;
  brand: string;
  deviceId: string;
  isActive: boolean | string;
  regirstered?: string | undefined;
  lastLogin?: string | undefined;
  user?: User | undefined;
  userId?: number | undefined;

};

export type Client = {
  id: number;
  name: string;
  email: string;
  managerEmail: string;
  created_at?: string | undefined;
  address: string;
  address2: string;
  city: string;
  state?: string;
  zip?: string;
  balance?: number;
  contactName: string
  phone: string
  fax: string,
  termId: number,
  notes: string
};
export type Invoice = {
  id: number;
  invoiceNum: number;
  poNum: string;
  note?: string; // Optional field
  fromDate: Date;
  toDate: Date;
  created_at: Date;
  updated_at: Date;
  totalRegularHours: number;
  totalOverTimeHours: number;
  totalHolidayHours: number;
  totalBreakHours: number;
  location?: Location | null; // Nullable field
  locationId?: number | null; // Nullable field
  client?: Client | null; // Nullable field
  clientId?: number | null; // Nullable field
  totalAmount: number; // Decimal with precision
  otherAmount: number; // Decimal with precision
};
export type EmployeeSchedule = {
  id: number;
  date: string;
  startTime: string;
  endTime: string;
  payHours: string;
  breakHours: string;
  note: string;
  employeeName: string;
  payBreakTime: string;
  payBreak: boolean;
  locationShift: LocationShift;
}
export type LocationEmployeeSchedule = {

  items: EmployeeSchedule[];
  totalHours: string;
  overTimeHours: string;
  holidayHours: string;
  totalBreakHours: string;
  invoiceAmount: number;
  otherAmounts: number;
}

export interface FormContextType {
  formId?: string | undefined;
  register: any;
  errors: any;
  create: boolean;
  edit: boolean;
  setValue: (name: string, value: any) => void;
  itemState: any;
  getValues: (string?: string) => any;
  submit: () => void;
  formState: FormState<any>;
  control: Control<any, any>;
  reset: UseFormReset<any>;
  watch: UseFormWatch<any>;
  getFieldState: UseFormGetFieldState<any>;
}

export type Auth = {
  user: {
    id: number;
    email: string;
    name: string;
  };

  backendTokens: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
  };
};

export type BackendTokens = {
  access_token: string;
  refresh_token: string;

};

export type Link = { name: string, href: string, icon: React.ForwardRefExoticComponent };

export type Links = Link[];

export type Note = {
  id: number;
  text: string;
  modelId: number;
  noteableType: string;
  created_at: string;
}


export type Attachment = {
  id: number;
  path: string;
  originalName: string;
  type: string;
  modelId: number;
  attachableType: string;
  created_at: string;
}


