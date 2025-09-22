import { TabsContent } from "@/components/ui/tabs";
import HistoryTable from "../history/HistoryTable";
import { useSearchParams } from "react-router-dom";
import { TableProp } from "@/types/CommonPageProp";
import { UserHistory } from "@/types/pagesData";
import CustomInput from "@/components/shared/form/inputs/CustomInput";
import { useCallback } from "react";
import CustomInputSimple from "@/components/shared/form/inputs/CustomInputSimple";

// Debounce utility function
function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return function(...args: any[]) {
        clearTimeout(timeout);
        //@ts-ignore
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}

export default function HistoriesTab({ id, data }: { id: string, data: TableProp<UserHistory> | undefined }) {
    const [searchParams, setSearchParams] = useSearchParams();

    // Debounced search handler
    const handleSearch = useCallback(
        debounce((searchTerm: string) => {
            const newSearchParams = new URLSearchParams(searchParams);
            if (searchTerm) {
                newSearchParams.set('search', searchTerm);
            } else {
                newSearchParams.delete('search');
            }
            setSearchParams(newSearchParams);
        }, 300),
        [searchParams, setSearchParams]
    );

    return (
        <TabsContent value={id} className="mt-4">
            <div className="border rounded-md p-4 overflow-auto">
                <CustomInputSimple
                    error={""}
                    title="Search"
                    name="search"
                    type="text"
                    placeholder="Search"
                    disabled={false}
                    onChange={(e) => handleSearch(e.target.value)}
                />
                <HistoryTable data={data} />
            </div>
        </TabsContent>
    );
}
