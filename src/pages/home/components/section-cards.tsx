import { GemIcon } from "lucide-react"

import { useGet } from "@/lib/api/queries/generic"
import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import LocationCard from "./locationCard";
import { Location } from "@/types/pagesData";
import { SkeletonBig } from "@/components/ui/skeleton";

export function SectionCards() {
  const [searchParams, setSearchParams] = useSearchParams();
  const clientId = searchParams.get('clientId');
  const { data , isLoading,refetch } = useGet<Location>(`/clients/location/${clientId}`);

  useEffect(() => {
    refetch();
  },[clientId])
  
  if (isLoading&&clientId) {
    return (
      <SkeletonBig/>
    )
  }
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {clientId ?
      <>
      <h5 className="font-bold flex gap-2"><GemIcon/> Client Locaitons </h5>
      {data?.length === 0 ? 
      <div className="mt-8 text-center text-muted-foreground">
        No locations found
      </div> 
      :
      data?.map((item:Location) => (
        <LocationCard key={item.id} location={item} />
      ))}
      </>
      :
      <><h5 className="text-center font-bold text-orange-5 00">Select a Client to view the locations</h5></>
    }
    </div>
  )
}
