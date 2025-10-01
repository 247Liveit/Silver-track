import { FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { createChangeEvent } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import { CustomRadioButtonProps } from "@/types/forms/InputPropsType";
import React, { useContext } from "react";


function cInlineRadioButton({ title, name, items, error, onChange, vertical = false, ...res }: CustomRadioButtonProps, ref: React.Ref<HTMLInputElement>) {

    const form = useContext(FormContext)
    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => {
                return <FormItem className="mb-2">
                    <FormLabel>{title}</FormLabel>
                    <FormControl>
                        <RadioGroup
                            onValueChange={(e) => {
                                if (onChange)
                                    onChange(createChangeEvent(name, e))

                                field.onChange(e)

                            }}
                            defaultValue={field.value}
                            className="flex flex-col space-y-1"
                        >

                            {items.map((item) => (
                                <FormItem key={item.title} className="flex items-center space-x-3 space-y-0">
                                    <FormControl>
                                        <RadioGroupItem value={item.value + ""} checked={item.value == field.value} />
                                    </FormControl>
                                    <FormLabel className="font-normal flex gap-2 ml-1 pt-1">

                                        {item.title}
                                        {item.icon && React.cloneElement(item.icon, {
                                            //@ts-ignore
                                            className: "h-4 w-4"
                                        })}
                                    </FormLabel>
                                </FormItem>
                            ))}

                        </RadioGroup>
                    </FormControl>
                    <FormMessage className="h-auto min-h-2" />
                </FormItem>
            }}
        />
    )
}
const InlineRadioButton = React.forwardRef(cInlineRadioButton);
export default InlineRadioButton;
