import AdvanceSelect from "@/components/shared/form/inputs/AdvanceSelect";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useGetSingle } from "@/lib/api/queries/generic";
import { debounce } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { Client } from "@/types/types";
import { useCallback, useContext, useState } from "react";

const CheckpointReportForm = () => {
  const form = useContext(FormContext);
  const [dropSearch, setDropSearch] = useState<string>("");

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

  const { errors, getValues, watch, setValue } = form;

  const allLocations = watch("allLocations");
  const isAllSelected = allLocations === "All";

  const handleAllClientsChange = (checked: boolean) => {
    if (checked) {
      setValue("allLocations", "All");
      setValue("clientId", null);
    } else {
      setValue("allLocations", null);
    }
  };

  return (
    <>
      <AdvanceSelect
        className="dark:text-black mt-4"
        title="Client"
        name="clientId"
        disabled={isAllSelected}
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

      <div className="flex items-center space-x-2 mt-4 mb-4">
        <Checkbox
          id="allClients"
          checked={isAllSelected}
          onCheckedChange={handleAllClientsChange}
        />
        <Label htmlFor="allClients" className="cursor-pointer">
          All Clients
        </Label>
      </div>
    </>
  );
};

export default CheckpointReportForm;