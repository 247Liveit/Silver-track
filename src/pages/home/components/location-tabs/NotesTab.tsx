import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { TabsContent } from "@/components/ui/tabs"
import { createLocationNoteSchema } from "@/lib/validation/zodSchema";
import { useAuthHook } from "@/providers/authContext";
import { getUTCDateTime } from "@/lib/utils";
import PopupModal from "@/components/shared/popup-modal";
import NoteForm from "./NoteForm";

export default function NotesTab({ issueId,notes }: {issueId:number, notes: { id: number, text: string, created_at: Date }[] }) {

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
                  onClose();
                }}
                validationSchema={createLocationNoteSchema}
                showNewBtn={false}>
                  <NoteForm entityId={issueId}/>
              </CustomFormLayout>
              );
            }}
          />
        </div>
        {notes.map(note => (
          <div key={note.id} className="p-2 border-b">

            <span className="bg-orange-300 rounded-lg p-1 text-sm mr-1">
              {note.created_at ? getUTCDateTime(new Date(note.created_at)).substring(16, -1) + " " : ''}
            </span>
            <p className="text-black">
              {note.text}</p>
          </div>
        ))}
      </div>
    </TabsContent>
  )
}