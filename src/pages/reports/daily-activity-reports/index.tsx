import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple";
import InlineCheckBoxSimple from "@/components/shared/form/inputs/InlineCheckBoxSimple";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useGetSingle } from "@/lib/api/queries/generic";
import { dateFromat, debounce } from "@/lib/utils";
import { Location } from "@/types/pagesData";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { useCallback, useState } from "react";
import { z } from "zod";
import DailyReportForm from "./components/report-form";

export default function DailyActivitiesReportPage() {

  const [selectedLocation, setSelectedLocation] = useState<Location | null | undefined>(null);
  const [selecteAllLocation, setSelecteAllLocation] = useState<string | null | undefined>(null);
  const [dropSearch, setDropSearch] = useState<string>("");
  const [isLoadingPost, setLoadingPost] = useState<boolean>(false);
  const { toast } = useToast();
  const axios = useAxiosAuth();
  const { data: locations, isFetched, refetch } = useGetSingle<PaginationApiType<Location>>('/locations/paginate', {
    limit: 1000,
    page: 1,
    search: dropSearch,
    sortBy: "id",
    sortOrder: "DESC",
    fields: "id,name",
  }, []);

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      setDropSearch(searchTerm);
      refetch()
    }, 300),
    []
  );

  function onGenerateReport() {
    setLoadingPost(true);
    axios.post('/reports/checkpoints', {
      locationId: selectedLocation ? selectedLocation.id : null,
      allLocations: selecteAllLocation,
    }).then((response) => {
      console.log(response)
      const blob = new Blob([response.data.data], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    }).catch((error) => {
      console.error("Error generating report:", error);
      if (error.response && error.response.data && error.response.status === 555) {
        toast({
          title: error.response.data.message[0],
          description: dateFromat(new Date()),
          variant: "destructive"
        })
      }
    }).finally(() => {
      setLoadingPost(false);
    });
  }

  return (
    <div className="p-4">
      <CustomFormLayout url="/reports/daily-activities" validationSchema={z.any()} item={{}}
        redirectUrl="" showNewBtn={false}>
          <DailyReportForm showDate={true}  type="daily-activities-report" />
        {/* <div className="p-4  flex items-center justify-center">
          <Button className="mt-4 text-center" onClick={() => {
            if (!isLoadingPost)
              onGenerateReport();
          }}>{isLoadingPost ? "Processing..." : "Generate Report"}</Button>
        </div> */}
      </CustomFormLayout>
    </div>
  );
}