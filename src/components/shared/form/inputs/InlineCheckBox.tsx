import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from "@/components/ui/form";
import { createChangeEvent } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import { CustomCheckBoxProps } from "@/types/forms/InputPropsType";
import { Checkbox } from "@radix-ui/react-checkbox";
import { useContext } from "react";


export function InlineCheckBox({ title, placeholder, name, items, className, disabled, onChange }: CustomCheckBoxProps<any>) {
    const form = useContext(FormContext)
    return (

        <FormField
            control={form.control}
            name={name}


            render={() => (
                <FormItem className={"mb-3 " + className}>
                    <div className="mb-3">
                        <FormLabel className="text-base">{title}</FormLabel>
                        <FormDescription>
                            {placeholder}
                        </FormDescription>
                    </div>
                    {items.map((item:any) => (
                        <FormField
                            key={item.value}
                            control={form.control}
                            name={name}

                            render={({ field }) => {
                                return (
                                    <FormItem
                                        key={item.value}
                                        className="flex flex-row items-start space-x-3 space-y-0">
                                        <FormControl>
                                            <Checkbox
                                                disabled={disabled}
                                                className="mt-1"
                                                checked={((Array.isArray(field.value) ? field.value?.includes(item.value) : String(field.value) == (item.value)))}
                                                onCheckedChange={(checked) => {

                                                    let newValue = [item.value]
                                                    if (Array.isArray(field.value) && field.value) {
                                                        newValue = [...field.value, ...newValue]
                                                    }
                                                    if (onChange)
                                                        onChange(createChangeEvent(name, (item.value != "" ? String(item.value) : "")))

                                                    return checked
                                                        ? field.onChange(items.length == 1 ? item.value : newValue)
                                                        : field.onChange(
                                                            Array.isArray(field.value) ?
                                                                field.value?.filter(
                                                                    (value: string) => value !== item.value
                                                                ) : ""
                                                        )
                                                }}
                                            />
                                        </FormControl>
                                        <FormLabel className="text-md font-normal ml-1">
                                            {item.label}
                                        </FormLabel>

                                    </FormItem>
                                )
                            }}
                        />
                    ))}
                    <FormMessage className="h-auto min-h-2" />
                </FormItem>
            )}
        />


    );
}
