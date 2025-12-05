import AdvanceSelect from "@/components/shared/form/inputs/AdvanceSelect";
import CustomInput from "@/components/shared/form/inputs/CustomInput";
import { useGetSingle } from "@/lib/api/queries/generic";
import { debounce } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { User } from "@/types/types";
import { useCallback, useContext, useState } from "react";

const UserShiftReportForm = () => {
  const form = useContext(FormContext);
  const [dropSearch, setDropSearch] = useState<string>("");

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

  const { errors, getValues } = form;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <CustomInput
          title="Start Date"
          name="startDate"
          type="date"
          placeholder="Select start date"
          className="px-1"
        />
        <CustomInput
          title="End Date"
          name="endDate"
          type="date"
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