import { FieldError, FieldErrorsImpl, Merge } from "react-hook-form";

export interface DatePickerPropsType {
    type: string,
    title: string,
    name: string,
    className: string,
    rows?: number|undefined,
    placeholder: string,
    disabled?:boolean,
    // icon ?: ReactElement<any, string | JSXElementConstructor<any>>|undefined
    error: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
}