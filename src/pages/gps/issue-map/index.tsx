



import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple";
import DatePickerSimple from "@/components/shared/form/inputs/DatePickerSimple ";
import InlineCheckBoxSimple from "@/components/shared/form/inputs/InlineCheckBoxSimple";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useGetSingle } from "@/lib/api/queries/generic";
import { debounce } from "@/lib/utils";
import { Issue, LeveloptionsArray, typeOptions, Location } from "@/types/pagesData";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { Client } from "@/types/types";
import { useCallback, useMemo, useState } from "react";
import { useLocation } from "react-router-dom";
import IssueMap from "./components/IsssueMap";

export default function GpsForm() {
  const location = useLocation();
  const navigationState = location.state as { selectedIssue?: Issue, clientId?: number, locationId?: number };

  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
  const [dropSearch, setDropSearch] = useState<string>("");
  const [levels, setLevels] = useState<string[]>([]);
  const [types, setTypes] = useState<string[]>([]);
  const [isLoadingPost, setLoadingPost] = useState<boolean>(false);
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [issues, setIssues] = useState<Issue[]>([]);
  const [showMap, setShowMap] = useState<boolean>(false);
  const [locations, setLocations] = useState<Location[]>([]);
  const [isLoadingLocations, setIsLoadingLocations] = useState<boolean>(false);
  const [isInitialized, setIsInitialized] = useState<boolean>(false);

  const { toast } = useToast();
  const axios = useAxiosAuth();

  const { data: clients, refetch } = useGetSingle<PaginationApiType<Client>>(
    '/clients/paginate',
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


  const initializeFromNavigation = useCallback(() => {
    if (isInitialized || !navigationState?.selectedIssue || !clients?.items) return;

    const { selectedIssue, clientId, locationId } = navigationState;
    
    const client = clients.items.find(c => c.id === clientId);
    if (client) {
      setSelectedClient(client);
      
   
      setIsLoadingLocations(true);
      axios.get(`/clients/location/${client.id}`, {
        params: { withInactive: false }
      })
        .then(response => {
          const responseData = response.data.data;
          const locationData: Location[] = responseData?.locations || [];
          setLocations(Array.isArray(locationData) ? locationData : []);

       
          if (locationId) {
            const location = locationData.find(l => l.id === locationId);
            if (location) setSelectedLocation(location);
          }
        })
        .catch(error => {
          console.error('Error fetching locations:', error);
          toast({
            title: "Error",
            description: "Failed to load locations for this client",
            variant: "destructive"
          });
          setLocations([]);
        })
        .finally(() => setIsLoadingLocations(false));
    }


    if (selectedIssue.issueType?.level) {
      setLevels([selectedIssue.issueType.level]);
    }
    
    if (selectedIssue.issueType?.type) {
      setTypes([selectedIssue.issueType.type]);
    }


    setIssues([selectedIssue]);
    setShowMap(true);
    setIsInitialized(true);

    toast({
      title: "Issue Loaded",
      description: `Showing Issue #${selectedIssue.id} on map`,
      variant: "default"
    });
  }, [navigationState, clients, isInitialized, axios, toast]);

 
  if (!isInitialized && clients?.items) {
    initializeFromNavigation();
  }

  const handleSearch = useCallback(
    debounce((searchTerm: string) => {
      setDropSearch(searchTerm);
      refetch();
    }, 300),
    [refetch]
  );

  const fetchLocations = useCallback(async (client: Client) => {
    setIsLoadingLocations(true);
    
    try {
      const response = await axios.get(`/clients/location/${client.id}`, {
        params: { withInactive: false }
      });
      
      const responseData = response.data.data;
      const locationData: Location[] = responseData?.locations || [];
      setLocations(Array.isArray(locationData) ? locationData : []);
      
      return locationData;
    } catch (error) {
      console.error('Error fetching locations:', error);
      toast({
        title: "Error",
        description: "Failed to load locations for this client",
        variant: "destructive"
      });
      setLocations([]);
      return [];
    } finally {
      setIsLoadingLocations(false);
    }
  }, [axios, toast]);





  const handleClientChange = useCallback((clientId: string) => {
    const client = clients?.items.find(d => d.id === +clientId) || null;
    setSelectedClient(client);
    setSelectedLocation(null);
    setShowMap(false);
    setIssues([]);
    
    if (client) {
      fetchLocations(client);
    } else {
      setLocations([]);
    }
  }, [clients, fetchLocations]);




  const handleLocationChange = useCallback((locationId: string) => {
    const location = locations.find(l => l.id === +locationId) || null;
    setSelectedLocation(location);
    setShowMap(false);
    setIssues([]);
  }, [locations]);

  const toggleLevel = useCallback((id: string) => {
    setLevels(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const toggleType = useCallback((id: string) => {
    setTypes(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  }, []);

  const onShowMap = useCallback(() => {
    if (!selectedClient) {
      toast({
        title: "Validation Error",
        description: "Please select a client",
        variant: "destructive"
      });
      return;
    }

    if (!startDate || !endDate) {
      toast({
        title: "Validation Error",
        description: "Please select both start and end dates",
        variant: "destructive"
      });
      return;
    }

    setLoadingPost(true);

    const requestBody = {
      clientId: selectedClient.id,
      locationId: selectedLocation?.id,
      startDate,
      endDate,
      level: levels.length > 0 ? levels : undefined,
      type: types.length > 0 ? types : undefined,
    };

    axios.post('/map/client/issues', requestBody)
      .then(response => {
        if (!response.data.issues || response.data.issues.length === 0) {
          toast({
            title: "No Data Found",
            description: "No issues with geolocation found for the selected filters",
            variant: "destructive"
          });
          setIssues([]);
          setShowMap(false);
          return;
        }

        setIssues(response.data.issues);
        setShowMap(true);

        toast({
          title: "Success",
          description: `Found ${response.data.total} issue(s) with location data`,
          variant: "default"
        });
      })
      .catch(error => {
        console.error('Error details:', error.response?.data || error);

        const errorMessage = error.response?.data?.message
          ? Array.isArray(error.response.data.message) 
            ? error.response.data.message.join(', ')
            : error.response.data.message
          : error.message || "Failed to load issues";

        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive"
        });
        
        setIssues([]);
        setShowMap(false);
      })
      .finally(() => setLoadingPost(false));
  }, [selectedClient, selectedLocation, startDate, endDate, levels, types, axios, toast]);

  const locationOptions = useMemo(() => 
    Array.isArray(locations) 
      ? locations.map(location => ({
          label: location.name || location.address || `Location ${location.id}`,
          value: location.id.toString()
        })) 
      : [],
    [locations]
  );

  const clientOptions = useMemo(() => 
    clients?.items.map(item => ({
      label: item.name,
      value: item.id.toString()
    })) || [],
    [clients]
  );

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <DatePickerSimple 
          title="start" 
          name="startDate" 
          placeholder="Select start date" 
          onChange={(e) => setStartDate(e.target.value)} 
        />

        <DatePickerSimple 
          title="end" 
          name="endDate" 
          placeholder="Select end date" 
          onChange={(e) => setEndDate(e.target.value)} 
        />
      </div>

      <AdvanceSelectSimple
        title="Client"
        name="client"
        value={selectedClient?.id.toString() || ""}
        options={clientOptions}
        placeholder="Please Select"
        onTypeing={handleSearch}
        onChange={e => handleClientChange(e.target.value)}
        selected={selectedClient?.id.toString() || ""}
      />

      {selectedClient && (
        <AdvanceSelectSimple
          title="Location"
          name="location"
          value={selectedLocation?.id.toString() || ""}
          options={locationOptions}
          placeholder={isLoadingLocations ? "Loading locations..." : "All Locations"}
          onChange={e => handleLocationChange(e.target.value)}
          selected={selectedLocation?.id.toString() || ""}
        />
      )}

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
          placeholder=""
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
          onClick={onShowMap} 
          disabled={isLoadingPost}
        >
          {isLoadingPost ? "Loading..." : "Show Map"}
        </Button>
      </div>

      {showMap && issues.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-bold mb-4">
            Issues Map - {selectedClient?.name}
            {selectedLocation && ` - ${selectedLocation.name}`}
            {` (${issues.length} issues)`}
          </h2>
          <IssueMap issues={issues} />
        </div>
      )}
    </div>
  );
}