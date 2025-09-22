'use client'
import { CheckIcon, PhoneCallIcon, UserCircleIcon } from "lucide-react";
import { EnvelopeOpenIcon, EyeClosedIcon, LockClosedIcon } from "@radix-ui/react-icons";
import { Role, RolesNames } from "@/rbac/aceess-rules";
import CustomInput from "@/components/shared/form/inputs/CustomInput";
import InlineRadioButton from "@/components/shared/form/inputs/InlineRadioButton";
import AdvanceSelect from "@/components/shared/form/inputs/AdvanceSelect";
import CustomSelect from "@/components/shared/form/inputs/CustomSelect";
import { useContext, useEffect } from "react";
import { FormContext } from "@/providers/formContext";
import { useGet } from "@/lib/api/queries/generic";
import { UserGroup } from "@/types/types";

export default function UserForm() {
    const { setValue,errors } = useContext(FormContext);
    const { data, isFetched,isLoading } = useGet<UserGroup>('user-groups',null);
    useEffect(() => {
        setValue("system", "tracking")
    }, [])

    console.log(errors)
    return (<div className="grid grid-cols-2 gap-4">
        <div className="col-md-12 col-lg-6 ">

            <CustomInput
                title="Name"
                name="name" type="string"
                placeholder="Name"
                icon={<UserCircleIcon />} />
        </div>
        <div className="col-md-12 col-lg-6">
            <CustomInput
                title="Email" name="email"
                autoComplete="new-email"
                type="email" placeholder="email@example.com"
                icon={<EnvelopeOpenIcon />} />
        </div>
        <div className="col-md-12 col-lg-6">
            <CustomInput
                autoComplete="new-password"
                title="Password" name="password"
                type="password" placeholder="password"
                icon={<LockClosedIcon />} />
        </div>
        <div className="col-md-12 col-lg-6">
            <CustomInput
                autoComplete="off" title="Phone" name="phone"
                type="text" placeholder="Phone"
                icon={<PhoneCallIcon />} />
        </div>

        <div className="col-md-12 col-lg-6">
            <CustomSelect
                className='dark:text-black' title="Role" name="role"
                options={RolesNames}
                selected={undefined}
                placeholder='Select Role ...' icon={<></>}
                type='single' />
        </div>
        {!isLoading&& isFetched ?
            <div className="col-md-12 col-lg-6">
                <CustomSelect
                    className='dark:text-black' title="Group" name="groupId"
                    options={(data?.map(item => {
                        return { value: item.id, label: item.name }
                    })) ?? []}
                    selected={undefined}
                    placeholder='Select Group ...' icon={<></>}
                    type='single' />
            </div>
            : "Please Wait..."
        }
        <InlineRadioButton
            title="Set Status"
            vertical={false}
            type="single"
            placeholder=""
            name="isActive"
            items={[
                {
                    title: "Active",
                    value: "1",
                    icon: <CheckIcon />,
                    placeholder: "Active"
                },
                {
                    title: "InActive",
                    value: "0",
                    icon: <EyeClosedIcon />,
                    placeholder: "InActive"
                }
            ]} />
    </div>
    )
}