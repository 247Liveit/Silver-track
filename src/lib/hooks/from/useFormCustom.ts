'use client'
import { useForm } from "react-hook-form";
import { defaultSchema, getCreateSchema, getUpdateSchema } from "@/lib/validation/zodSchema";
import { createContext, useContext, useMemo } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useFormCustomContextType, useFormCustomProp } from "@/types/forms/useFormCustomTypes";

// this hook is using react-hook-form and zod validation
//so managing form data ,status and errors will be easy and usable everywhere
export default function useFormCustom({ item, url, create, payment = false }: useFormCustomProp) {

    let schema: any = create ? getCreateSchema(url) : getUpdateSchema(url);

    if (!schema || ((url === '/paypal/orders' || url === '/paypal/auth-orders') && payment)) {
        schema = defaultSchema;
    }
    // console.log("item",item)
    type TypeDynamic = z.infer<typeof schema>;

    const {
        register, setError, control,
        setValue, handleSubmit,
        formState: { errors }, getValues, reset, watch
    } = useForm<TypeDynamic>({
        defaultValues: useMemo(() => {
            return item ? item : {};
        }, [item]),
        //@ts-expect-error(asd)
        resolver: zodResolver(create ? getCreateSchema(url) : getUpdateSchema(url)),
    });

    const useFormContext = createContext<useFormCustomContextType>({
        register, setError,
        setValue, handleSubmit, reset,
        formState: { errors }, getValues, control, watch
    })
    return useContext(useFormContext)

}