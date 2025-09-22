// import {Selection, SortDescriptor} from "@nextui-org/react";

export interface TableBottomProps {
    items: any[],
    page: number,
    setPage: (page: number) => void,
    selectedKeys: Selection,
    totalPages: number,
    // sortDescriptor: SortDescriptor
}

export interface TableSearchProps {
    totalItems: number
    url: string
    nextUrl: string
    showAddBtn: boolean|undefined
}

export interface ColumnType {
    name: string,
    uid: string,
    sortable: boolean
}
