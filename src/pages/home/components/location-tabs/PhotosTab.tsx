import { TabsContent } from "@/components/ui/tabs"
import { useAuthHook } from "@/providers/authContext";
import { getUTCDateTime } from "@/lib/utils";
import { Backend_Public_URL } from "@/lib/constants/Constants";
import { CameraIcon } from "lucide-react";

export default function PhotosTab({ attachments }: { attachments: { id: number, path: string, originalName: string, created_at: Date }[] }) {

  const auth = useAuthHook();
  return (
    <TabsContent value={"photos"} className="mt-4">
      
      <div className="border rounded-md p-4 overflow-auto max-h-96 overflow-y-auto">
        {attachments.map(attachment => (
          <div key={attachment.id} className="p-2 border-b">

            <span className="bg-orange-300 rounded-lg p-1 text-sm mr-1">
              {attachment.created_at ? getUTCDateTime(new Date(attachment.created_at)).substring(16, -1) + " " : ''}
            </span>
            <p className="text-black">
              <a className="flex text-blue-500 m-1"
                href={`${Backend_Public_URL}/public-shared/attachement/${encodeURI(attachment.path)}`} target="_blank">
                 <CameraIcon size={22} className="mr-1"/> - {attachment.originalName}
              </a>
            </p>
          </div>
        ))}
      </div>
    </TabsContent>
  )
}