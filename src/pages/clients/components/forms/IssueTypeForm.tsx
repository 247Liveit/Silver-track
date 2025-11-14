 import CustomInput from "@/components/shared/form/inputs/CustomInput";
import InlineCheckBox from "@/components/shared/form/inputs/InlineCheckBox";
import InlineRadioButton from "@/components/shared/form/inputs/InlineRadioButton";
import { FormContext } from "@/providers/formContext";
import { IssueLevels, IssueTypes } from "@/types/pagesData";
import { useContext, useEffect } from "react";

export function IssueTypeForm({locationId,clientId}: {locationId:number,clientId:number}) {
    const form = useContext(FormContext);
    const isActive = form.watch('isActive');
    const displayForDispatch = form.watch('displayForDispatch');
    const displayForWebUsers = form.watch('displayForWebUsers');
    const autoClose = form.watch('autoClose');
    const checkPointOnly = form.watch('checkPointOnly');
    const displayInHandHeld = form.watch('displayInHandHeld');
    console.log(form.errors)
    useEffect(() => {
        form.setValue('locationId', locationId);
        form.setValue('clientId',clientId)
    }, [form.itemState?.locationId])
    return (

        <section className="grid lg:grid-cols-2 grid-cols-1 gap-4">
            <CustomInput
                className='col-span-2 dark:text-black'
                title="Name"
                name="name"
                placeholder='Enter issue type name'
                icon={<></>}
                disabled={false}
            />

            <CustomInput
                type="textarea"
                className='dark:text-black col-span-2 '
                title="Description"
                name="description"
                placeholder='Enter description'
                icon={<></>}
                disabled={false}
            />
            <InlineRadioButton
                type="select"
                className='dark:text-black'
                title="Type"
                name="type"
                vertical={false}
                items={Object.values(IssueTypes).map((level) => ({ title: level, value: level, placeholder: level, icon: <></> }))}
                placeholder='Select issue type'
                icon={<></>}
                disabled={false}
            />
            <InlineRadioButton
                type="select"
                vertical={false}
                className='dark:text-black'
                title="Level"
                name="level"
                items={Object.values(IssueLevels).map((level) => ({ title: level, value: level, placeholder: level, icon: <></> }))}
                placeholder='Select level'
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                placeholder=""
                title=""
                name="isActive"
                items={[{ value: 'isActive', label: 'Is Active', checked: isActive }]}
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                type="checkbox"
                placeholder=""
                title=""
                name="displayForDispatch"
                items={[{ value: 'displayForDispatch', label: 'Display For Dispatch', checked: displayForDispatch }]}
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                type="checkbox"
                placeholder=""
                title=""
                name="displayForWebUsers"
                items={[{ value: 'displayForWebUsers', label: 'Display For Web Users', checked: displayForWebUsers }]}
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                placeholder=""
                title=""
                items={[{ value: 'autoClose', label: 'Auto Close', checked: autoClose }]}
                name="autoClose"
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                placeholder=""
                title=""
                name="checkPointOnly"
                items={[{ value: 'checkPointOnly', label: 'Check Point Only', checked: checkPointOnly }]}
                icon={<></>}
                disabled={false}
            />
            <InlineCheckBox
                placeholder=""
                title=""
                name="displayInHandHeld"
                icon={<></>}
                items={[{ value: 'displayInHandHeld', label: 'Display In HandHeld', checked: displayInHandHeld }]}
                disabled={false}
            />
            {!form.itemState.id &&
                <InlineRadioButton
                    type="select"
                    vertical={false}
                    className='dark:text-black'
                    title="Other Options"
                    name="addTo"
                    items={[
                        { title: 'Add To Current Location', value: 'CURRENTLOCATION', placeholder: '', icon: <></> },
                        { title: 'Add To All Location', value: 'ALLLOCATION', placeholder: '', icon: <></> },
                    ]}
                    placeholder='Select level'
                    icon={<></>}
                    disabled={false}
                />
            }
        </section>
    )
}