import CustomInputSimple from "@/components/shared/form/inputs/CustomInputSimple";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUTCDateTime } from "@/lib/utils";
import { Issue } from "@/types/pagesData";
import NotesTab from "./location-tabs/NotesTab";
import PhotosTab from "./location-tabs/PhotosTab";
import { MapIcon } from "lucide-react";

export default function IssueInfo({ issue, className }: { issue: Issue | null, className?: string | null }) {


    if (!issue) return (<>No Issue Selected</>)
    console.log("Issue Info:", issue);
    return (
        <section className={`grid grid-cols-3 m-4 gap-4 ${className}`}>
            <div className={``}>
                <CustomInputSimple inputClassName="text-black " name="details" title="Report Details" placeholder="" defaultValue={issue?.details + ""} disabled={true} />
                <CustomInputSimple inputClassName="text-black" name="client" title="Client" placeholder="" defaultValue={issue?.client?.name + ""} disabled={true} />
                <CustomInputSimple inputClassName="text-black" name="location" title="Location" placeholder="" defaultValue={issue?.location?.name + ""} disabled={true} />
                <CustomInputSimple inputClassName="text-black" name="address" title="Address" placeholder="" defaultValue={issue?.location?.address + ""} disabled={true} />
                <CustomInputSimple inputClassName="text-black" name="reportedAddress" title="Reported Address" placeholder="" defaultValue={issue?.address + ""} disabled={true} />
            </div>
            <div className={``}>
                <CustomInputSimple inputClassName="text-black" name="status" title="Status" placeholder="" defaultValue={issue?.status + ""} disabled={true} />
                <CustomInputSimple inputClassName="text-black" name="Created" title="Created Date" placeholder="" defaultValue={issue.created_at ? getUTCDateTime(new Date(issue.created_at)).substring(16, -1) : ''} disabled={true} />
                <CustomInputSimple inputClassName="text-black" name="closedDate" title="Closed Date" placeholder="" defaultValue={issue.closedDate ? getUTCDateTime(new Date(issue.closedDate)).substring(16, -1) : ''} disabled={true} />
            </div>
            <div className={``}>
                <Tabs defaultValue="notes" className="" onValueChange={value => { }}>
                    <TabsList className="grid grid-cols-2  w-full lg:w-fit lg:flex lg:items-left">
                        <TabsTrigger className="font-semibold text-md" value="notes">Notes</TabsTrigger>
                        <TabsTrigger className="font-semibold text-md" value="photos">Photos</TabsTrigger>
                    </TabsList>
                    <NotesTab issueId={issue.id} notes={issue.notes || []} />
                    <PhotosTab  issueId={issue.id}/>

                </Tabs>
            </div>
            <div className="p-2 mt-4 border-t">
                <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${issue.geoLocation?.lat},${issue.geoLocation?.lng}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex text-sm text-blue-600 hover:underline">
                    <MapIcon /> View location on Google Maps
                </a>
            </div>
        </section>
    )
}