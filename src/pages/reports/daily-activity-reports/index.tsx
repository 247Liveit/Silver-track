import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple";
import DatePickerSimple from "@/components/shared/form/inputs/DatePickerSimple ";
import InlineCheckBoxSimple from "@/components/shared/form/inputs/InlineCheckBoxSimple";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useGetSingle } from "@/lib/api/queries/generic";
import { dateFromat, debounce, getUTCDate } from "@/lib/utils";
import { LeveloptionsArray, Location, typeOptions } from "@/types/pagesData";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { useCallback, useState } from "react";

export default function DailyReportForm() {

  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [dropSearch, setDropSearch] = useState<string>("");
  const [levels, setLevels] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [isLoadingPost, setLoadingPost] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>(getUTCDate(new Date()));
  const [endDate, setEndDate] = useState<string>(getUTCDate(new Date()));

  const { toast } = useToast();
  const axios = useAxiosAuth();

  const { data: locations, refetch } = useGetSingle<PaginationApiType<Location>>(
    '/locations/paginate',
    {
      limit: 1000,
      page: 1,
      search: dropSearch,
      sortBy: "id",
      sortOrder: "DESC",
      fields: "id,name,clientId",
    },
    []
  );

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      setDropSearch(searchTerm);
      refetch();
    }, 300),
    []
  );

  function toggleLevel(id: string) {
    setLevels(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function toggleType(id: string) {
    setTypes(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  }

  function onGenerateReport() {
    // Validation
    if (!selectedLocation) {
      toast({
        title: "Validation Error",
        description: "Please select a location",
        variant: "destructive"
      });
      return;
    }

    setLoadingPost(true);

    console.log('Sending dates:', { startDate, endDate });

    axios.post('/reports/daily-activities', {
      startDate: startDate,
      endDate: endDate,
      clientId: selectedLocation?.clientId ?? null,
      level: levels,
      type: types
    })
      .then(response => {
        console.log('Response:', response.data);

        // Check if response has error structure (data is null)
        if (response.data.data === null && response.data.message) {
          toast({
            title: "No Data Found",
            description: response.data.message,
            variant: "destructive"
          });
          return;
        }

        // Get the HTML content from response.data.data
        const htmlContent = response.data.data;

        if (!htmlContent) {
          toast({
            title: "Error",
            description: "No report data received",
            variant: "destructive"
          });
          return;
        }

        // Open report in new window
        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
        window.open(url, "_blank");

        toast({
          title: "Success",
          description: response.data.message || "Report generated successfully",
          variant: "default"
        });
      })
      .catch(error => {
        console.error('Error:', error);

        // Handle error response with message
        if (error.response?.data?.message) {
          const errorMessage = Array.isArray(error.response.data.message) 
            ? error.response.data.message[0] 
            : error.response.data.message;

          toast({
            title: "Error",
            description: errorMessage,
            variant: "destructive"
          });
        } else if (error.response?.status === 555) {
          toast({
            title: "Error",
            description: error.response?.data?.message || "An error occurred",
            variant: "destructive"
          });
        } else {
          toast({
            title: "Error",
            description: error.message || "Failed to generate report",
            variant: "destructive"
          });
        }
      })
      .finally(() => setLoadingPost(false));
  }

  return (
    <div className="p-4">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DatePickerSimple
          title="Start"
          name="startDate"
          defaultValue={getUTCDate(new Date())}
          placeholder="Select start date"
          onChange={(e) => {
            console.log("Start:", e.target.value);
            setStartDate(e.target.value);
          }}
        />

        <DatePickerSimple
          title="End"
          name="endDate"
          defaultValue={getUTCDate(new Date())}
          placeholder="Select end date"
          onChange={(e) => {
            console.log("End:", e.target.value);
            setEndDate(e.target.value);
          }}
        />
      </div>

      {/* Location */}
      <AdvanceSelectSimple
        title="Location"
        name="location"
        value={selectedLocation?.id.toString() || ""}
        options={locations?.items.map(item => ({
          label: item.name,
          value: item.id.toString()
        })) || []}
        placeholder="Please Select"
        onTypeing={handleSearch}
        onChange={e => {
          const location = locations?.items.find(d => d.id === +e.target.value) || null;
          setSelectedLocation(location);
        }}
        selected={undefined}
      />

      <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">

        <InlineCheckBoxSimple
          title="Level"
          name="level"
          items={LeveloptionsArray.map(x => ({
            id: x.value,
            name: x.label,
            checked: levels.includes(x.value),
          }))}
          onChange={(e) => toggleLevel(e.target.id)}
          placeholder={""}
        />

        <InlineCheckBoxSimple
          title="Type"
          name="type"
          items={typeOptions.map(x => ({
            id: x.value,
            name: x.label,
            checked: types.includes(x.value)
          }))}
          onChange={(e) => toggleType(e.target.id)}
          placeholder=""
        />
      </div>

     
      <div className="p-4 flex items-center justify-center">
        <Button
          className="mt-4 text-center"
          onClick={() => !isLoadingPost && onGenerateReport()}
        >
          {isLoadingPost ? "Processing..." : "Generate Report"}
        </Button>
      </div>

    </div>
  );
}