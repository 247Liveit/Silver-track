import { CustomInputProps } from "./InputPropsType";


export interface CustomSelectProps extends CustomInputProps {
    options: SelectOption[],
    selected: string | undefined,
    defaultItems?: any[];
    onTypeing?: any;
    otherOption?: any;
    itemsLoadingCallBack?: (key: string) => Promise<SelectOption[]>

}

export interface SelectOption {
    value: string | number,
    label: any
    labelToView?: any
}
export interface LocalCustomSelectProps extends CustomInputProps {
    selected: string | undefined,
    defaultItems?: any[];
}
export interface SelectItemType {
    id: number,
    title?: string,
    label?: string,
    name?: string,
    value?: string,
}