import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { TabsContent } from "@/components/ui/tabs"
import { createLocationNoteSchema } from "@/lib/validation/zodSchema";
import { useAuthHook } from "@/providers/authContext";
import { getUTCDateTime } from "@/lib/utils";
import PopupModal from "@/components/shared/popup-modal";
import NoteForm from "./NoteForm";
import { useGetSingle } from "@/lib/api/queries/generic";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { Note } from "@/types/types";
import { Button } from "@/components/ui/button";
import { TrashIcon } from "lucide-react";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import { onDelete } from "@/lib/api/axios/delete-item";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { useToast } from "@/components/ui/use-toast";
import { set } from "date-fns";
export default function NotesTab({ issueId }: { issueId: number, notes: { id: number, text: string, created_at: Date }[] }) {
  const axios = useAxiosAuth();
  const { toast } = useToast()
  const [openDeleteDialog, setIsOpenDialog] = useState(false);
  const [currentItem, setCurrentItem] = useState<Note | null>(null);
  const { data: notes, refetch } = useGetSingle<Note[]>(
    `/shared/notes/issues/${issueId}`,
    {},
    []
  );



  const auth = useAuthHook();
  return (
    <TabsContent value={"notes"} className="mt-4">
      <div className="border rounded-md p-4 overflow-auto max-h-96 overflow-y-auto">
        <div className="gap-3 mb-4">
          <PopupModal
            title='Add Note'
            url="/shared"
            showAddBtn={true}
            renderModal={(onClose) => {
              return (<CustomFormLayout
                item={{ password: "", system: "tracking" }}
                url={`/shared/notes/issues`} redirectUrl=''
                edit={true} onSave={() => {
                  refetch();
                  onClose();
                }}
                validationSchema={createLocationNoteSchema}
                showNewBtn={false}>
                <NoteForm entityId={issueId} />
              </CustomFormLayout>
              );
            }}
          />
        </div>
        {!notes || notes.length === 0 ? (
          <p className="text-gray-500">No notes yet</p>
        ) : (
          notes.map(note => (
            <div key={note.id} className="p-2 border-b flex justify-between items-start group hover:bg-gray-50">
         
              <div className="flex-1">
                <span className="bg-orange-300 rounded-lg p-1 text-sm mr-1">
                  {note.created_at ? getUTCDateTime(new Date(note.created_at)).substring(16) + " " : ''}
                </span>
                <p className="text-black mt-1">
                  {note.text}
                </p>
              </div>

            
              <button
                className="ml-2 p-1 opacity-0 opacity-100 hover:bg-red-100 rounded"
                onClick={() => {
                  setCurrentItem(note);
                  setIsOpenDialog(true);
                }}
                title="Delete note"
              >
                <TrashIcon className="h-5 w-5 text-red-500" />
              </button>
            </div>

          ))
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
                  onDelete(`/shared/notes/issues/${issueId}/${currentItem?.id}`, currentItem, axios, toast, () => refetch());
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