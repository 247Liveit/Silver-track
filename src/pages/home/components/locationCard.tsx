import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Modal } from "@/components/ui/modal";
import { Location } from "@/types/pagesData";
import { ScrollArea } from "@radix-ui/react-scroll-area";
import { Building2Icon, MapIcon } from "lucide-react";
import { useState } from "react";
import LocationInfo from "./location-info";
import { Badge } from "@/components/ui/badge";

export default function LocationCard({ location }: { location: Location }) {
  const [ isOpeSchedule, setIsOpenSchedule ] = useState(false);
  const onCloseSchedule = () => setIsOpenSchedule(false);

  return (
    <>
      <Card className="@container/card rounded-lg grid grid-cols-1 lg:grid-cols-2 gap-2">
        <div>
          <CardHeader className="relative">
            <CardDescription>Location</CardDescription>
            <CardTitle className="@[250px]/card:text-3xl text-2xl font-semibold tabular-nums flex items-center gap-2">
              <Building2Icon />{location.name} {location.status ? <Badge>Active</Badge> : <Badge variant="outline" className="bg-red-500 text-white">Inactive</Badge>}
            </CardTitle>

          </CardHeader>
          <CardFooter className="flex-col items-start gap-1 text-sm">
            <div className="line-clamp-1 flex gap-2 font-medium">
              Address : {location.address}
            </div>
            <div className="text-muted-foreground">

              <a className="flex items-center gap-2" target="_blank" href={location.geoLocationUrl}>
                Locaiton on map <MapIcon className="size-4" /></a>
            </div>
          </CardFooter>
        </div>
        <div className="text-right m-4 grid grid-cols-1 place-items-center lg:place-items-end items-center gap-1 lg:gap-1">
          <Button className="w-full lg:w-32" onClick={() => { setIsOpenSchedule(true) }} >View Details</Button>
        </div>
      </Card>
      <Modal
        isOpen={isOpeSchedule}
        onClose={onCloseSchedule}
        userPopup={true}
        className={'!bg-background !px-1 w-[75%] lg:min-h-[52rem]  lg:max-h-[52rem]'}
      >
        <ScrollArea className="px-10">
          <h5 className="text-2xl font-bold mb-4">{location.name}</h5>
          <LocationInfo selectedLocation={location} />
        </ScrollArea>
      </Modal>
    </>
  );
}