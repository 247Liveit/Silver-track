'use client'
import { FileTextIcon, MapPinIcon, Building2Icon, AlertCircleIcon, UserIcon, CalendarIcon, MapIcon } from "lucide-react";
import CustomInput from "@/components/shared/form/inputs/CustomInput";
import CustomSelect from "@/components/shared/form/inputs/CustomSelect";
import { useCallback, useContext, useMemo, useState } from "react";
import { FormContext } from "@/providers/formContext";
import { useGet, useGetSingle } from "@/lib/api/queries/generic";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { Client, User } from "@/types/types";
import { IssueStatus, Location } from "@/types/pagesData";
import AdvanceSelect from "@/components/shared/form/inputs/AdvanceSelect";
import { debounce } from "@/lib/utils";

export default function IssueForm() {
    const { errors, getValues, setValue, watch } = useContext(FormContext);
    const [dropSearch, setDropSearch] = useState<string>("");

    const handleSearch = useCallback(
        debounce((searchTerm: string) => {
            setDropSearch(searchTerm);
            refetch();
        }, 300),
        []
    );
    const statusOptions = useMemo(() => {
        return Object.values(IssueStatus).map(status => ({
            value: status,
            label: status.replace(/([A-Z])/g, ' $1').trim()
        }));
    }, []);

    const { data: clients } = useGetSingle<PaginationApiType<Client>>(
        "/clients/paginate",
        { limit: 1000, page: 1, sortBy: "id", sortOrder: "DESC", fields: "id,name,contactName" },
        []
    );


    const { data: issueTypes, isFetched: isFetchedIssueTypes, isLoading: isLoadingIssueTypes } = useGetSingle<PaginationApiType<any>>(
        "/issue-types/paginate",
        { limit: 1000, page: 1 },
        []
    );


    const { data: users, refetch } = useGetSingle<PaginationApiType<User>>(
        "/users",
        {
            limit: 1000,
            page: 1,
            search: dropSearch,
            sortBy: "id",
            sortOrder: "DESC",
            system: "intime",
        },
        []
    );


    const happenedAtValue = watch('happenedAt');
    const selectedClientId = watch('clientId');
    const currentGeoLat = watch('geoLocation.lat');
    const currentGeoLng = watch('geoLocation.lng');


    const { data: locationsData, isLoading: isLoadingLocations } = useGet<Location>(
        'locations',
        { withInactive: false },
        `/clients/location/${selectedClientId}`
    );




    const clientsOptions = useMemo(() => {
        return (clients?.items || []).map(client => ({
            value: String(client.id),
            label: client.name
        }));
    }, [clients]);

    const locationsOptions = useMemo(() => {

        if (!selectedClientId) return [];


        const locations = Array.isArray(locationsData)
            ? locationsData
            : (locationsData as any)?.locations || [];

        return locations.map((location: Location) => ({
            value: String(location.id),
            label: location.name
        }));
    }, [locationsData, selectedClientId]);

    const issueTypesOptions = useMemo(() => {
        return (issueTypes?.items || []).map(type => ({
            value: String(type.id),
            label: type.name
        }));
    }, [issueTypes]);

 



       const usersOptionsAdvance = useMemo(() => {
        return (users?.items || []).map(user => ({
            value: Number(user.id), 
            label: `${user.name} (${user.email})`
        }));
    }, [users]);

    return (
        <div className="grid grid-cols-2 gap-4">

            <div className="col-md-12 col-lg-12">
                <CustomInput
                    title="Report Details"
                    name="details"
                    type="textarea"
                    placeholder="Enter issue details"
                    icon={<FileTextIcon />}
                />
            </div>
            <AdvanceSelect
                className="dark:text-black mt-4"
                title="User"
                name="userId"
                disabled={false}
             options={usersOptionsAdvance} 
                selected={getValues("userId")}
                placeholder="Please Select User"
                onTypeing={handleSearch}
                icon={<></>}
                error={errors?.userId?.message || ""}
                type="single"
            />



            <AdvanceSelect
                className="dark:text-black mt-4"
                title="Assigned To"
                 name="assigendToId"
                disabled={false}
                options={usersOptionsAdvance} 
                selected={getValues("assigendToId")}
                placeholder="Please Select AssignedTo"
                onTypeing={handleSearch}
                icon={<></>}
                error={errors?.userId?.message || ""}
                type="single"
            />


            <div className="col-md-12 col-lg-6">
                <CustomSelect
                    className='dark:text-black'
                    title="Client"
                    name="clientId"
                    options={clientsOptions}
                    selected={undefined}
                    placeholder='Select Client...'
                    icon={<Building2Icon />}
                    type='single'
                />
            </div>

            {/* Location */}
            {!isLoadingLocations ? (
                <div className="col-md-12 col-lg-6">
                    <CustomSelect
                        className='dark:text-black'
                        title="Location"
                        name="locationId"
                        options={locationsOptions}
                        selected={undefined}
                        placeholder={selectedClientId ? 'Select Location...' : 'Select Client First'}
                        icon={<MapPinIcon />}
                        type='single'
                    />
                </div>
            ) : (
                "Please Wait..."
            )}


            {!isLoadingIssueTypes && isFetchedIssueTypes ? (
                <div className="col-md-12 col-lg-6">
                    <CustomSelect
                        className='dark:text-black'
                        title="Issue Type"
                        name="issueTypeId"
                        options={issueTypesOptions}
                        selected={undefined}
                        placeholder='Select Issue Type...'
                        icon={<AlertCircleIcon />}
                        type='single'
                    />
                </div>
            ) : (
                "Please Wait..."
            )}

            {/* Status */}
            <div className="col-md-12 col-lg-6">
                <CustomSelect
                    className='dark:text-black'
                    title="Status"
                    name="status"
                    options={statusOptions}
                    selected={undefined}
                    placeholder='Select Status...'
                    icon={<></>}
                    type='single'
                />
            </div>

            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Reported Address"
                    name="address"
                    type="text"
                    placeholder="Enter reported address"
                    icon={<MapPinIcon />}
                />
            </div>

            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Happened At"
                    name="happenedAt"
                    type="text"
                    placeholder={happenedAtValue}

                />
            </div>


            {watch('status') === 'Closed' && (
                <div className="col-md-12 col-lg-6">
                    <CustomInput
                        title="Closed Date"
                        name="closedDate"
                        type="datetime-local"
                        placeholder="When was it closed?"
                        icon={<CalendarIcon />}
                    />
                </div>
            )}


            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Latitude"
                    name="geoLocation.lat"
                    type="number"
                    placeholder="Latitude"
                    disabled={true}
                />
            </div>

            <div className="col-md-12 col-lg-6">
                <CustomInput
                    title="Longitude"
                    name="geoLocation.lng"
                    type="number"
                    placeholder="Longitude"
                   disabled={true}
                />
            </div>

            {currentGeoLat && currentGeoLng && (
                <div className="col-md-12 col-lg-12 p-2 border-t">
                    <a
                        href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${currentGeoLat},${currentGeoLng}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-sm text-blue-600 hover:underline"
                    >
                        <MapIcon className="w-4 h-4" />
                        View location on Google Maps
                    </a>
                </div>
            )}
        </div>
    );
}