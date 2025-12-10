'use client'
import { Search, UserCircleIcon } from "lucide-react";
import CustomInput from "@/components/shared/form/inputs/CustomInput";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FormContext } from "@/providers/formContext";
import { useGetLocations } from "@/lib/api/queries/locations";
import InlineCheckBoxSimple from "@/components/shared/form/inputs/InlineCheckBoxSimple";
import { debounce } from "@/lib/utils";
import CustomInputSimple from "@/components/shared/form/inputs/CustomInputSimple";

export default function UserGroupForm() {
    const { setValue ,register,errors} = useContext(FormContext);
    const { data: locationData, isFetched: isFetchedlocation } = useGetLocations(0, '/locations');
    const [searchTerm, setSearchTerm] = useState('');
    console.error(errors)
    useEffect(() => {
        setValue("system", "tracking")
    }, [])

 const handleLocationSearch = useCallback(
        debounce((value: string) => {
            setSearchTerm(value);
        }, 300),
        []
    );
  const filteredLocations = useMemo(() => {
        if (!locationData) return [];
        return locationData.filter(location =>
            location.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
    }, [locationData, searchTerm]);

    return (<div className="grid grid-cols-1 gap-4">
        <div className="col-md-12 col-lg-12 ">

            <CustomInput
                title="Name"
                name="name" type="string"
                placeholder="Name"
                icon={<UserCircleIcon />} />
        </div>
          <CustomInputSimple
                error=""
                title="Search location"
                name="locationSearch"
                type="text"
                placeholder="Search locations..."
                icon={<Search />}
                disabled={false}
                onChange={(e) => handleLocationSearch(e.target.value)}
            />
        <div className='max-h-[60vh] overflow-y-auto'>
            {isFetchedlocation?
                    <>
                  {filteredLocations.length > 0 ? (
                            filteredLocations.map(item => (
                                <InlineCheckBoxSimple
                                    key={item.id}
                                    error={""}
                                    className='p-2'
                                    {...register("locationIds")}
                                    title={""}
                                    defaultValue={item.id}
                                    items={[{ id: item.id, name: item.name }]}
                                    disabled={false}
                                />
                            ))
                        ) : (
                            <p className="text-center text-gray-500 py-4">
                                No locations found matching "{searchTerm}"
                            </p>
                        )}
                    </>
                    :"Please Wait..."
                }

        </div>

    </div>
    )
}