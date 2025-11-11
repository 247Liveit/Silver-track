
// import AdvanceSelect from '@/components/shared/form/inputs/AdvanceSelect';
// import AdvanceSelectSimple from '@/components/shared/form/inputs/AdvanceSelectSimple';
// import CustomInput from '@/components/shared/form/inputs/CustomInput';
// import CustomSelect from '@/components/shared/form/inputs/CustomSelect';
// import InlineCheckBox from '@/components/shared/form/inputs/InlineCheckBox';
// import { useToast } from '@/components/ui/use-toast';
// import { useGetSingle } from '@/lib/api/queries/generic';
// import { useGetLocations } from '@/lib/api/queries/locations';
// import { debounce, getUTCDate } from '@/lib/utils';
// import { FormContext } from '@/providers/formContext';
// import { IssueType, LeveloptionsArray, Location, typeOptions } from '@/types/pagesData';
// import { PaginationApiType } from '@/types/table/PaginationTypes';
// import { useCallback, useContext, useState } from 'react';

// const DailyReportForm = ({ showDate, type }: { showDate: boolean, type: string }) => {

//     const [selectedLocation, setSelectedLocation] = useState<Location | null | undefined>(null);

//     const { register, errors, edit, getValues, setValue } = useContext(FormContext);
//     const [dropSearch, setDropSearch] = useState<string>("");
//     const [dropIssueSearch, setDropIssueSearch] = useState<string>("");
//     const [isLoadingPost, setLoadingPost] = useState<boolean>(false);
//     const { toast } = useToast();
//     // const axios = useAxiosAuth();
//     const { data: locations, isFetched, refetch } = useGetSingle<PaginationApiType<Location>>('/locations/paginate', {
//         limit: 1000,
//         page: 1,
//         search: dropSearch,
//         sortBy: "id",
//         sortOrder: "DESC",
//         fields: "id,name",
//     }, [])
//     const { data: issues, refetch: refetchIssueType } = useGetSingle<PaginationApiType<IssueType>>('/issue-types/paginate', {
//         limit: 1000,
//         page: 1,
//         search: dropIssueSearch,
//         sortBy: "id",
//         sortOrder: "DESC",
//         fields: "id,name",
//     }, [])

//     const handleSearch = useCallback(
//         debounce((searchTerm: string) => {
//             setDropSearch(searchTerm);
//             refetch()
//         }, 300),
//         []
//     );
//     const handleIssueTypeSearch = useCallback(
//         debounce((searchTerm: string) => {
//             setDropIssueSearch(searchTerm);
//             refetchIssueType()
//         }, 300),
//         []
//     );
//     return (
//         <>

//             {/* Phone Numbers Grid */}
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

//                 {showDate &&
//                     <div className='grid grid-cols-1 lg:grid-cols-2'>
//                         <CustomInput
//                             error={errors.startDate?.message}
//                             {...register('startDate')}
//                             title="Start"
//                             defaultValue={getUTCDate(new Date())}
//                             name="startDate"
//                             type="date"
//                             className='px-1'
//                             disabled={!edit}
//                         />
//                         <CustomInput
//                             error={errors.endDate?.message}
//                             {...register('endDate')}
//                             title="End"
//                             name="endDate"
//                             defaultValue={getUTCDate(new Date())}
//                             type="date"
//                             className='px-1'
//                             disabled={!edit}
//                         />
//                     </div>
//                 }
//                 <div></div>
//                 <AdvanceSelectSimple className='dark:text-black mt-4' title="Location" name="locaiton"
//                     disabled={false} value={selectedLocation ? selectedLocation.id : ""}
//                     options={locations ? locations.items.map(item => { return { label: item.name, value: item.id } }) : []}
//                     selected={selectedLocation?.id + ""}
//                     placeholder='Please Select'
//                     onTypeing={handleSearch}
//                     icon={<></>} error={""} type='single'
//                     onChange={e => {
//                         const location = locations ? locations.items.find(d => d.id == +e.target.value) : null;
//                         setSelectedLocation(() => { return location });
//                     }}
//                 />
//                 <AdvanceSelect className='dark:text-black mt-4' title="Issue Type" name="issueTypeId"
//                     disabled={false}
//                     selected={undefined}
//                     options={issues ? issues.items.map(item => { return { label: item.name, value: item.id } }) : []}
//                     placeholder='Please Select'
//                     onTypeing={handleIssueTypeSearch}
//                     icon={<></>} error={""} type='single'
//                 />
//                 <div className='col-span-2 grid grid-cols-3 '>

//                     <InlineCheckBox
//                         placeholder=''
//                         name={`level`}
//                         error={""}
//                         className='p-2'
//                         title={""}
//                         items={LeveloptionsArray}
//                         disabled={!edit}
//                     />
//                     <InlineCheckBox
//                         placeholder=''
//                         name={`type`}
//                         error={""}
//                         className='p-2'
//                         title={""}
//                         items={typeOptions}
//                         disabled={!edit}
//                     />


//                 </div>
//             </div>
//         </>
//     );
// };

// export default DailyReportForm;



