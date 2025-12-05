import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { z } from "zod";
import {GpsFormContent} from"./components/GpsForm"
import { Issue } from "@/types/pagesData";
import { useMemo } from "react";
import { useLocation } from "react-router-dom";


const gpsFormSchema = z.object({
  clientId: z.number().min(1, "Client is required"),
  locationId: z.number().optional().nullable(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  level: z.array(z.string()).optional(),
  type: z.array(z.string()).optional(),
});

export default function GpsForm() {
  const location = useLocation();
  const navigationState = location.state as {
    selectedIssue?: Issue;
    clientId?: number;
    locationId?: number;
  };

 
  const formKey = useMemo(() => {
    if (navigationState?.selectedIssue) {
      return `nav-${navigationState.selectedIssue.id}`;
    }
    return "default";
  }, [navigationState?.selectedIssue?.id]);


  
const initialFormData = useMemo(() => ({
  clientId: navigationState?.clientId,
  locationId: navigationState?.locationId,
  startDate: "",
  endDate: "",
  level: navigationState?.selectedIssue?.issueType?.level 
    ? [navigationState.selectedIssue.issueType.level] 
    : [],
  type: navigationState?.selectedIssue?.issueType?.type 
    ? [navigationState.selectedIssue.issueType.type] 
    : [],
}), [navigationState]);

  return (
    <div className="p-4">
      <CustomFormLayout
        key={formKey}
        item={initialFormData}
        url="/map/client/issues"
        redirectUrl="#"
        edit={false}
        showCancelBtn={false}
        showNewBtn={false}
        resetForm={false}
        validationSchema={gpsFormSchema} 
      >
        <GpsFormContent />
      </CustomFormLayout>
    </div>
  );
}