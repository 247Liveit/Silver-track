import { title } from "process";

export const Backend_URL = (process.env.NODE_ENV==="development"?"http://127.0.0.1:3001":"http://54.219.100.215:3001");
export const Backend_Public_URL = (process.env.NODE_ENV==="development"?"http://127.0.0.1:3001":"http://54.219.100.215:3001");
export const INTIME_URL = (process.env.NODE_ENV==="development"?"http://localhost:5174":"http://54.219.100.215:8080");


// export const Backend_URL = "http://localhost:4000";
export const Home_URL="/dashboard";

export const INITIAL_VISIBLE_COLUMNS = {
    '/users': ["id","name", "email", "roleName", "isActive", "actions"],
    '/classes': ["name", "price", "offer", "featured", "created_at",  "actions"],
    '/lessons': ["name", "className", "sort",  "created_at",  "actions"],
    '/orders': ["id", "userName", "className", "classPrice",'paymentType','status','paymentId',  "created_at"],
    '/request-quotes': ["id", "name", "companyName", "email",'phone','note',  "created_at","actions"],
    '/contact-us': ["id", "name", "companyName", "email",'phone','note',  "created_at","actions"],
    '/testimonials': ["id", "title", "description", "date",'file',  "created_at","actions"],
    '/news': ["id", "title", "description", 'file',  "created_at","actions"],
    '/quizzes': ["id", "title","pageName", "quizTime","successPercentage", "created_at","actions"],
    '/pages-metadata': ["id", "page","title", "description","keywords", "created_at","actions"],
};


export const getInitialVisableColumns = (url:string)=>{
    return INITIAL_VISIBLE_COLUMNS[url];
};


export const LOCATIONSHIFTTYPE = {
    Normal: "Normal",
    Armed: "Armed",
    Leave: "Leave",
    Sick: "Sick",
    DoNotBill: "Do Not Bill",
    Minimum4WorkHours: "MINIMUM 4 Work Hours",
    Training: "Training",
    SpecialRequest: "Special Request",
    Event: "Event",
    Other: "Other"
  };
  

export enum paymentType {
    Check= "Check",
    OnlinePayment= "Online Payment",
    VISA="VISA",
    MasterCard="Master Card"
  };
  
export const paymentTypeArray =[
   {value:paymentType.Check,label:paymentType.Check},
   {value:paymentType.OnlinePayment,label:paymentType.OnlinePayment},
   {value:paymentType.VISA,label:paymentType.VISA},
   {value:paymentType.MasterCard,label:paymentType.MasterCard},

]
  

export const LOCATIONSHIFTTYPEARRAY = [
    { id: LOCATIONSHIFTTYPE.Normal, title: LOCATIONSHIFTTYPE.Normal },
    { id: LOCATIONSHIFTTYPE.Armed, title: LOCATIONSHIFTTYPE.Armed },
    { id: LOCATIONSHIFTTYPE.Leave, title: LOCATIONSHIFTTYPE.Leave },
    { id: LOCATIONSHIFTTYPE.Sick, title: LOCATIONSHIFTTYPE.Sick },
    { id: LOCATIONSHIFTTYPE.DoNotBill, title: LOCATIONSHIFTTYPE.DoNotBill },
    { id: LOCATIONSHIFTTYPE.Minimum4WorkHours, title: LOCATIONSHIFTTYPE.Minimum4WorkHours},
    { id: LOCATIONSHIFTTYPE.Training, title: LOCATIONSHIFTTYPE.Training },
    { id: LOCATIONSHIFTTYPE.SpecialRequest, title: LOCATIONSHIFTTYPE.SpecialRequest},
    { id: LOCATIONSHIFTTYPE.Event, title: LOCATIONSHIFTTYPE.Event },
    { id: LOCATIONSHIFTTYPE.Other, title: LOCATIONSHIFTTYPE.Other },
  ]

  
  export const GuardType = {"0":"Sub Contractor","1":"In-House"}