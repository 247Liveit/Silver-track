import { TabsContent } from "@/components/ui/tabs";
import { useGet } from "@/lib/api/queries/generic";
import { IssueType, IssueTypes, IssueLevels, Location } from "@/types/pagesData";
import IssueTypeList from "../IssueTypeList";
import { Modal } from "@/components/ui/modal";
import { useState } from "react";
import InlineCheckBoxSimple from "@/components/shared/form/inputs/InlineCheckBoxSimple";
import { IssueTypeForm } from "../forms/IssueTypeForm";
import { Button } from "@/components/ui/button";
import { createIssueTypeSchema } from "@/lib/validation/zodSchema";
import CustomFormLayout from "@/components/shared/form/CustomFormLayout";
import { set } from "date-fns";

export default function IssueTypesTab({ location }: { location: Location | null }) {
  if (!location) return "No Location ! "
  const [isOpen, setIsOpen] = useState<string>("");
  const [currentIssue, setCurrentIssue] = useState<IssueTypes | {}>({});
  const [params, setParams] = useState<{ type?: string[], level?: string[], isActive?: string[] }>({})

  const { data, isLoading, refetch } = useGet<IssueType>('issue-types', {
    type: params.type?.length ? params.type.join(",") : undefined,
    level: params.level?.length ? params.level.join(",") : undefined,
    isActive: params.isActive?.length ? params.isActive.join(",") : undefined,
    locationId: location.id
  });

  const onFilterChange = (field: "type" | "level" | "isActive", e: React.ChangeEvent<HTMLInputElement>) => {

    if (e.target.checked) {
      setParams(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), e.target.id]
      }));
    } else {
      setParams(prev => ({
        ...prev,
        [field]: (prev[field] || []).filter(v => v !== e.target.id)
      }));
    }
  };
  const onEditIssueClick = (issueType: IssueType) => {
    setCurrentIssue(issueType);
    setIsOpen("Edit Issue");
  }
  return (
    <TabsContent value="issues" className={`"w-full h-11/12 grid  m-4 `}>
      <section className="grid lg:grid-cols-3 grid-cols-1 gap-4 border border-gray-300 p-4 rounded">
        {isLoading ? <p className="col-span-2">Loading... </p> :
          <IssueTypeList className="col-span-2" issues={data || []} selectedIssues={[]} onSelectionChange={() => { }} onEditClick={onEditIssueClick} />
        }
        <div>
          <InlineCheckBoxSimple
            className='dark:text-black'
            title="Type"
            name="type"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange("type", e)}
            items={Object.values(IssueTypes).map((level) => ({ id: level, name: level, checked: params.type?.includes(level) }))}
            placeholder='Select issue type'
            icon={<></>}
            disabled={false}
          />
          <InlineCheckBoxSimple

            className='dark:text-black'
            title="Level"
            name="level"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange("level", e)}
            items={Object.values(IssueLevels).map((level) => ({ id: level, name: level, checked: params.level?.includes(level) }))}
            placeholder='Select level'
            icon={<></>}
            disabled={false}
          />
          <InlineCheckBoxSimple
            type="checkbox"
            placeholder=""
            className='dark:text-black'
            title="Is Active"
            name="isActive"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => onFilterChange("isActive", e)}

            items={[
              { id: "1", name: "Active", checked: params.isActive?.includes("1") },
              { id: "0", name: "InActive", checked: params.isActive?.includes("0") },
              { id: "2", name: "For this Location", checked: params.isActive?.includes("2") }]}
            icon={<></>}
            disabled={false}
          />
        </div>
      </section>
      <section >
        <Button className="m-4" onClick={() => { setIsOpen("Add Issue") }}>Add Issue Type</Button>
      </section>
      <Modal

        key={"add"}
        isOpen={isOpen !== ""}
        onClose={() => { setIsOpen("");setCurrentIssue({}) }}
        className={'!bg-background !px-1'}
      >
        <h5 className='text-2xl font-bold px-4'>{isOpen}</h5>
         <CustomFormLayout url="/issue-types" validationSchema={createIssueTypeSchema} item={currentIssue} redirectUrl="" onSave={() => { refetch(); setIsOpen("");setCurrentIssue({}) }} >
        <IssueTypeForm  locationId={location?.id}/>
        </CustomFormLayout>
      </Modal>

    </TabsContent>
  );
}