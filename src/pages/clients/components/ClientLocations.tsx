import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetSingle } from "@/lib/api/queries/generic";
import LocationCard from "@/pages/home/components/locationCard";
import { Location } from "@/types/pagesData";
import { Client } from "@/types/types";
import { useState } from "react";
import LocationInfoTab from "./tabs/LocationInfoTab";

export default function ClientLocations({ client, className }: { client: Client | null, className?: string | undefined }) {

    if (!client) return (<>No Client Selected</>)

    const { data, isLoading } = useGetSingle<{ locations: Location[], client: Client }>(`/clients/location/${client.id}?withInactive=1`);
    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
    console.log("rerender")
    return (
        <section className={`grid grid-cols-6 m-4 ${className}`}>

            {!isLoading ? <>
                <ul className="border-r border-gray-300">

                    {
                        data?.locations?.length ?
                            data?.locations?.map((item: Location) => (
                                <>
                                    <Button variant={"outline"} className="m-1 w-[90%]">{item.name}</Button>
                                    <Button variant={"outline"} className="m-1 w-[90%]">{item.name}</Button>
                                    <Button variant={"outline"} className="m-1 w-[90%]">{item.name}</Button>
                                    <Button variant={"outline"} className="m-1 w-[90%]">{item.name}</Button>
                                    <Button variant={"outline"} className="m-1 w-[90%]">{item.name}</Button>
                                    <Button variant={"outline"} className="m-1 w-[90%]">{item.name}</Button>
                                    <Button variant={"outline"} className="m-1 w-[90%]">{item.name}</Button>
                                    <Button variant={"outline"} className="m-1 w-[90%]">{item.name}</Button>
                                </>
                            ))
                            : <b className="text-red-400">- No locations for this client !</b>
                    }
                </ul>
                <div className="col-span-5 m-1">

                    <Tabs defaultValue="locationInfo" className="" >
                        <TabsList className="grid grid-cols-2  w-full lg:w-fit lg:flex lg:items-left gap-2">
                            <TabsTrigger value="locationInfo">Location Info</TabsTrigger>
                            <TabsTrigger value="locationInfo">Location Info</TabsTrigger>
                        </TabsList>
                        <div className="w-full border-b mt-1 mb-1"></div>
                        <LocationInfoTab location={selectedLocation ? selectedLocation : (data?.locations.length ? data?.locations[0] : null)} />
                    </Tabs>

                </div>
            </> : "Please Wait..."}
        </section>
    )
}

