import { preprocess, z } from "zod";

export const defaultSchema = z.object({});

export const createUserSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    phone: z.string().min(1, { message: "Phone is required" }),
    password: z.string().min(8, { message: "Password must be at least 8 characters" }),
    isActive: z.union([z.string().length(0), z.string().min(1, { message: "is Active is Required" })]).optional(),
    role: z.union([z.string().length(0), z.number(), z.string().min(1, { message: "Role is Required" })]).optional(),
    employeeId: z.union([z.number(), z.string().min(1, { message: "Employee is Required" })]).optional(),
    groupId: z.union([z.number(), z.string().min(1, { message: "Group is Required" })]).optional(),
    system: z.any(),
});
export const createUserDeviceSchema = z.object({
    brand: z.string().min(1, { message: "Brand is required" }),
    deviceId: z.string().min(1, { message: "Device ID is required" }).email(),
    isActive: z.union([z.string().length(0), z.string().min(1, { message: "is Active is Required" })]).optional(),
    userId: z.union([z.number(), z.string().min(1, { message: "User is Required" })]).optional(),

});
export const updateUserDeviceStatusSchema = z.object({
    isActive: z.union([z.string().length(0), z.string().min(1, { message: "is Active is Required" }), z.coerce.boolean()]).optional(),
});
export const createIssueTypeSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(1, { message: "Description is required" }),
    type: z.enum(['Security', 'Parking', 'Maintenance'], { message: "Type is required" }), // Replace with actual types
    level: z.enum(['Level1', 'Level2', 'Level3'], { message: "Level is required" }), // Replace with actual levels
    isActive: z.coerce.boolean().optional(),
    displayForDispatch: z.coerce.boolean().optional(),
    displayForWebUsers: z.coerce.boolean().optional(),
    autoClose: z.coerce.boolean().optional(),
    checkPointOnly: z.coerce.boolean().optional(),
    displayInHandHeld: z.coerce.boolean().optional(),
    addTo: z.string().optional(),
    locationId: z.coerce.number({ message: "Location is Required" }).optional(),
    clientId: z.coerce.number({ message: "client is Required" }).optional(),
});
export const createCheckPointTypeSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    address: z.string().min(1, { message: "address is required" }),
    qrCode: z.string().min(1, { message: "qrCode value is required" }),
    reportNote: z.string().optional(),
    officerInstuction: z.string().optional(),
    isActive: z.coerce.boolean().optional(),
    allowKeepOpen: z.coerce.boolean().optional(),
    requiredPhoto: z.coerce.boolean().optional(),
    reportIfMissing: z.coerce.boolean().optional(),
    createIssueType: z.coerce.boolean().optional(),
    issue_type_id: z.coerce.number({ message: "IssueType is Required" }).optional(),
    locationId: z.coerce.number({ message: "Location is Required" }).optional(),
    clientId: z.coerce.number({ message: "cleint is Required" }).optional(),
});

export const createUserGroupSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    locationIds: z.any(),
});

export const UserGroupFormDataFormat = {
    locationIds: (value) => {
        console.log("LocationIds", value)
        const val = value.filter(item => item != "" && item != null)
        console.log("LocationIdsRes", val)
        return val;
    }
}
export const updateUserSchema = z.object({
    password: z.union([z.string().length(0), z.string().min(8, { message: "Password must be at least 8 characters" })]).optional(),
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    phone: z.string().min(1, { message: "Phone is required" }),
    isActive: z.union([z.string().length(0), z.number(), z.string().min(1, { message: "is Active is Required" })]).optional(),
    role: z.union([z.string().length(0), z.number(), z.string().min(1, { message: "Role is Required" })]),
    groupId: z.union([z.number(), z.string().min(1, { message: "Group is Required" })]).optional(),
    system: z.any(),
});

export const extraChargesSchema = z.object({
    description: z.string().min(1, { message: "Description is required" }),
    amount: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number()),
    type: z.string().min(1, { message: "Type is required" }),
});


export const clientSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    email: z.string().min(1, { message: "Email is required" }).email(),
    managerEmail: z.union([z.string().length(0), z.number(), z.string().min(1, { message: "Manager Email is required" }).email()]).optional(),
    address: z.string().min(1, { message: "Address is required" }),
    address2: z.union([z.string().length(0), z.number(), z.string().min(1, { message: "is Address2 is Required" })]).optional(),
    city: z.string().min(1, { message: "City is required" }),
    state: z.string().min(1, { message: "State is required" }),
    zip: z.string().min(1, { message: "Zip is required" }),
    contactName: z.string().min(1, { message: "Contact is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    fax: z.any(),
    notes: z.any(),
    termId: z.string().min(1, { message: "Phone is required" }),
});
// const MAX_FILE_SIZE = 8000000;
// const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/jpg", "image/png", "image/webp"];

export const createLocationSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    location: z.string().min(1, { message: "Location is required" }),
    department: z.string().min(1, { message: "Department is required" }),
    reference: z.string().min(1, { message: "Reference is required" }),
    status: z.union([z.boolean(), z.string().min(1, { message: "Status is Required" })]),
    address: z.union([z.string().length(0), z.string().min(1, { message: "Address is Required" })]).optional(),
    geoLocationUrl: z.any(),
    other: z.union([z.string().length(0), z.string().min(1, { message: "Other is Required" })]).optional(),
    image: z.any(),
    locationGuardType: z.any(),


});
export const createMultipleInvoiceSchema = z.object({
    locationsId: z.any(),
    fromDate: z.string().min(1, { message: "Tracking From is required" }),
    toDate: z.string().min(1, { message: "Tracking to is required" }),
    sendEmail: z.any(),
});
export const createMailMultipleInvoiceSchema = z.object({
    fromInvoiceNo: z.string().min(1, { message: "Invoice No From is required" }),
    toInvoiceNo: z.string().min(1, { message: "Invoice No To is required" }),
});
export const createInvoiceSchema = z.object({
    fromDate: z.string().min(1, { message: "Tracking From is required" }),
    toDate: z.string().min(1, { message: "Tracking to is required" }),
    locationId: z.coerce.number().min(1, { message: "Location is required" }),
    totalAmount: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number()),
    totalRegularHours: z.any(),
    totalOverTimeHours: z.any(),
    totalHolidayHours: z.any(),
    totalBreakHours: z.any(),
    otherAmount: preprocess((val) => {
        try {
            if (val)
                return parseFloat(val as string);

            return 0;
        } catch (e) {
            return val;
        }

    }, z.any()),
    Note: z.any(),
    poNum: z.any(),
    extraCharges: z.any(),
    sendEmail: z.any(),


});
export const createPaymentSchema = z.object({
    paymentDate: z.string().min(1, { message: "Payment Form is required" }),
    paymentType: z.string().min(1, { message: "Payment Type is required" }),
    paidAmount: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number()),
    invoiceId: z.coerce.number().min(1, { message: "Invoice is required" }),
    cardNumber: preprocess((val: any) => {
        try {
            return "" + (val as string).replace(/\s/g, '');
        } catch (e) {
            return val;
        }

    }, z.any()),
    cvv: z.any(),
    exprationMonth: z.any(),
    exprationYear: z.any(),
    nameOnCard: z.any(),
    country: z.any(),
    address: z.any(),
    zipCode: z.any(),
    refNumber: z.any(),

});

export const locationSpecialDaysSchema = z.object({
    specialDays: z.any(),
});
export const createLocationRatesSchema = z.object({
    normalRate: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Normal Rate is required" })),
    overTimeRate: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "OverTime Rate is required" })),
    specialDayRate: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Special Day Rate is required" })),
    longWeek: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Long Week is required" })),
    longDay: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Long Day is required" })),

});

export const createEmployeeRatesSchema = z.object({
    normalRate: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Normal Rate is required" })),
    overTimeRate: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "OverTime Rate is required" })),
    specialDayRate: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Special Day Rate is required" })),

});

export const createSpecialDaysSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    start: z.string().min(1, { message: "Start is required" }),
    end: z.string().min(1, { message: "End is required" }),
    repeat: preprocess((val) => {
        try {
            return typeof val == "boolean" ? val : val == "true";
        } catch (e) {
            return false;
        }

    }, z.coerce.boolean())
});
export const reportsSchema = z.object({
    type: z.string().min(1, { message: "Type is required" }),
    reportType: z.string().min(1, { message: "" }),
    entityIds: z.any(),
    includes: z.any(),
    startDate: z.any(),
    endDate: z.any(),


});
export const updateRateSchema = z.object({
    payRate: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Pay Rate is required" })),
    payRateOverTime: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Pay Rate Over Time is required" })),
    payRateSpecialDay: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Pay Rate Special Day is required" })),
    billRate: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Bill Rate is required" })),
    billRateOverTime: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Bill Rate Over Time is required" })),
    billRateSpecialDay: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Bill Rate Special Day  is required" })),

});
export const updateGeneralSchema = z.object({
    longWeek: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Long Week is required" })),
    longDay: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Long Day is required" })),
    longShift: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Long Shift is required" })),


});

export const createLocationContactSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    phone: z.string().min(1, { message: "Phone is required" }),
    modelId: z.any(),
    type: z.any(),
    ext: z.union([z.string().length(0), z.string().min(1, { message: "EXT is Required" })]).optional(),
    address: z.union([z.string().length(0), z.string().min(1, { message: "Address is Required" })]).optional(),
    email: z.union([z.string().length(0), z.string().min(1, { message: "Email is Required" })]).optional(),

});

export const createLocationShiftSchema = z.object({
    shiftName: z.string().min(1, { message: "Name is required" }),
    shiftStartDate: z.string().min(1, { message: "Shift Start is required" }),
    shiftValidTo: z.string().min(1, { message: "Shift Valid is required" }),
    startTime: z.string().min(1, { message: "Start Time is required" }),
    endTime: z.string().min(1, { message: "Shift End is required" }),
    planStartTime: z.string().min(1, { message: "Plan Start Time is required" }),
    planEndTime: z.string().min(1, { message: "Plan End is required" }),
    breakStartTime: z.union([z.null(), z.string().min(1, { message: "Break Start is Required" }), z.string().length(0)]).optional().default(null),
    breakEndTime: z.union([z.null(), z.string().min(1, { message: "Break End is Required" }), z.string().length(0)]).optional().default(null),
    breakLength: z.any(),
    description: z.string().min(1, { message: "Descriptions is required" }),
    status: z.string().min(1, { message: "Status is required" }),
    shiftType: z.string().min(1, { message: "Shift Type is required" }),
    locationId: z.any(),
    pay: z.union([z.boolean(), z.string().min(1, { message: "Pay is Required" })]).default(false),
    bill: z.union([z.boolean(), z.string().min(1, { message: "Bill is Required" })]).default(false),
    days: z.any(),


});

export const createEmployeeAvailabilitySchema = z.object({
    type: z.string(),
    frequencyType: z.string(),
    shiftValidFrom: z.string().min(1, { message: "Shift Start is required" }),
    shiftValidTo: z.string().min(1, { message: "Shift Valid is required" }),
    startTime: z.string().min(1, { message: "Start Time is required" }),
    endTime: z.string().min(1, { message: "Shift End is required" }),
    breakLength: z.any(),
    reason: z.any(),
    days: z.any()
});
export const createLocationNoteSchema = z.object({
    text: z.string().min(1, { message: "Note is required" }),
    modelId: z.any()
});
export const createLocationExclusionSchema = z.object({
    reason: z.string().min(1, { message: "Reason is required" }),
    employeeId: z.any(),
    locationId: z.any()
});



export const createEmployeeSchema = z.object({
    shortName: z.string().min(1, { message: " Name is required" }),
    department: z.string().min(1, { message: " Department is required" }),
    firstName: z.union([z.string().length(0), z.string().min(1, { message: "First Name is Required" })]).optional(),
    lastName: z.union([z.string().length(0), z.string().min(1, { message: "Last Name is Required" })]).optional(),
    location: z.union([z.null(), z.string().length(0), z.string().min(1, { message: "Location is Required" })]).optional(),
    geoLocationUrl: z.any(),
    position: z.union([z.null(), z.string().length(0), z.string().min(1, { message: "Postion is Required" })]).optional(),
    address: z.union([z.null(), z.string().length(0), z.string().min(1, { message: "Address is Required" })]).optional(),
    photo: z.any(),
    file: z.any(),
    empId: z.any(),
    reference: z.any(),
    other: z.any(),
    car: z.any(),
    license: z.any(),
    status: z.any(),
    employeeType: z.any(),
    startDate: z.string().date(),
    endDate: z.string().date(),
    birthdate: z.union([z.null(), z.string().length(0), z.string().date()]).optional().default(""),
    review: z.string().date().optional(),
    lbs: z.any(),
    height: z.any(),
    dependents: z.any()

});


export const updateLessonSchema = z.object({
    name: z.string().min(1, { message: "Name is required" }),
    description: z.string().min(10, { message: "Description is required and min of 10 letters" }),
    sort: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Order is required" })),
    classEntId: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, { message: "Class is required" })),
    file: z.any(),

});
export const createQuizSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    pageName: z.string().min(1, { message: "Page Name is required" }),
    quizTime: z.union([z.string().min(1, { message: "Quiz Time is required" }), z.number().min(1, { message: "Quiz Time is required" })]),
    questions: z.any().array(),
    successPercentage: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, 'Success percentage is required')),
});
export const updateQuizSchema = z.object({
    title: z.string().min(1, { message: "Title is required" }),
    pageName: z.string().min(1, { message: "Page Name is required" }),
    quizTime: z.union([z.string().min(1, { message: "Quiz Time is required" }), z.number().min(1, { message: "Quiz Time is required" })]),
    questions: z.any().array(),
    successPercentage: preprocess((val) => {
        try {
            return parseFloat(val as string);
        } catch (e) {
            return val;
        }

    }, z.number().min(1, 'Success percentage is required')),
});

export const loginSchema = z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    password: z.string().min(6, { message: "password is too short" }),

});

export const loginVerifySchema = z.object({
    email: z.string().email().min(1, { message: "Email is required" }),
    code: z.string().min(6, { message: "code is too short" }),

});

export const scheduleUpdateSchema = z.object({
    locationId: z.any(),
    action: z.any(),
    employeeId: z.any(),
    employeeShifts: z.any()


});
export const EmployeeShiftUpdateSchema = z.object({
    startDate: z.any(),
    endDate: z.any(),
    startTime: z.any(),
    endTime: z.any(),
    planStartDate: z.any(),
    planEndDate: z.any(),
    planStartTime: z.any(),
    planEndTime: z.any(),
    comment: z.any(),
    payRate: z.any(),
    payHours: z.any(),
    payBreak: z.any(),
    billRate: z.any(),
    billHours: z.any(),
    billBreak: z.any(),
    billBreakTime: z.any(),
    payBreakTime: z.any(),
    payType: z.any(),
    billType: z.any(),
    note: z.any(),
    locationShiftType: z.any(),


});
export const noteSchema = z.object({
  notes: z.string().optional(),
});

export function getCreateSchema(url: string) {

    const schemaMap = {
        // '/users': createUserSchema,
        // '/auth/login': loginSchema,
        // '/auth/login-verify': loginVerifySchema,
        // '/locations': createLocationSchema,
        // '/locations/update-special-days': locationSpecialDaysSchema,
        // '/locations/rates': createLocationRatesSchema,
        // '/shared/contacts/locations': createLocationContactSchema,
        // '/shared/contacts/employees': createLocationContactSchema,
        // '/shared/notes/locations': createLocationNoteSchema,
        // '/shared/exclusions/locations': createLocationExclusionSchema,
        // '/shared/exclusions/employees': createLocationExclusionSchema,
        // '/employees': createEmployeeSchema,
        // '/employees/rates': createEmployeeRatesSchema,
        // '/location-shifts': createLocationShiftSchema,
        // '/employee-availabilities': createEmployeeAvailabilitySchema,
        // '/employee-shifts': EmployeeShiftUpdateSchema,
        // '/employee-shifts/schedule-update': scheduleUpdateSchema,
        // '/preferences/special-days': createSpecialDaysSchema,
        // '/reports': reportsSchema
    };

    let schema = undefined;
    Object.keys(schemaMap).forEach(key => {
        if (url.startsWith(key))
            schema = schemaMap[key];
    });
    return schema;

}

export function getUpdateSchema(url: string) {
    const schemaMap = {
        // '/users': updateUserSchema,

        // '/locations': createLocationSchema,
        // '/locations/rates': createLocationRatesSchema,
        // '/locations/update-special-days': locationSpecialDaysSchema,
        // '/shared/contacts/locations': createLocationContactSchema,
        // '/shared/contacts/employees': createLocationContactSchema,
        // '/shared/notes/locations': createLocationNoteSchema,
        // '/shared/exclusions/locations': createLocationExclusionSchema,
        // '/shared/exclusions/employees': createLocationExclusionSchema,
        // '/employees': createEmployeeSchema,
        // '/employees/rates': createEmployeeRatesSchema,
        // '/location-shifts': createLocationShiftSchema,
        // '/employee-availabilities': createEmployeeAvailabilitySchema,
        // '/employee-shifts': EmployeeShiftUpdateSchema,
        // '/employee-shifts/schedule-update': scheduleUpdateSchema,
        // '/preferences/rates': updateRateSchema,
        // '/preferences/special-days': createSpecialDaysSchema,
        // '/preferences/general': updateGeneralSchema


    };
    let schema = undefined;
    Object.keys(schemaMap).forEach(key => {
        if (url.startsWith(key))
            schema = schemaMap[key];
    });

    return schema;

}




export const issueSchema = z.object({
    details: z.string().min(1, { message: "Details are required" }),
    address: z.string().min(1, { message: "Address is required" }),
    status: z.enum(['Open', 'Closed']),
    keepOpen: z.coerce.boolean().optional(),
    issueTypeId: z.coerce.number().min(1, { message: "Issue type is required" }),
    locationId: z.number().min(1, { message: "Location is required" }),
    clientId: z.number().min(1, { message: "Client is required" }),
    userId: z.coerce.number().optional().or(z.literal(undefined)),
    assigendToId: z.coerce.number().optional().or(z.literal(undefined)),
    happenedAt: z.string().optional(),
    geoLocation: z.object({
        lat: z.number(),
        lng: z.number()
    }).optional()
});

