
import { PermissionWithParent, Role } from "./roles";

export type PageParamProps = {
    params: {
        id: string;
    };
};

export type Props = {
    params: { id: string }
    searchParams: { [key: string]: string | string[] | undefined }
}

export interface TableProp<T> {
    items: ItemType<T>;
    offset: number;
    pageLimit: number;
    setItems: React.Dispatch<React.SetStateAction<ItemType<T>>>
}

export interface TablePagnateProp<T> {
    items: Pagination<T>;
    offset?: number;
    pageLimit?: number;
    setItems?: (item: T, type: 'edit' | 'delete') => void
}
export interface RoleTableProps extends TablePagnateProp<Role> {
    permissions: PermissionWithParent[]
}
export type ItemType<T> = {
    data: T[],
    errors: string | string[];
    isLoading: boolean;

}



export type ItemPaginateType<T> = {
    data: {
        data: T[];
        current_page: number;
        from: number;
        last_page: number;
        per_page: number;
        to: number;
        total: number;
        first_page_url: string;
        last_page_url: string;
        next_page_url: string;
    },
    errors: string | string[];
    isLoading: boolean;

}
export type PaginationLink = {
    url?: string | null,
    label: string,
    active: boolean
}
export type Pagination<T> = {
    current_page: number,
    data: T[],
    first_page_url: string,
    from: number,
    last_page: number,
    last_page_url: string,
    links: PaginationLink[],
    next_page_url: string,
    path: string,
    per_page: number,
    prev_page_url?: null | string,
    to: number,
    total: number
}