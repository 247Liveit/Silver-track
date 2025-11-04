
import { useGetSingle } from "@/lib/api/queries/generic"
import { useSearchParams } from "react-router-dom";
import { useCallback, useState } from "react";
import { Issue, IssueLevels, IssueTypes, LeveloptionsArray, typeOptions } from "@/types/pagesData";
import { debounce } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import { PaginationApiType } from "@/types/table/PaginationTypes";
import IssuesTable from "./components/IssuesTable";
import AdvanceSelectSimple from "@/components/shared/form/inputs/AdvanceSelectSimple";
import CustomInputSimple from "@/components/shared/form/inputs/CustomInputSimple";

export default function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const page = Number(searchParams.get('page') || 1);
  const pageLimit = Number(searchParams.get('limit') || 25);
  const search = searchParams.get('search') || '';
  const [selectedFilters, setSelectedFilter] = useState<any>({ level: "All", type: "All", date: "All" });

  // const handleSearch = useCallback(
  //   debounce((searchTerm: string) => {
  //     const newSearchParams = new URLSearchParams(searchParams);
  //     if (searchTerm) {
  //       newSearchParams.set('search', searchTerm);
  //       newSearchParams.delete('page');
  //       newSearchParams.delete('limit');
  //     } else {
  //       newSearchParams.delete('search');
  //     }
  //     setSearchParams(newSearchParams);

  //   }, 300),
  //   [searchParams, setSearchParams]
  // );
  const { data, isLoading, refetch } = useGetSingle<PaginationApiType<Issue>>(`/issues`, {
    limit: pageLimit, page: page, search: search, level: selectedFilters.level, type: selectedFilters.type, date: selectedFilters.date
  });




  console.log("Selected Filters:", selectedFilters);
  return (
    <section className="*:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4 grid grid-cols-1 gap-4 px-4 *:data-[slot=card]:bg-gradient-to-t *:data-[slot=card]:from-primary/5 *:data-[slot=card]:to-card dark:*:data-[slot=card]:bg-card lg:px-6">
      {isLoading ? "Please wait..." :
        <div className="col-span-1  p-4 bg-white border rounded-lg shadow-sm">
          <h1 className="text-center font-bold">ISSUE MONITOR</h1>
          <div className="grid grid-cols-4 gap-4 mt-4">
            <AdvanceSelectSimple
              className='dark:text-black mt-4'
              title="Level"
              name="level"
              disabled={false}
              value={selectedFilters ? selectedFilters.level : ""}
              options={LeveloptionsArray} // Use the mapped options here
              selected={selectedFilters ? selectedFilters.level : ""}
              placeholder='Please Select'
              // onTypeing={handleSearch}
              icon={<></>}
              error={""}
              type='single'
              onChange={e => {
                // setSelectedLocationAndEmployeeId(e.target.value);
                // const location = clients ? clients.items.find(d => d.id == +e.target.value) : null;
                console.log("Selected Level:", e.target.value);
                setSelectedFilter((prev) => { return { ...prev, level: e.target.value } });
              }}
            />
            <AdvanceSelectSimple
              className='dark:text-black mt-4'
              title="Type"
              name="type"
              disabled={false}
              value={selectedFilters ? selectedFilters.type : ""}
              options={typeOptions} // Use the mapped options here
              selected={selectedFilters ? selectedFilters.type : ""}
              placeholder='Please Select'
              // onTypeing={handleSearch}
              icon={<></>}
              error={""}
              type='single'
              onChange={e => {
                // setSelectedLocationAndEmployeeId(e.target.value);
                // const location = clients ? clients.items.find(d => d.id == +e.target.value) : null;
                console.log("Selected Type:", e.target);

                setSelectedFilter((prev) => { return { ...prev, type: e.target.value } });
              }}
            />
            <div className={`mb-2`}>
              <label className={`mb-2 block text-sm font-bold `}>
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={selectedFilters.date}
                  className={`peer block w-full rounded-md border p-[0.4rem]
                                     pl-10 text-sm outline-2 placeholder:text-gray-500
                                    `}

                  onChange={e => {
                    // setSelectedLocationAndEmployeeId(e.target.value);
                    // const location = clients ? clients.items.find(d => d.id == +e.target.value) : null;
                    console.log("Selected Date:", e.target.value);

                    setSelectedFilter((prev) => { return { ...prev, date: e.target.value } });
                  }}
                />
              </div>
            </div>
          </div>
          <IssuesTable items={data} setItems={refetch} />
        </div>
      }
    </section>
  )
}
