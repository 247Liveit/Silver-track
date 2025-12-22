import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useGetSingle } from "@/lib/api/queries/generic";
import { Location } from "@/types/pagesData";
import { Client } from "@/types/types";
import {useState } from "react";
import LocationInfoTab from "./tabs/LocationInfoTab";
import IssueTypesTab from "./tabs/IssueTypesTab";
import CheckpointTab from "./tabs/CheckpointsTab";
import NoteTab from "./tabs/NoteTab";

export default function ClientLocations({ client, className }: { client: Client | null, className?: string | undefined }) {

    if (!client) return (<>No Client Selected</>)

    const { data, isLoading } = useGetSingle<{ locations: Location[], client: Client }>(`/clients/location/${client.id}?withInactive=1`);
  
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);
const activeLocation = selectedLocation || data?.locations?.[0] || null;
    console.log("rerender")

     return (
        <section className={`grid grid-cols-12 m-4 ${className}`}>

            {!isLoading ? <>
                <ul className="border-r border-gray-300 col-span-3">
                    {data?.locations?.length ? (
                        data.locations.map((item: Location) => (
                            <li key={item.id}>
                                <Button
                                    onClick={() => setSelectedLocation(item)}
                                    variant={activeLocation?.id === item.id ? "default" : "outline"}
                                    className={`m-1 w-[90%] ${activeLocation?.id === item.id
                                            ? 'bg-primary text-primary-foreground'
                                            : 'hover:bg-accent'
                                        }`}
                                >
                                    {item.name}
                                </Button>
                            </li>
                        ))
                    ) : (
                        <b className="text-red-400">- No locations for this client!</b>
                    )}
                </ul>

                <div className="col-span-9 m-1">

                    <Tabs defaultValue="locationInfo" className="" key={selectedLocation?.id} >
                        <TabsList className="grid grid-cols-2  w-full lg:w-fit lg:flex lg:items-left gap-2">
                            <TabsTrigger value="locationInfo">Location Info</TabsTrigger>
                            <TabsTrigger value="noteInfo">Note Info </TabsTrigger>
                            <TabsTrigger value="issues">Issues Typs</TabsTrigger>
                            <TabsTrigger value="Checkpoints">Checkpoints</TabsTrigger>

                        </TabsList>
                        <div className="w-full border-b mt-1 mb-1"></div>
                        <LocationInfoTab   location={selectedLocation ? selectedLocation : (data?.locations.length ? data?.locations[0] : null)} />
                        <NoteTab  clientId ={client.id}/>
                        <IssueTypesTab location={selectedLocation ? selectedLocation : (data?.locations.length ? data?.locations[0] : null)} />
                        <CheckpointTab  clientId ={client.id}     location={selectedLocation ? selectedLocation : (data?.locations.length ? data?.locations[0] : null)} />
                    </Tabs>

                </div>
            </> : "Please Wait..."}
        </section>
    )
}

