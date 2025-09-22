import { TabsContent } from "@/components/ui/tabs"
import ScheduleTableDateRange from "@/components/shared/date-range";
import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple";
import TableHeader from "@/components/TableHeader";
import { Card } from "@/components/ui/card";
import { SkeletonBig } from "@/components/ui/skeleton";
import { useGet } from "@/lib/api/queries/generic";
import {  Location, LocationShift } from "@/types/pagesData";
import { addDays } from "date-fns";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useGetLocationEmployeeSchedule } from "@/lib/api/queries/location-shifts";

export default function LocationScheduleTab({ location: selectedLocation, id }: { location: Location | null | undefined, id: string }) {
    const queryParams = new URLSearchParams(location.search);
    const filterStartDate = queryParams.get('InfoFilterStartDate') ?? new Date().toISOString().split('T')[0];
    const filterEndDate = queryParams.get('InfoFilterEndDate') ?? addDays(new Date(), 7).toISOString().split('T')[0];
    const shiftId = queryParams.get('shiftId') ?? 0;
    const navigate = useNavigate();

    const { data: items, isLoading, refetch } = useGetLocationEmployeeSchedule(
        `/employee-shifts/for-location/${selectedLocation?.id}`,selectedLocation?.id+"", {
        startDate: filterStartDate,
        endDate: filterEndDate,
        shiftId: shiftId,
    })

    console.log("items", items)
    const { data: shifts, isLoading: isLoadingShifts } = useGet<LocationShift[]>(
        `/location-shifts/location/${selectedLocation?.id}`)


    useEffect(() => {
        refetch()
        console.log("refetching", filterStartDate, filterEndDate, shiftId)
    }, [filterEndDate, filterStartDate, shiftId])

    if (isLoading || isLoadingShifts)
        return <SkeletonBig />

    return (
        <TabsContent value={id} className="mt-4">
            <div className="border rounded-md p-4 overflow-auto">
                <Card className="p-4 rounded-lg mt-2">
                    <div className="grid gap-4 grid-cols-1 lg:grid-cols-3 mt-4">
                        <ScheduleTableDateRange className="w-full" startDateParamName="InfoFilterStartDate" endDateParamName="InfoFilterEndDate" />
                        <AdvanceSelectSimple className='dark:text-black' title="Shift" name="locaiton"
                            otherOption="all"
                            value={shiftId ?? ""}
                            options={shifts ? shifts.map((item: any) => { return { label: item.shiftName, value: item.id } }) : []}
                            selected={(shiftId as string) ?? "1"}
                            placeholder='All'
                            icon={<></>} error={""} type='single'
                            onChange={e => {
                                if (e.target.value === null) {
                                    queryParams.delete('shiftId');
                                } else {
                                    queryParams.set('shiftId', e.target.value);
                                }
                                navigate({ search: queryParams.toString() });
                            }}
                        />
                    </div>
                    <div className="rounded-sm border border-stroke bg-white  pb-2.5 shadow-default  sm:px-7.5 xl:pb-1">
                        <div className="lg:max-h-[32rem] overflow-x-auto">
                            <table className="w-full table-auto">
                                <TableHeader headers={["Date", 'Shift', 'Start Time', "End Time"]} withActions={false} />
                                <tbody>

                                    {/* @ts-ignore */}
                                    {items?.items?.map((item: any) => {
                                        return (<tr key={item.id}>
                                            <td className="border-b border-[#eee] py-2 px-2   text-center">
                                                <h5 className=" text-black">
                                                    {item.date}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-2 px-2   text-center">
                                                <h5 className=" text-black">
                                                    {item.locationShift?.shiftName}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-2 px-2   text-center">
                                                <h5 className=" text-black">
                                                    {item.startTime}
                                                </h5>
                                            </td>
                                            <td className="border-b border-[#eee] py-2 px-2   text-center">
                                                <h5 className=" text-black">
                                                    {item.endTime}
                                                </h5>
                                            </td>
                                        </tr>)
                                    })
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>
                </Card>
            </div>
        </TabsContent>
    )
}