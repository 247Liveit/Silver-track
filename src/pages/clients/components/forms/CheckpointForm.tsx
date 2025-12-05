import CustomInput from "@/components/shared/form/inputs/CustomInput";
import CustomSelect from "@/components/shared/form/inputs/CustomSelect";
import InlineCheckBox from "@/components/shared/form/inputs/InlineCheckBox";
import { useGet } from "@/lib/api/queries/generic";
import { FormContext } from "@/providers/formContext";
import { IssueType } from "@/types/pagesData";
import { useContext, useEffect } from "react";


export function CheckPointForm({ locationId,clientId}: { locationId: number,clientId:number }) {
    const form = useContext(FormContext);
    const isActive = form.watch('isActive');
    const issueTypeId = form.watch('issue_type_id');
    const allowKeepOpen = form.watch('allowKeepOpen');
    const requiredPhoto = form.watch('requiredPhoto');
    const reportIfMissing = form.watch('reportIfMissing');
     


    const { data, isFetched } = useGet<IssueType>('/issue-types/names');
   

   useEffect(() => {
        form.setValue('locationId', locationId);
        form.setValue('clientId', clientId);

    }, [locationId, clientId]);

    return (

        <section className="grid lg:grid-cols-2 grid-cols-1 gap-4 overflow-y-auto max-h-[70vh] p-4">

            <CustomInput
                className='col-span-2 dark:text-black'
                title="Name"
                name="name"
                placeholder='Enter issue type name'
                icon={<></>}
                disabled={false}
            />

            <CustomInput
                type="text"
                className='dark:text-black col-span-2 '
                title="Location"
                name="address"
                placeholder='Enter Location'
                icon={<></>}
                disabled={false}
            />

           

            <div className="col-span-2 grid grid-cols-3 gap-4">
                <CustomInput
                    type="text"
                    className='dark:text-black col-span-2 m-0'
                    title="QR Code Value"
                    name="qrCode"
                    placeholder='Enter QR Code Value'
                    icon={<></>}
                    disabled={false}
                />
                <img src={"/qrcode.png"} alt="QR Code" className="h-24 w-24 object-contain text-center" />

            </div>
            <div className="col-span-2 grid lg:grid-cols-3 grid-cols-1 gap-4">
                <CustomSelect
                    className='dark:text-black col-span-2'
                    title="Issue Type"
                    name="issue_type_id"
                    otherOption={true}
                    options={isFetched ? (data ?? []).map(item => ({ label: item.name, value: item.id })) : []}
                    selected={undefined}
                    placeholder='Select Issue ...'
                    icon={<></>}
                    type='single'

                />
                {((!issueTypeId || issueTypeId === "0") && !form?.itemState?.id) &&
                    <InlineCheckBox
                        placeholder=""
                        className="mt-6"
                        title=""
                        name="createIssueType"
                        items={[{ value: 'CreateIssueType', label: 'Auto Create Issue Type' }]}
                        icon={<></>}
                        disabled={false}
                    />
                }
            </div>
            <CustomInput
                type="textarea"
                className='dark:text-black col-span-2 m-0'
                title="Reports Note"
                name="reportNote"
                placeholder='Enter Report Note'
                icon={<></>}
                disabled={false}
            />
            <CustomInput
                type="textarea"
                className='dark:text-black col-span-2 m-0 '
                title="Officer Instuction"
                name="officerInstuction"
                placeholder='Enter Officer Instuction'
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                placeholder=""
                className="m-0"
                title=""
                name="isActive"
                items={[{ value: 'isActive', label: 'Is Active', checked: isActive }]}
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                placeholder=""
                className="m-0"
                title=""
                name="allowKeepOpen"
                items={[{ value: 'allowKeepOpen', label: 'Allow Keep Open', checked: allowKeepOpen }]}
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                placeholder=""
                className="m-0"
                title=""
                name="requiredPhoto"
                items={[{ value: 'requiredPhoto', label: 'Required Photo', checked: requiredPhoto }]}
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                placeholder=""
                className="m-0"
                title=""
                name="reportIfMissing"
                items={[{ value: 'reportIfMissing', label: 'Report If Missing', checked: reportIfMissing }]}
                icon={<></>}
                disabled={false}
            />
        </section>
    )
}