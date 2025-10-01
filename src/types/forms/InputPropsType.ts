import React, {JSXElementConstructor, ReactElement} from "react";
import {FieldError, FieldErrorsImpl, Merge} from "react-hook-form";

export interface CustomInputProps extends React.InputHTMLAttributes<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>{
    title: string,
    name: string,
    type?: string,
    rows?: number|undefined,
    placeholder: string,
    inputClassName?: string|undefined,
    icon ?: ReactElement<any, string | JSXElementConstructor<any>>|undefined
    error?: string | FieldError | Merge<FieldError, FieldErrorsImpl<any>> | undefined,
}
export interface CustomRadioButtonProps extends CustomInputProps{
    vertical:boolean,
    items: {
        title: string
        checked?: boolean
        value: boolean | string
        placeholder: string,
        icon: ReactElement

    }[],
}
export interface CustomCheckBoxProps<T> extends CustomInputProps{
    items: T[],
    placeholder: string,
}