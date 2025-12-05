import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { useToast } from "@/components/ui/use-toast";
import { z } from "zod";
import CheckpointReportForm from "./components/CheckpointReportForm";

const validationSchema = z.object({
  clientId: z.coerce.number().optional().nullable(),
  allLocations: z.string().optional().nullable(),
}).refine((data) => {
  const hasClient = data.clientId !== undefined && data.clientId !== null && !isNaN(data.clientId);
  const hasAllLocations = data.allLocations === "All";
  return hasClient || hasAllLocations;
}, {
  message: "Please select a client or check 'All Clients'",
  path: ["clientId"],
});

export default function CheckpointReportsPage() {
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
        url="/reports/checkpoints"
        validationSchema={validationSchema}
        item={{
          clientId: null,
          allLocations: null,
        }}
        redirectUrl=""
        showNewBtn={false}
        resetForm={false}
        onSave={handleReportGenerated}
      >
        <CheckpointReportForm />
      </CustomFormLayout>
    </div>
  );
}