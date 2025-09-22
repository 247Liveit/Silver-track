import {
    Control,
    FieldErrors,
    UseFormGetValues,
    UseFormHandleSubmit,
    UseFormRegister, UseFormReset,
    UseFormSetError,
    UseFormSetValue,
    UseFormWatch
} from "react-hook-form";

export type useFormCustomProp = {
    item: any | undefined,
    url: string,
    create: boolean,
    payment?: boolean,
}

export type useFormCustomContextType = {
    register: UseFormRegister<any>,
    setError: UseFormSetError<any>,
    setValue: UseFormSetValue<any>,
    handleSubmit: UseFormHandleSubmit<any, undefined>,
    formState: { errors: FieldErrors<any>; },
    getValues: UseFormGetValues<any>,
    control: Control<any, any>,
    reset: UseFormReset<any>,
    watch: UseFormWatch<any>
}