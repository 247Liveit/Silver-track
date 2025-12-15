import AdvanceSelect from "@/components/shared/form/inputs/AdvanceSelect";
import CustomInputDateTime from "@/components/shared/form/inputs/CustomInputDateTime";
import InlineCheckBox from "@/components/shared/form/inputs/InlineCheckBox";
import { useGetSingle } from "@/lib/api/queries/generic";
import { debounce } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import { LeveloptionsArray, typeOptions } from "@/types/pagesData";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { Client } from "@/types/types";
import { useCallback, useContext, useEffect, useRef, useState } from "react";

interface DailyReportFormProps {
  showDate: boolean;
  type: string;
}

const DailyReportForm = ({ showDate, type }: DailyReportFormProps) => {
  const form = useContext(FormContext);
  const [dropSearch, setDropSearch] = useState<string>("");
 const [savedValues, setSavedValues] = useState({
    startDate: "",
    endDate: "",
    startTime: "", 
    endTime: "",
    clientId: undefined,
    level: [],
    type: [],
  });
  const { data: clients, refetch } = useGetSingle<PaginationApiType<Client>>(
    "/clients/paginate",
    {
      limit: 1000,
      page: 1,
      search: dropSearch,
      sortBy: "id",
      sortOrder: "DESC",
      fields: "id,name,contactName",
    },
    []
  );
  const hasRestoredRef = useRef(false);
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

  const { errors, edit, getValues, setValue, watch } = form;


   const watchedValues = watch();



     useEffect(() => {
    if (watchedValues) {
      setSavedValues({
        startDate: watchedValues.startDate || "",
        endDate: watchedValues.endDate || "",
        startTime: watchedValues.startTime || "", 
        endTime: watchedValues.endTime || "",  
        clientId: watchedValues.clientId,
        level: watchedValues.level || [],
        type: watchedValues.type || [],
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
      if (savedValues.clientId) setValue("clientId", savedValues.clientId);
      if (savedValues.level?.length) setValue("level", savedValues.level);
      if (savedValues.type?.length) setValue("type", savedValues.type);
      
      hasRestoredRef.current = true;
      
      
      setTimeout(() => {
        hasRestoredRef.current = false;
      }, 100);
    }
  }, [getValues, savedValues, setValue]);


  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {showDate && (
          <>
            <CustomInputDateTime
                          title="Start"
              name="startDate"
              type="date"
              showTime={true}
              timeName="startTime" 
              placeholder="Select start date"
              className="px-1"
            />
            <CustomInputDateTime
              title="End"
              name="endDate"
              type="date"
              showTime={true}
              timeName="endTime"
              placeholder="Select end date"
              className="px-1"
            />
          </>
        )}

        <AdvanceSelect
          className="dark:text-black mt-4 col-span-2"
          title="Client"
          name="clientId"
          disabled={false}
          options={
            clients?.items.map((item) => ({
              label: item.name || item.contactName || `Client ${item.id}`,
              value: item.id,
            })) || []
          }
          selected={getValues("clientId")}
          placeholder="Please Select"
          onTypeing={handleSearch}
          icon={<></>}
          error={errors?.clientId?.message || ""}
          type="single"
        />
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
        <InlineCheckBox
          placeholder=""
          name="level"
          error={errors?.level?.message || ""}
          className="p-2"
          title="Level"
          items={LeveloptionsArray}
          disabled={false}
        />
        <InlineCheckBox
          placeholder=""
          name="type"
          error={errors?.type?.message || ""}
          className="p-2"
          title="Type"
          items={typeOptions}
          disabled={false}
        />
      </div>
    </>
  );
};

export default DailyReportForm;