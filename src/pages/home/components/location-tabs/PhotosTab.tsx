import { TabsContent } from "@/components/ui/tabs"
import { useAuthHook } from "@/providers/authContext";
import { getUTCDateTime } from "@/lib/utils";
import { Backend_Public_URL } from "@/lib/constants/Constants";
import { CameraIcon, TrashIcon } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { onDelete } from "@/lib/api/axios/delete-item";
import { Modal } from "@/components/ui/modal";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { Attachment } from "@/types/types";
import { useGetSingle } from "@/lib/api/queries/generic";


export default function PhotosTab({ issueId }: { issueId: number }) {

  const auth = useAuthHook();
  const { toast } = useToast();
  const axios = useAxiosAuth();
  const [openDeleteDialog, setIsOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<Attachment | null>(null);
  const { data: attachments, refetch } = useGetSingle<Attachment[]>(
    `/shared/attachments/issues/${issueId}`,
    {},
    []
  );
  return (


    <TabsContent value={"photos"} className="mt-4">
      <div className="border rounded-md p-4 overflow-auto max-h-96 overflow-y-auto">
        {attachments && attachments.length > 0 ? (
          attachments.map(attachment => {

            const isLocalPath = !attachment.path.startsWith('http://') && !attachment.path.startsWith('https://');

            const fileUrl = isLocalPath
              ? `${Backend_Public_URL}/${attachment.path}`
              : attachment.path;

            return (
              <div key={attachment.id} className="p-2 border-b flex justify-between items-start group hover:bg-gray-50">
                <div className="flex-1">
                  <span className="bg-orange-300 rounded-lg p-1 text-sm mr-1">
                    {attachment.created_at ? getUTCDateTime(new Date(attachment.created_at)).substring(16) + " " : ''}
                  </span>
                  <p className="text-black">
                    <a
                      className="flex text-blue-500 m-1"
                      href={fileUrl}
                      target="_blank"
                    >
                      <CameraIcon size={22} className="mr-1" /> - {attachment.originalName}
                    </a>
                  </p>
                </div>

                <button
                  className="ml-2 p-1 opacity-0 group-hover:opacity-100 hover:bg-red-100 rounded transition-all flex-shrink-0"
                  onClick={() => {
                    setCurrentItem(attachment);
                    setIsOpenDialog(true);
                  }}
                  title="Delete photo"
                >
                  <TrashIcon className="h-5 w-5 text-red-500" />
                </button>
              </div>
            );
          })
        ) : (
          <p>No photos available</p>
        )}
      </div>
     <div className="flex gap-3 mb-4">
        <Modal
          key={"delete"}
          userPopup={true}
          isOpen={openDeleteDialog}
          onClose={() => { setIsOpenDialog(false) }}
          className={'!bg-background !px-1'}
        >
          <div className="rounded-md bg-gray-50 p-4 md:p-6">
            <p>Are you sure you want to delete?</p>
            <div className="flex items-center justify-between mt-4">
              <Button
                className="flext-1 bg-red-500 disabled:bg-gray-500"
                onClick={() => {
                  onDelete(`/shared/attachments/issues/${issueId}/${currentItem?.id}`, currentItem, axios, toast, () => refetch());
                  setIsOpenDialog(false);
                }}>
                Yes
              </Button>
              <Button className="flext-1" onClick={() => setIsOpenDialog(false)}>No</Button>
            </div>
          </div>
        </Modal>

      </div>

    </TabsContent>
  )
}