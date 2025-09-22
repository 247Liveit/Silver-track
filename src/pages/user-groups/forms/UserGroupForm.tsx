'use client'
import { UserCircleIcon } from "lucide-react";
import CustomInput from "@/components/shared/form/inputs/CustomInput";
import { useContext, useEffect } from "react";
import { FormContext } from "@/providers/formContext";
import { useGetLocations } from "@/lib/api/queries/locations";
import InlineCheckBoxSimple from "@/components/shared/form/inputs/InlineCheckBoxSimple";

export default function UserGroupForm() {
    const { setValue ,register,errors} = useContext(FormContext);
    const { data: locationData, isFetched: isFetchedlocation } = useGetLocations(0, '/locations');
    console.error(errors)
    useEffect(() => {
        setValue("system", "tracking")
    }, [])
    return (<div className="grid grid-cols-1 gap-4">
        <div className="col-md-12 col-lg-12 ">

            <CustomInput
                title="Name"
                name="name" type="string"
                placeholder="Name"
                icon={<UserCircleIcon />} />
        </div>

        <div className='max-h-[60vh] overflow-y-auto'>
            {isFetchedlocation?
                    <>
                     {locationData?.map(item => {
                        return (
                            <InlineCheckBoxSimple
                                error={""}
                                className='p-2'
                                {...register(`locationIds`)}
                                title={""}
                                defaultValue={item.id}
                                items={[{ id: item.id, name: item.name }]}
                                disabled={false}
                            />
                        )
                    })}
                    </>
                    :"Please Wait..."
                }

        </div>

    </div>
    )
}