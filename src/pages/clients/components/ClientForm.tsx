'use client'
import { PhoneCallIcon, UserCircleIcon } from "lucide-react";
import { EnvelopeOpenIcon } from "@radix-ui/react-icons";
import CustomInput from "@/components/shared/form/inputs/CustomInput";
import { useGet } from "@/lib/api/queries/generic";
import CustomSelect from "@/components/shared/form/inputs/CustomSelect";
import { useContext, useEffect } from "react";
import { FormContext } from "@/providers/formContext";

export default function ClientsForm() {
    const { data, isFetched } = useGet<{ id: number, name: string }>('/terms')
    const form = useContext(FormContext)
    useEffect(()=>{
        form.setValue('termId',form.itemState?.termId)
    },[])
    return (
        <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 col-md-12 col-lg-6">
                <CustomInput
                    title="Name"
                    name="name"
                    type="string"
                    placeholder="Name"
                    icon={<UserCircleIcon />}
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Email"
                    name="email"
                    autoComplete="new-email"
                    type="email"
                    placeholder="email@example.com"
                    icon={<EnvelopeOpenIcon />}
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Manager Email"
                    name="managerEmail"
                    autoComplete="new-email"
                    type="email"
                    placeholder="email@example.com"
                    icon={<EnvelopeOpenIcon />}
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <CustomInput
                    autoComplete="off"
                    title="Phone Number"
                    name="phone"
                    type="text"
                    placeholder="Phone"
                    icon={<PhoneCallIcon />}
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Contact Name"
                    name="contactName"
                    type="text"
                    placeholder="Contact Name"
                />
        </div>
            {isFetched &&
                <CustomSelect className='col-span-2 dark:text-white m-0' title="Payment Term" name="termId"
                    options={data?.map(item => { return { value: item.id+"", label: item.name } }) || []}
                    selected={undefined}
                    placeholder='Please Select...'
                    icon={<></>} error={""} type='single'
                    onChange={e => {

                    }}
                />
            }
            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Address"
                    name="address"
                    type="textarea"
                    rows={4}
                    placeholder="Address"
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Address 2"
                    name="address2"
                    rows={4}
                    type="textarea"
                    placeholder="Address 2"
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="City"
                    name="city"
                    type="text"
                    placeholder="City"
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="State"
                    name="state"
                    type="text"
                    placeholder="State"
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Zip"
                    name="zip"
                    type="text"
                    placeholder="Zip"
                />
            </div>

            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Fax"
                    name="fax"
                    type="text"
                    placeholder="Fax"
                />
            </div>
            <div className="col-span-2 col-md-12 col-lg-12">
                <CustomInput
                    title="Notes"
                    name="notes"
                    type="textarea"
                    placeholder="Notes"
                    rows={5}
                />
            </div>
        </div>
    );
}