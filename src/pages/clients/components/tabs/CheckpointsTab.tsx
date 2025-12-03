import { TabsContent } from "@/components/ui/tabs";
import { useGet } from "@/lib/api/queries/generic";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { onDelete } from "@/lib/api/axios/delete-item";
import CheckpointsTable from "../CheckpointTable";
import { Checkpoint, Location } from "@/types/pagesData";
import { createCheckPointTypeSchema } from "@/lib/validation/zodSchema";
import { CheckPointForm } from "../forms/CheckpointForm";
import { useQueryClient } from "@tanstack/react-query";
import { Client } from "@/types/types";

export default function CheckpointTab({ location, clientId , onCheckpointCreated  }: { location: Location | null, clientId:number,onCheckpointCreated?: () => void }) {
  if (!location) return "No Location ! "
  const [isOpen, setIsOpen] = useState<string>("");
  const [isPostLoading, setIsPostLoading] = useState<boolean>(false);
  const [currentCheckPoint, setCurrentCheckPoint] = useState<Checkpoint | {}>({});
  const [params, setParams] = useState<{ type?: string[], level?: string[], isActive?: string[] }>({})
  const axios = useAxiosAuth()
  const { toast } = useToast()
  const { data, isLoading, refetch } = useGet<Checkpoint>('checkpoints', {
    locationId: location.id
  });
    const queryClient= useQueryClient()

const handleCheckpointSaved = () => {
    console.log("Checkpoint saved, triggering issue refetch");
    refetch();
    setIsOpen("");
    queryClient.invalidateQueries({queryKey:['issue-types']})
    setCurrentCheckPoint({});

  };

  const handleCheckpointDeleted = () => {
    console.log("Checkpoint deleted, triggering issue refetch");
  };


  return (
    <TabsContent value="Checkpoints" className={`"w-full h-11/12 grid  m-4 `}>
      <section className="grid lg:grid-cols-1 grid-cols-1 gap-4 border border-gray-300 p-4 rounded">
        {isLoading ? <p className="col-span-2">Loading... </p> :
          <CheckpointsTable items={data??[]}  onDataChange={refetch} locationId={location.id} clientId={clientId}/>
        }
      </section>
      <section >
        <Button className="m-4" onClick={() => { setIsOpen("Add CheckPoint") }}>Add CheckPoint</Button>
      </section>
      <Modal

        key={"add"}
        isOpen={isOpen !== "Delete CheckPoint" && isOpen !== ""}
        onClose={() => { setIsOpen(""); setCurrentCheckPoint({}) }}
        className={'!bg-background !px-1'}
      >
        <h5 className='text-2xl font-bold px-4'>{isOpen}</h5>
        <CustomFormLayout url="/checkpoints" validationSchema={createCheckPointTypeSchema} showNewBtn={false}
        item={currentCheckPoint} redirectUrl=""  onSave={handleCheckpointSaved} >
          <CheckPointForm locationId={location.id}  clientId={clientId} />
        </CustomFormLayout>
      </Modal>
      <div className="flex gap-3 mb-4">
        <Modal
          key={"delete"}
          userPopup={true}
          isOpen={isOpen === "Delete CheckPoint"}
          onClose={() => { setIsOpen(""); setCurrentCheckPoint({}) }}
          className={'!bg-background !px-1'}
        >
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <p>Are you sure you want to delete?</p>
            <div className="flex items-center justify-between mt-4">
              <Button
                className="flext-1 bg-red-500 disabled:bg-gray-500"
                onClick={() => {
                  onDelete(`/checkpoints/${(currentCheckPoint as Checkpoint)?.id}`, currentCheckPoint, axios, toast, refetch);
                  setIsOpen(""); setCurrentCheckPoint({});  handleCheckpointDeleted();
                }}>
                Yes
              </Button>
              <Button className="flext-1" onClick={() => { setIsOpen(""); setCurrentCheckPoint({}) }}>No</Button>
            </div>
          </div>
        </Modal>

      </div>
    </TabsContent>
  );
}