import React, { useContext } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { FormContext } from "@/providers/formContext";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { CustomInputProps } from "@/types/forms/InputPropsType";

function cInput({ title, name, type, icon, placeholder, error, ...res }: CustomInputProps, ref: any) {
    const form = useContext(FormContext);
    const formatCardNumber = (value: string) => {
        return value
            .replace(/\D/g, "") // Remove non-digit characters
            .replace(/(\d{4})(?=\d)/g, "$1 "); // Add a space after every 4 digits
    };
    return (
        <FormField
            control={form?.control}
            name={name}
            render={({ field }) => (
                !res.hidden ?
                    <FormItem className={`mb-2 ${res.className}`}>
                        <FormLabel className="font-bold ">{title}
                            {(type == "date" && field.value) ? <span className="text-orange-500 ml-1">({new Date(field.value + "").toUTCString().substring(5, 11)})</span> : ""}
                        </FormLabel>

                        <FormControl>
                            {type == "textarea" ?
                                <Textarea placeholder={placeholder} {...field} {...res} value={field.value ?? (res.value ?? "")} />
                                :
                                <Input type={type} placeholder={placeholder} {...field} {...res} value={field.value ?? (res.value ?? "")}
                                    onChange={(e) => {
                                        const formattedValue =
                                            type === "cardNumber"
                                                ? formatCardNumber(e.target.value)
                                                : e.target.value;
                                        field.onChange(formattedValue);
                                    }} />
                            }
                        </FormControl>
                        <FormMessage className="h-auto min-h-2" />
                    </FormItem>
                    : <></>
            )}
        />

    );
}

const CustomInput = React.forwardRef(cInput);
export default CustomInput;
