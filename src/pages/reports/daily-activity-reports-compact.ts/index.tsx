import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { useToast } from "@/components/ui/use-toast";
import {z} from "zod"
import DailyReportForm from "../daily-activity-reports/components/DailyReportForm";



const validationSchema = z.object({
  startDate:z.string().min(1,"Start date is required"),
  endDate:z.string().min(1,"End date is required"),
  startTime: z.string().optional(), 
  endTime: z.string().optional(),
  clientId:z.coerce.number({required_error:"Please select a client"}),
  level:z.array(z.string()).optional(),
  type:z.array(z.string()).optional(),
  compact:z.boolean().optional()
})



export default function DailyReportFormCompact (){
  const {toast} = useToast()
 
  const handleReportGenerated = (responseData:any,action:string)=>{
    if(!responseData){
      toast({
           title: "No Data",
        description: "No report data received",
        variant: "destructive",
      })
      return;
    }
  const blob = new Blob([responseData], { type: "text/html" })
  const url = URL.createObjectURL(blob);
  window.open(url,"_blank","noopener")
}



return (

  <div className="p-4"> 
  <CustomFormLayout 
   url = "/reports/daily-activities-compact" 
   validationSchema={validationSchema}
   item={{
    startDate:"",
    endDate:"",
    startTime: "",  
    endTime: "",
    clientId:undefined,
    level:[],
    type:[],
    compact:true
   }}
    redirectUrl=""
    showNewBtn={false}
    resetForm={false}
    onSave={handleReportGenerated}>
     <DailyReportForm showDate={true} type="daily-activities-compact-report" />
  </CustomFormLayout>
  </div>
)

}