import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import LocationScheduleTab from "./location-tabs/schedule-tab";
import { Location } from "@/types/pagesData";
import { useNavigate } from "react-router-dom";
import LocationRatesTab from "./location-tabs/RatesTab";
import LocationExtraChagresTab from "./location-tabs/location-extra-charges-tab";

export default function LocationInfo({ selectedLocation }: { selectedLocation: Location | null | undefined}) {
  const queryParams = new URLSearchParams(location.search);
    const navigate = useNavigate();
  
  return (
    <>
     <Tabs defaultValue="schedule" className="" onValueChange={value => {
        queryParams.delete('InfoFilterStartDate');
        queryParams.delete('InfoFilterEndDate');
        navigate({ search: queryParams.toString() });
      }}>
        <TabsList className="grid grid-cols-2  w-full lg:w-fit lg:flex lg:items-left">
          <TabsTrigger className="font-semibold text-md" value="schedule">Schedule</TabsTrigger>
          <TabsTrigger className="font-semibold text-md" value="extra">Extra Charges</TabsTrigger>
          <TabsTrigger className="font-semibold text-md" value="rates">Rates</TabsTrigger>
        </TabsList>

        <LocationScheduleTab id="schedule" location={selectedLocation} />
        <LocationExtraChagresTab id="extra" selectedLocation={selectedLocation}  />
        <LocationRatesTab id="rates" location={selectedLocation}/>
      

      </Tabs>

    </>
  )
}