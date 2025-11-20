import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple";
import DatePickerSimple from "@/components/shared/form/inputs/DatePickerSimple ";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useGetSingle } from "@/lib/api/queries/generic";
import { debounce } from "@/lib/utils";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { User } from "@/types/types";
import { useCallback, useState } from "react";


export default function UserShiftReportForm() {

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [dropSearch, setDropSearch] = useState<string>("");
  const [isLoadingPost, setLoadingPost] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const { toast } = useToast();
  const axios = useAxiosAuth();

  const { data: users, refetch } = useGetSingle<PaginationApiType<User>>(
    '/users',
    {
      limit: 1000,
      page: 1,
      search: dropSearch,
      sortBy: "id",
      sortOrder: "DESC",
      system: "intime"
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

  function onGenerateReport() {
    
    if (!selectedUser) {
      toast({
        title: "Validation Error",
        description: "Please select a user",
        variant: "destructive"
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Validation Error",
        description: "Please select start and end dates",
        variant: "destructive"
      });
      return;
    }

    setLoadingPost(true);

    axios.post('/reports/user-shift-activity', {
      userId: selectedUser.id,
      startDate: startDate,
      endDate: endDate
    })
      .then(response => {

        if (response.data.data === null && response.data.message) {
          toast({
            title: "No Data Found",
            description: response.data.message,
            variant: "destructive"
          });
          return;
        }

        const htmlContent = response.data.data;

        if (!htmlContent) {
          toast({
            title: "Error",
            description: "No report data received",
            variant: "destructive"
          });
          return;
        }

        const blob = new Blob([htmlContent], { type: "text/html" });
        const url = URL.createObjectURL(blob);
             window.open(url, "_blank", "noopener");

        toast({
          title: "Success",
          description: response.data.message || "Report generated successfully",
          variant: "default"
        });
      })
      .catch(error => {
        console.error('Error:', error);

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
          title="Start Date"
          name="startDate"
          placeholder="Select start date"
          onChange={(e) => {
            console.log("Start:", e.target.value);
            setStartDate(e.target.value);
          }}
        />

        <DatePickerSimple
          title="End Date"
          name="endDate"
          placeholder="Select end date"
          onChange={(e) => {
            console.log("End:", e.target.value);
            setEndDate(e.target.value);
          }}
        />
      </div>

      <AdvanceSelectSimple
        title="User"
        name="user"
        value={selectedUser?.id.toString() || ""}
        options={users?.items.map(item => ({
          label: `${item.name} (${item.email})`,
          value: item.id.toString()
        })) || []}
        placeholder="Please Select User"
        onTypeing={handleSearch}
        onChange={e => {
          const user = users?.items.find(d => d.id === +e.target.value) || null;
          setSelectedUser(user);
        }}
        selected={selectedUser?.id.toString() || ""}
      />

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