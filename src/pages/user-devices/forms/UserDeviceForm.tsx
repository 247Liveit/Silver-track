'use client'
import { CheckIcon, PhoneCallIcon } from "lucide-react";
import { EnvelopeOpenIcon, EyeClosedIcon, MobileIcon } from "@radix-ui/react-icons";
import CustomInput from "@/components/shared/form/inputs/CustomInput";
import InlineRadioButton from "@/components/shared/form/inputs/InlineRadioButton";
import { useContext, useEffect } from "react";
import { FormContext } from "@/providers/formContext";
import { User } from "@/types/types";

export default function UserDeviceForm({ user }: { user?: User }) {
    const { setValue } = useContext(FormContext);
    useEffect(() => {
        setValue("system", "tracking")
        setValue("userId", user?.id)
    }, [])

    return (<div className="grid grid-cols-2 gap-4">
        <div className="col-md-12 col-lg-6 ">

            <CustomInput
                title="Brand"
                name="brand" type="text"
                placeholder="Brand" disabled={true}
                icon={<MobileIcon />} />
        </div>
        <div className="col-md-12 col-lg-6">
            <CustomInput
                title="Device Id" name="deviceId"
                type="text" placeholder=""  disabled={true}
                icon={<EnvelopeOpenIcon />} />
        </div>
        <div className="col-md-12 col-lg-6">
            <CustomInput
                autoComplete="off" title="User" name="user"
                type="text" placeholder="user" disabled={true}
                icon={<PhoneCallIcon />} />
        </div>
        <div className="col-md-12 col-lg-6">
            <CustomInput
                autoComplete="off" title="Phone" name="phone"
                type="text" placeholder="Phone" disabled={true}
                icon={<PhoneCallIcon />} />
        </div>
        <div className="col-md-12 col-lg-6">
            <CustomInput
                autoComplete="off" title="Registered" name="registered"
                type="text" placeholder="Registered" disabled={true}
                icon={<PhoneCallIcon />} />
        </div>
        <div className="col-md-12 col-lg-6">
            <CustomInput
                autoComplete="off" title="Last Login" name="lastLogin"
                type="text" placeholder="lastLogin" disabled={true}
                icon={<PhoneCallIcon />} />
        </div>



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