export type Role={
    id:number;
    name:string
}
export type Permission={
    id:number;
    name:string
    display_name:string
    parent_id:number
}
export type PermissionWithParent={
    id:number;
    name:string;
    display_name:string;
    parent_id:number;
    children:Permission[]
}