
import React, { useEffect, useMemo, useRef, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { ErrorBoundary } from "react-error-boundary";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { AlertCircle } from "lucide-react";
import { Action } from "@/rbac/aceess-rules";
import { useToast } from "@/components/ui/use-toast";
import useAxiosAuth from "@/lib/api/axios/hooks/useAxiosAuth";
import { dateFromat, formatErrorToList } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Card } from "@/components/ui/card";
import { Backend_URL } from "@/lib/constants/Constants";
import useAccessControl from "@/rbac/use-access-control";
import { useRouter } from "@/routes/hooks";
import SaveCloseButton from "./inputs/SaveCloseButton";

// export const FormContext = createContext<FormContextType>({} as FormContextType)

type CustomFormLayoutProps = {
    item: any | undefined,
    url: string,
    redirectUrl: string,
    edit?: boolean,
    showCancelBtn?: boolean,
    showNewBtn?: boolean,
    onSave?: (arg: any, arg2: any) => any,
    onReset?: any,
    children?: React.ReactNode
    resetForm?: boolean
    validationSchema?: any,
    requestHeaders?: Record<string, any>,
    dataFromatter?: { [key: string]: (data: unknown) => unknown },
}

function createDynamicSchema(obj: Record<string, any>): z.ZodObject<any> {
    const schemaObject: Record<string, any> = {};
    for (const key in obj) {
        if (obj.hasOwnProperty(key)) { schemaObject[key] = z.any; }
    } return z.object(schemaObject);
}

export default function CustomFormLayout({
    item,
    url,
    redirectUrl,
    edit = true,
    showCancelBtn = false,
    showNewBtn = true,
    onSave,
    onReset,
    children,
    resetForm = false,
    validationSchema,
    requestHeaders,
    dataFromatter,


}: CustomFormLayoutProps) {

    const { isAllowed, getResourceByUrl } = useAccessControl();
    const action = item.id ? (edit ? Action.Update : Action.Read) : Action.Create
    const [isAllowedToShow, setIsAllowedToShow] = useState(true);

    useEffect(() => {
        if (isAllowed(action, getResourceByUrl(url))) {
            setIsAllowedToShow(true)
        }
        else {
            setIsAllowedToShow(false)
        }
        console.log("Custom Form layout Index rendered!");
    }, [])


    const { toast } = useToast()
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [itemState, setItemState] = useState(item);
    const [isCreate, setisCreate] = useState((item?.id) ? false : true);
    const [api_url, headers] = useAxiosHeadersUrl(url, requestHeaders);
    const submitRef = useRef<HTMLFormElement | null>(null);
    const axios = useAxiosAuth()


    let schema: any = null;
    if (validationSchema)
        schema = validationSchema;
    else {
        schema = createDynamicSchema(item)
    }


    type TypeDynamic = z.infer<typeof schema>;
    const form = useForm<TypeDynamic>({
        defaultValues: useMemo(() => {
            return item ? item : {};
        }, [item]),

        resolver: zodResolver(schema),
    });
    const { errors } = form.formState;

    const reset = () => {
        form.reset();
        setItemState({})
        setisCreate(true)

        Object.keys(form.getValues()).forEach((key) => {
            form.setValue(key, '');
        });
        if (onReset)
            onReset()
    }

    //@ts-ignore
    const showSuccess = (msg: string) => {
        if (url === "/auth/login-verify")
            router.replace(redirectUrl)

        else if (redirectUrl && redirectUrl != "#") {
            router.push(redirectUrl)
        }
        setLoading(false);

    }

    const showError = (msg: string) => {
        form.setError("root", { message: msg })
        setLoading(false);
    }
    useEffect(() => {
        setItemState(item)
        if (item && Object.values(item).length > 0) {
            Object.keys(form.getValues()).forEach((key) => {
                form.setValue(key, item[key]);
            });
        }
        if (item?.id) {
            setisCreate(false)

        } else {
            setisCreate(true)
        }
    }, [item,])



    const onSubmit = form.handleSubmit((data: any, e: any) => {

        e?.preventDefault()
        setLoading(true);


        if (data.icon === null) {
            delete data.icon;
        }
        const newData = dataFromatter ? formatDataV2(data,dataFromatter) : data
        if (isCreate /* && !payment */) {
            const tost = toast({
                title: "Please wait ...",
                itemID: "formSubmitWaiting",
            })
            axios.post(api_url as string, newData, headers as AxiosRequestConfig).then(res => {
                showSuccess('Success!')
                if (String(res.headers["content-type"]).includes("spreadsheetml.sheet")) {
                    const contentDisposition = res.headers['content-disposition'];

                    // Extract file name from Content-Disposition header
                    let fileName = 'yard_log_report.xlsx';
                    if (contentDisposition && contentDisposition.indexOf('attachment') !== -1) {
                        const fileNameMatch = contentDisposition.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
                        if (fileNameMatch != null && fileNameMatch[1]) {
                            fileName = fileNameMatch[1].replace(/['"]/g, '');
                        }
                    }


                    const url = window.URL.createObjectURL(new Blob([res.data], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' }));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', fileName); // Specify the file name
                    document.body.appendChild(link);
                    link.click();
                    link.remove()
                }


                if (res.data.error) {
                    toast({
                        title: res.data.error,
                        description: dateFromat(new Date()),
                        variant: "destructive"
                    })
                } else {
                    toast({
                        itemID: "SUCCSESS",
                        title: res.data.message ?? "Proceed",
                        description: dateFromat(new Date()),
                        variant: "success"
                    })
                }
                if (resetForm)
                    reset();
                if (onSave) {
                    if(url.includes("print-multiple"))
                        onSave(res.data, "add")
                        else
                    onSave(res.data.data, "add")

                }
                setLoading(false);
            }).catch(e => {
                if (e.response?.data)
                    showError(formatErrorToList(e.response.data.message))
                else
                    showError(formatErrorToList(e.message))

                toast({
                    title: e.response?.data?.error ?? (e.status == 404 ? "Not Found" : "Something Went wrong!"),
                    description: dateFromat(new Date()),
                    variant: "destructive"
                })
                setLoading(false);

            }).finally(() => {
                tost.dismiss()
            })

        }
        else if (edit) {

            const tost = toast({
                title: "Please wait ...",
                itemID: "formSubmitWaiting",
            })
            console.log()
            const urlWithMethodOverride = `${api_url}/${itemState.id}`;
            axios.patch(urlWithMethodOverride as string, newData, headers as AxiosRequestConfig).then(res => {
                showSuccess('Success!')
                if (onSave) {
                    onSave(res.data.data, "edit")

                }
                if (res.data?.error) {
                    toast({
                        title: e.response.data.error,
                        description: dateFromat(new Date()),
                        variant: "destructive"
                    })
                } else {

                    toast({
                        itemID: "SUCCSESS",
                        title: res.data?.message ?? "Proceed",
                        description: dateFromat(new Date()),
                        variant: "success"
                    })
                }
                if (resetForm) {
                    reset();
                }



            }).catch(e => {
                if (e.response?.data)
                    showError(formatErrorToList(e.response.data.message))
                toast({
                    title: e?.response?.data.error ?? (e.status == 404 ? "Not Found" : "Something Went wrong!"),
                    description: dateFromat(new Date()),
                    variant: "destructive"
                })
                setLoading(false)
            }).finally(() => {
                tost.dismiss()
            })
        }

    });
    const submit = () => {
        if (submitRef) {
            submitRef.current?.requestSubmit()
        }
    }

    return (
        <ErrorBoundary
            fallback={<div>Something went wrong. Please try again.</div>}
            onError={(error) => {
                console.error('Form Error:', error);
                // toast.error('An unexpected error occurred');
            }}
        >
            <FormContext.Provider value={{ errors, create: isCreate, edit: edit, itemState, submit, ...{ ...form, reset: reset } }}>
                <form onSubmit={onSubmit} ref={submitRef} >
                    {isAllowedToShow ? <div className={`rounded-md  flex flex-col ${url=="/login"?"h-[90vh]":"" }`}>
                        <div className="rounded-md bg-white dark:bg-stone-950 flex-1 overflow-auto p-4 ">
                            <Card className="p-4">
                                {children}
                                {errors.root && (<Alert variant="destructive" className="mt-2">
                                    <AlertCircle className="h-4 w-4" />
                                    <AlertTitle>Error</AlertTitle>
                                    <AlertDescription>

                                        <p className={` ${/* payment */ false && "text-center"}`}
                                            dangerouslySetInnerHTML={{ __html: errors.root.message as string }}>
                                        </p>


                                    </AlertDescription>
                                </Alert>
                                )}
                                  <div className="p-4 bg-white dark:bg-stone-950 border-t sticky bottom-0 z-10">

                                <SaveCloseButton showNewBtn={showNewBtn} loading={loading} showCancelBtn={showCancelBtn} edit={edit}
                                // backRoute={redirectUrl} 
                                />
                                </div>
                            </Card>


                        </div>

                    </div> :
                        <div className="text-center font-bold w-full text-stone-600">Not Allowed</div>
                    }



                </form>


            </FormContext.Provider>
        </ErrorBoundary>
    );
}

function useAxiosHeadersUrl(url: string, requestHeaders: Record<string, any> | undefined): [String, Record<string, Record<string, string>>] {
    let customHeaders: any = {
        "authorization": `Bearer`,
        "Accept": "application/json"

    };
    if (requestHeaders) {
        customHeaders = { ...customHeaders, ...requestHeaders }
    }

    const headers = { headers: customHeaders };
    const api_url = Backend_URL + url;
    return [api_url, headers];
}



//@ts-ignore
function formatDataV2(data: Record<string, any>, dataFromatter: { [key: string]: (data: any) => any }) {

    const formData = new FormData();
    for (const key in data) {

        if (dataFromatter[key] !== undefined) {
            const newValue = dataFromatter[key](data[key]);
            console.log("formatter",data[key])
            console.log("formatter New val",data[key])
            if (newValue != null && newValue != undefined)
                if(!Array.isArray(newValue))
                formData.append(key, newValue);
            else{
                newValue.map(val=>{
                    formData.append(key+"[]",val)
                })
            }

        }

        else {
            // if (Array.isArray(data[key])) {
            //     for (const subKey in data[key]) {
            //         if (data[key][subKey] !== false)
            //             formData.append(key + "[]", typeof data[key][subKey] == "object" ? JSON.stringify(data[key][subKey]) : data[key][subKey])
            //     }
            // } else {
            //     formData.append(key, data[key]);
            // }
            formData.append(key, data[key]);
        }
    }
    return formData
}
