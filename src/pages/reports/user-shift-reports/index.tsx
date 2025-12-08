import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import UserShiftReportForm from "./components/userReportForm";

const validationSchema = z.object({
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().optional(), 
  endTime: z.string().optional(),
  userId: z.coerce.number({ required_error: "Please select a user" }),
}).refine((data) => {
  if (data.startDate && data.endDate) {
    return new Date(data.startDate) <= new Date(data.endDate);
  }
  return true;
}, {
  message: "Start date must be before or equal to end date",
  path: ["endDate"],
});

export default function UserShiftReportPage() {
  const { toast } = useToast();

  const handleReportGenerated = (responseData: any, action: string) => {
    if (!responseData) {
      toast({
        title: "No Data",
        description: "No report data received",
        variant: "destructive",
      });
      return;
    }

    const blob = new Blob([responseData], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener");
  };

  return (
    <div className="p-4">
      <CustomFormLayout
        url="/reports/user-shift-activity"
        validationSchema={validationSchema}
        item={{
          startDate: "",
          endDate: "",
          startTime: "",  
          endTime: "",
          userId: null,
        }}
        redirectUrl=""
        showNewBtn={false}
        resetForm={false}
        onSave={handleReportGenerated}
      >
        <UserShiftReportForm />
      </CustomFormLayout>
    </div>
  );
}