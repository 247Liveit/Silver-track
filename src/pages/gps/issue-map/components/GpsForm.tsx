import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple";
import InlineCheckBoxSimple from "@/components/shared/form/inputs/InlineCheckBoxSimple";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useGetSingle } from "@/lib/api/queries/generic";
import { debounce } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import { Issue, LeveloptionsArray, Location, typeOptions } from "@/types/pagesData";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { Client } from "@/types/types";
import { useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import DatePickerSimple from "@/components/shared/form/inputs/DatePickerSimple";


export function GpsFormContent() {
  const routeLocation = useLocation();
  const navigationState = routeLocation.state as {
    selectedIssue?: Issue;
    clientId?: number;
    locationId?: number;
  };

  const formContext = useContext(FormContext);


  if (!formContext) {
    return <div>Loading...</div>;
  }

  const { watch, setValue, errors } = formContext;

  const [dropSearch, setDropSearch] = useState<string>("");

  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState<boolean>(false);
  const [isLoadingMap, setIsLoadingMap] = useState<boolean>(false);

  const isInitializedRef = useRef<boolean>(false);
  const previousClientIdRef = useRef<number | null>(null);

  const { toast } = useToast();
  const axios = useAxiosAuth();
  console.log("Form errors:", errors);
  // Watch form values
  const clientId = watch("clientId");
  const locationId = watch("locationId");
  const levels = watch("level") || [];
  const types = watch("type") || [];
  const startDate = watch("startDate");
  const endDate = watch("endDate");
  const startTime = watch("startTime");
  const endTime = watch("endTime");

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


  const fetchLocations = useCallback(
    async (clientIdValue: number): Promise<Location[]> => {
      setIsLoadingLocations(true);

      try {
        const response = await axios.get(`/clients/location/${clientIdValue}`, {
          params: { withInactive: false },
        });

        const responseData = response.data.data;
        const locationData: Location[] = responseData?.locations || [];
        setLocations(Array.isArray(locationData) ? locationData : []);

        return locationData;
      } catch (error) {
        console.error("Error fetching locations:", error);
        toast({
          title: "Error",
          description: "Failed to load locations for this client",
          variant: "destructive",
        });
        setLocations([]);
        return [];
      } finally {
        setIsLoadingLocations(false);
      }
    },
    [axios, toast]
  );


  useEffect(() => {
    if (isInitializedRef.current) return;

    const initialClientId = clientId && clientId > 0 ? clientId : null;

    if (initialClientId) {
      previousClientIdRef.current = initialClientId;

      fetchLocations(initialClientId).then((locationData) => {

        if (navigationState?.locationId) {
          const navLocation = locationData.find(
            (l) => l.id === navigationState.locationId
          );
          if (navLocation) {
            setValue("locationId", navLocation.id);
          }
        }
      });

      if (navigationState?.selectedIssue) {
        toast({
          title: "Issue Loaded",
          description: `Showing Issue #${navigationState.selectedIssue.id} on map`,
          variant: "default",
        });
      }
    }

    isInitializedRef.current = true;
  }, [clientId, navigationState, fetchLocations, setValue, toast]);

  useEffect(() => {
    if (!isInitializedRef.current) return;

    const currentClientId = clientId && clientId > 0 ? clientId : null;


    if (currentClientId === previousClientIdRef.current) return;

    previousClientIdRef.current = currentClientId;

    if (currentClientId) {
      fetchLocations(currentClientId);
      setValue("locationId", null);

    } else {
      setLocations([]);
      setValue("locationId", null);

    }
  }, [clientId, fetchLocations, setValue]);

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      setDropSearch(searchTerm);
      refetch();
    }, 300),
    [refetch]
  );

  const handleClientChange = useCallback(
    (newClientId: string) => {
      const parsedId = parseInt(newClientId);
      setValue("clientId", parsedId || 0);
    },
    [setValue]
  );

  const handleLocationChange = useCallback(
    (newLocationId: string) => {
      setValue("locationId", parseInt(newLocationId) || null);
    },
    [setValue]
  );

  const toggleLevel = useCallback(
    (id: string) => {
      const currentLevels = levels || [];
      const newLevels = currentLevels.includes(id)
        ? currentLevels.filter((x) => x !== id)
        : [...currentLevels, id];
      setValue("level", newLevels);
    },
    [levels, setValue]
  );

  const toggleType = useCallback(
    (id: string) => {
      const currentTypes = types || [];
      const newTypes = currentTypes.includes(id)
        ? currentTypes.filter((x) => x !== id)
        : [...currentTypes, id];
      setValue("type", newTypes);
    },
    [types, setValue]
  );

  const locationOptions = useMemo(
    () =>
      Array.isArray(locations)
        ? locations.map((location) => ({
          label: location.name || location.address || `Location ${location.id}`,
          value: location.id.toString(),
        }))
        : [],
    [locations]
  );

  const clientOptions = useMemo(
    () =>
      clients?.items.map((item) => ({
        label: item.name || item.contactName || `Client ${item.id}`,
        value: item.id.toString(),
      })) || [],
    [clients]
  );

  const hasClientSelected = clientId && clientId > 0;

  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DatePickerSimple
          title="Start Date"
          name="startDate"
          placeholder="Select start date"
          onChange={(e) => setValue("startDate", e.target.value)}
          showTime={true}
          timeName="startTime"
          timeValue={startTime}
          onTimeChange={(e) => setValue("startTime", e.target.value)}
          error={errors?.startDate?.message}
          timeError={errors?.startTime?.message}
        />

        <DatePickerSimple
          title="End Date"
          name="endDate"
          placeholder="Select end date"
          onChange={(e) => setValue("endDate", e.target.value)}
          showTime={true}
          timeName="endTime"
          timeValue={endTime}
          onTimeChange={(e) => setValue("endTime", e.target.value)}
          error={errors?.endDate?.message}
          timeError={errors?.endTime?.message}
        />
      </div>

      <AdvanceSelectSimple
        title="Client"
        name="client"
        value={clientId?.toString() || ""}
        options={clientOptions}
        placeholder="Please Select"
        onTypeing={handleSearch}
        onChange={(e) => handleClientChange(e.target.value)}
        selected={clientId?.toString() || ""}
      />

      <div className={hasClientSelected ? "" : "hidden"}>
        <AdvanceSelectSimple
          title="Location"
          name="location"
          value={locationId?.toString() || ""}
          options={locationOptions}
          placeholder={isLoadingLocations ? "Loading locations..." : "All Locations"}
          onChange={(e) => handleLocationChange(e.target.value)}
          selected={locationId?.toString() || ""}
        />
      </div>

      <div className="col-span-2 grid grid-cols-2 gap-4 mt-4">
        <InlineCheckBoxSimple
          title="Level"
          name="level"
          items={LeveloptionsArray.map((x) => ({
            id: x.value,
            name: x.label,
            checked: (levels || []).includes(x.value),
          }))}
          onChange={(e) => toggleLevel(e.target.id)}
          placeholder=""
        />
        <InlineCheckBoxSimple
          title="Type"
          name="type"
          items={typeOptions.map((x) => ({
            id: x.value,
            name: x.label,
            checked: (types || []).includes(x.value),
          }))}
          onChange={(e) => toggleType(e.target.id)}
          placeholder=""
        />
      </div>


    </>
  );
}