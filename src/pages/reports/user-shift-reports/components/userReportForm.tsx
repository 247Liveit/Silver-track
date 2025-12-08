import AdvanceSelect from "@/components/shared/form/inputs/AdvanceSelect";
import CustomInput from "@/components/shared/form/inputs/CustomInput";
import { useGetSingle } from "@/lib/api/queries/generic";
import { debounce } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { User } from "@/types/types";
import CustomInputDateTime from "@/components/shared/form/inputs/CustomInputDateTime";
import { useCallback, useContext, useState, useEffect, useRef } from "react";

const UserShiftReportForm = () => {
  const form = useContext(FormContext);
  const [dropSearch, setDropSearch] = useState<string>("");
  
  const [savedValues, setSavedValues] = useState({
    startDate: "",
    endDate: "",
    startTime: "", 
    endTime: "",
    userId: undefined,
  });
  
  const hasRestoredRef = useRef(false);

  const { data: users, refetch } = useGetSingle<PaginationApiType<User>>(
    "/users",
    {
      limit: 1000,
      page: 1,
      search: dropSearch,
      sortBy: "id",
      sortOrder: "DESC",
      system: "intime",
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

  if (!form) {
    return <div>Loading...</div>;
  }

  const { errors, getValues, setValue, watch } = form;

  const watchedValues = watch();


  useEffect(() => {
    if (watchedValues) {
      setSavedValues({
        startDate: watchedValues.startDate || "",
        endDate: watchedValues.endDate || "",
           startTime: watchedValues.startTime || "", 
        endTime: watchedValues.endTime || "",  
        userId: watchedValues.userId,
      });
    }
  }, [watchedValues]);

 
  useEffect(() => {
    const currentStartDate = getValues("startDate");
  
    
   
    if (
      savedValues.startDate &&
      !currentStartDate &&
      !hasRestoredRef.current
    ) {
      setValue("startDate", savedValues.startDate);
      setValue("endDate", savedValues.endDate);
            if (savedValues.startTime) setValue("startTime", savedValues.startTime);
      if (savedValues.endTime) setValue("endTime", savedValues.endTime); 
      if (savedValues.userId) setValue("userId", savedValues.userId);
      
      hasRestoredRef.current = true;
      
     
      setTimeout(() => {
        hasRestoredRef.current = false;
      }, 100);
    }
  }, [getValues, savedValues, setValue]);

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CustomInputDateTime
          title="Start Date"
          name="startDate"
          type="date"
                showTime={true}
               timeName="startTime" 
          placeholder="Select start date"
          className="px-1"
        />
        <CustomInputDateTime
          title="End Date"
          name="endDate"
          type="date"
          showTime={true}
          timeName="endTime"
          placeholder="Select end date"
          className="px-1"
        />
      </div>

      <AdvanceSelect
        className="dark:text-black mt-4"
        title="User"
        name="userId"
        disabled={false}
        options={
          users?.items.map((item) => ({
            label: `${item.name} (${item.email})`,
            value: item.id,
          })) || []
        }
        selected={getValues("userId")}
        placeholder="Please Select User"
        onTypeing={handleSearch}
        icon={<></>}
        error={errors?.userId?.message || ""}
        type="single"
      />
    </>
  );
};

export default UserShiftReportForm;