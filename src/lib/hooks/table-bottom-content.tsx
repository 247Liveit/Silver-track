import React from "react";
import {TableBottomProps} from "@/types/table/table-types";

export default function useTableBottomContentRowHook({items,
    //  page, setPage, selectedKeys, totalPages
    // ,sortDescriptor
}:TableBottomProps) {

    // const pages = totalPages;

    const sortedItems = React.useMemo(() => {
        if (items) {
            // return [...items].sort((a: (User&ClassItem&Lesson), b: (User&ClassItem&Lesson)) => {
                // const first = a[sortDescriptor.column as keyof (User&ClassItem&Lesson)] as number;
                // const second = b[sortDescriptor.column as keyof (User&ClassItem&Lesson)] as number;
                // const cmp = first < second ? -1 : first > second ? 1 : 0;

                // return sortDescriptor.direction === "descending" ? -cmp : cmp;
            // });
            return items;
        }
        return []
    }, [ items]);

    const bottomContent = React.useMemo(() => {
        return (
            <div className="py-2 px-2 flex justify-between mx-auto items-center">
                {/* <Pagination
                    showControls
                    classNames={{
                        cursor: "bg-foreground text-background",
                    }}
                    color="default"
                    isDisabled={false}
                    page={page}
                    total={pages}
                    variant="bordered"
                    onChange={setPage}
                /> */}
            </div>
        );
    }, []);

    return {bottomContent,sortedItems}
}