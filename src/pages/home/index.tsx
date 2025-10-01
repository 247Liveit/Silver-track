import { BuildingIcon, GemIcon, NotebookIcon } from "lucide-react"

import { useGetSingle } from "@/lib/api/queries/generic"
import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Location } from "@/types/pagesData";
import { SkeletonBig } from "@/components/ui/skeleton";
import LocationCard from "./components/locationCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Client } from "@/types/types";
import { Modal } from "@/components/ui/modal";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { clientSchema } from "@/lib/validation/zodSchema";
import ClientsForm from "../clients/components/forms/ClientForm";
import { Button } from "@/components/ui/button";
import { dateFromat } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

export default function DashboardPage() {
  const [searchParams] = useSearchParams();
  const clientId = searchParams.get('clientId');
  const error = searchParams.get('error');
  const { data, isLoading, refetch } = useGetSingle<{ locations: Location[], client: Client }>(`/clients/location/${clientId}?withInactive=1`);
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  
  useEffect(() => {
    refetch();
  }, [clientId])

  

  if (isLoading && clientId) {
    return (
      <SkeletonBig />
    )
  }
  return (
    <div className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {clientId ?
        <>
          <div className="flex justify-between">
            <h5 className="font-bold flex gap-2"><GemIcon /> Client Info </h5>
            <Button className="w-full lg:w-32" onClick={() => { setIsOpen(true) }} >Edit Client</Button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
            <Card className="@container/card rounded-lg grid grid-cols-1  gap-2">
              <CardHeader>
                <CardDescription>Open Balance </CardDescription>
                <CardTitle className="text-2xl font-normal tabular-nums @[250px]/card:text-3xl">
                  ${Number(data?.client?.balance || 0).toFixed(2) + ""}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="@container/card rounded-lg grid grid-cols-1 gap-2">
              <CardHeader>
                <CardDescription>Tracking Address </CardDescription>
                <CardTitle className="text-xl font-normal tabular-nums @[250px]/card:text-3xl">
                  Address: {data?.client.address + ""}<br />
                  State: {data?.client.state + ""}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className="@container/card rounded-lg grid grid-cols-1  gap-2">
              <CardHeader>
                <CardDescription>Contacts </CardDescription>
                <CardTitle className="text-xl font-normal tabular-nums @[250px]/card:text-3xl">
                  Email:
                  <a
                    href={`mailto:${data?.client.email}`}
                    className="text-blue-500 hover:underline pl-2"
                  >
                    {data?.client.email}
                  </a>
                  <br />

                  {/* Phone */}
                  Phone:
                  <a
                    href={`tel:${data?.client.phone}`}
                    className="text-blue-500 hover:underline pl-2"
                  >
                    {data?.client.phone}
                  </a>
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
          {clientId &&
          <>
            <h5 className="font-bold flex gap-2"><NotebookIcon /> Notes </h5>
            <Card className="@container/card rounded-lg grid grid-cols-1  gap-2">
              <CardHeader>
                <CardContent>
                  {data?.client.notes}
                </CardContent>
              </CardHeader>
            </Card>
            </>
          }
          <h5 className="font-bold flex gap-2 mt-4"><BuildingIcon /> Client Locations </h5>

          {data?.locations.length === 0 ?
            <div className="mt-8 text-center text-muted-foreground">
              No locations found
            </div>
            :
            data?.locations?.map((item: Location) => (
              <LocationCard key={item.id} location={item} />
            ))}
        </>
        :
        <><h5 className="text-center font-bold text-orange-5 00">Select a Client to view the locations</h5></>
      }
      {error&&
              <>
              <h5 className="text-center font-normal text-red-500">{error} , Please logout and login again</h5>
              </>
}

      <div className="flex gap-3 mb-4">
        <Modal
          key={"edit"}
          isOpen={isOpen}
          onClose={() => { setIsOpen(false) }}
          className={'!bg-background !px-1'}
        >
          <h5 className='text-2xl font-bold px-4'>{"Update Client"}</h5>

          <CustomFormLayout key={"formEditView"} item={data?.client} url='/clients'
            redirectUrl='' edit={true} showNewBtn={false}
            validationSchema={clientSchema}
            onSave={(clients: Client) => {
              refetch();
              setIsOpen(false)
            }}>
            <ClientsForm />
          </CustomFormLayout>


        </Modal>

      </div>
    </div>
  )
}
