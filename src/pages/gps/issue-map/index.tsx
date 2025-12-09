import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { z } from "zod";
import { GpsFormContent } from "./components/GpsForm"
import { Issue } from "@/types/pagesData";
import { useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import IssueMap from "./components/IsssueMap";


const gpsFormSchema = z.object({
  clientId: z.number().min(1, "Client is required"),
  locationId: z.number().optional().nullable(),
  startDate: z.string().min(1, "Start date is required"),
  endDate: z.string().min(1, "End date is required"),
  startTime: z.string().optional(),
  endTime: z.string().optional(),
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
  const [issues, setIssues] = useState<Issue[]>(
    navigationState?.selectedIssue ? [navigationState.selectedIssue] : []
  );

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
    startTime: "",
    endTime: "",
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
        edit={true}
        showCancelBtn={false}
        showNewBtn={false}
        resetForm={false}
        validationSchema={gpsFormSchema}
        onSave={(data) => {
          console.log("Fetched issues data:", data);
          setIssues(data.issues??[]);
        }}
      >
        <GpsFormContent />
      </CustomFormLayout>
      {issues && issues.length > 0 && (
        <div className="mt-6 relative z-0 ">
          <h2 className="text-xl font-bold mb-4">
            Issues Map
            {` (${issues.length} issues)`}
          </h2>
          <IssueMap issues={issues} />
        </div>
      )}
    </div>
  );
}