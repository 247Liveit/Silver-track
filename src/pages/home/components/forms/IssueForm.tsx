'use client'
import { FileTextIcon, MapPinIcon, Building2Icon, AlertCircleIcon, CalendarIcon, MapIcon } from "lucide-react";
import CustomInputSimple from "@/components/shared/form/inputs/CustomInputSimple";
import CustomSelect from "@/components/shared/form/inputs/CustomSelect";
import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { FormContext } from "@/providers/formContext";
import { useGet, useGetSingle } from "@/lib/api/queries/generic";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import { Client, User } from "@/types/types";
import { IssueStatus, Location } from "@/types/pagesData";
import AdvanceSelect from "@/components/shared/form/inputs/AdvanceSelect";
import { debounce } from "@/lib/utils";
import { Issue } from "@/types/pagesData";
import CustomInput from "@/components/shared/form/inputs/CustomInput";

export default function IssueForm({ issue }: { issue: Issue | null }) {
    const { errors, getValues, watch ,setValue} = useContext(FormContext);
    const [dropSearch, setDropSearch] = useState<string>("");

    const handleSearch = useCallback(
        debounce((searchTerm: string) => {
            setDropSearch(searchTerm);
            refetch();
        }, 300),
        []
    );

    //  useEffect(() => {
    //     if (issue) {
    //         setValue('details', issue.details || '');
    //         setValue('happenedAt', issue.happenedAt || '');
    //     }
    // }, [issue?.id, issue?.details, issue?.happenedAt, setValue]);

    // const { data: clients } = useGetSingle<PaginationApiType<Client>>(
    //     "/clients/paginate",
    //     { limit: 1000, page: 1, sortBy: "id", sortOrder: "DESC", fields: "id,name,contactName" },
    //     []
    // );

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

    const keepOpen = watch('keepOpen');
    const currentStatus = watch('status');
    const selectedClientId = watch('clientId') || String(issue?.client?.id || '');
    const selectedLocationId = watch('locationId') || String(issue?.location?.id || '');
    const currentGeoLat = watch('geoLocation.lat');
    const currentGeoLng = watch('geoLocation.lng');

    const statusOptions = useMemo(() => {
        const allStatuses = Object.values(IssueStatus).map(status => ({
            value: status,
            label: status.replace(/([A-Z])/g, ' $1').trim()
        }));

        return allStatuses;
    }, [keepOpen]);

    const { data: locationsData, isLoading: isLoadingLocations } = useGet<Location>(
        'locations',
        { withInactive: false },
        `/clients/location/${selectedClientId}`
    );

    // const clientsOptions = useMemo(() => {
    //     return (clients?.items || []).map(client => ({
    //         value: String(client.id),
    //         label: client.name
    //     }));
    // }, [clients]);

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


    const selectedLocationName = useMemo(() => {
        if (!selectedLocationId) return '';
        const location = locationsOptions.find(loc => loc.value === String(selectedLocationId));
        return location ? location.label : issue?.location?.name || '';
    }, [selectedLocationId, locationsOptions, issue?.location?.name]);

    return (
        <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2">
                <CustomInput
                    title="Report Details"
                    name="details"
                    type="textarea"
                    placeholder="Enter issue details"
                    icon={<FileTextIcon />}
                />
            </div>

          
                   <CustomInputSimple
                    className='dark:text-black'
                    title="User"
                    name="userId"
                    type="text"
                    placeholder='Please Select User'
                    icon={<Building2Icon />}
                    disabled={true}
                    inputClassName="text-black"
                    defaultValue={issue?.user?.name || ''}
                />

            <AdvanceSelect
                className="dark:text-black mt-4"
                title="Assigned To"
                name="assigendToId"
                disabled={false}
                options={usersOptionsAdvance}
                selected={issue?.assigendTo?.id || getValues("assigendToId")}
                placeholder="Please Select AssignedTo"
                onTypeing={handleSearch}
                icon={<></>}
                error={errors?.assigendToId?.message || ""}
                type="single"
            />

            <div className="col-md-12 col-lg-6">
                <CustomInputSimple
                    className='dark:text-black'
                    title="Client"
                    name="clientId"
                    type="text"
                    placeholder='Client name'
                    icon={<Building2Icon />}
                    disabled={true}
                    inputClassName="text-black"
                    defaultValue={issue?.client?.name || ''}
                />
            </div>

            {!isLoadingLocations ? (
                <div className="col-md-12 col-lg-6">
                    <CustomInputSimple
                        title="Location"
                        name="locationId"
                        type="text"
                        placeholder={selectedClientId ? 'Location' : 'Select Client First'}
                        icon={<MapPinIcon />}
                        disabled={true}
                        inputClassName="text-black"
                        defaultValue={selectedLocationName}
                    />
                </div>
            ) : (
                <div className="col-md-12 col-lg-6 flex items-center">
                    <span className="text-sm text-gray-500">Loading locations...</span>
                </div>
            )}

        

            <div className="col-md-12 col-lg-6">
                <CustomSelect
                    className='dark:text-black'
                    title="Status"
                    name="status"
                    options={statusOptions}
                    selected={issue?.status || undefined}
                    placeholder='Select Status...'
                    icon={<></>}
                    type='single'
                />
            </div>

                   {currentStatus === 'Closed' && (
                <div className="col-md-12 col-lg-6">
                    <CustomInputSimple
                        title="Closed Date"
                        name="closedDate"
                        type="datetime-local"
                        placeholder="When was it closed?"
                        icon={<CalendarIcon />}
                        inputClassName="text-black"
                        defaultValue={issue?.closedDate instanceof Date ? issue.closedDate.toISOString().slice(0, 16) : issue?.closedDate || ''}
                        disabled={false}
                    />
                </div>
            )}


 
    {!isLoadingIssueTypes && isFetchedIssueTypes ? (
                <div className="col-md-12 col-lg-6">
                    <AdvanceSelect
                        className='dark:text-black'
                        title="Issue Type"
                        name="issueTypeId"
                        options={issueTypesOptions}
                       selected={issue?.assigendTo?.id || getValues("assigendToId")}
                        placeholder='Select Issue Type...'
                        icon={<AlertCircleIcon />}
                        type='single'
                    />
                </div>
            ) : (
                <div className="col-md-12 col-lg-6 flex items-center">
                    <span className="text-sm text-gray-500">Loading issue types...</span>
                </div>
            )}

     <div className="col-md-12 col-lg-6">
                <CustomInputSimple
                    title="Happened At"
                    name="happenedAt"
                    type="text"
                    placeholder="When did it happen?"
                    inputClassName="text-black"
                    defaultValue={issue?.happenedAt || ''}
                    disabled={true}
                    
                    
                />
            </div>
            <div className="col-md-12 col-lg-6">
                <CustomInputSimple
                    title="Reported Address"
                    name="address"
                    type="text"
                    placeholder="Enter reported address"
                    icon={<MapPinIcon />}
                    inputClassName="text-black"
                    defaultValue={issue?.address || ''}
                    disabled={true}
                />
            </div>

  

          
      

            <div className="col-md-12 col-lg-6">
                <CustomInputSimple
                    title="Latitude"
                    name="geoLocation.lat"
                    type="number"
                    placeholder="Latitude"
                    inputClassName="text-black"
                    defaultValue={issue?.geoLocation?.lat || ''}
                    disabled={true}
                />
            </div>

            <div className="col-md-12 col-lg-6">
                <CustomInputSimple
                    title="Longitude"
                    name="geoLocation.lng"
                    type="number"
                    placeholder="Longitude"
                    inputClassName="text-black"
                    defaultValue={issue?.geoLocation?.lng || ''}
                    disabled={true}
                />
            </div>


            {(currentGeoLat && currentGeoLng) && (
                <div className="col-span-2 p-2 border-t">
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