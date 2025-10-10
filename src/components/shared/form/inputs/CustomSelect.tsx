import React, { useCallback, useContext } from "react";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CustomSelectProps, SelectOption } from "@/types/forms/SelectPropsType";
import { FormContext } from "@/providers/formContext";
import { createChangeEvent } from "@/lib/utils";

function CSelect({ title, name, placeholder, className, selected, options, itemsLoadingCallBack, onChange, ...res }: CustomSelectProps, ref: any) {
    const form = useContext(FormContext);

    const [value, setValue] = React.useState("");
    const [items, setItems] = React.useState<SelectOption[]>(options || []);

    const generateValue = (item: SelectOption) => {
        return item.value + item.label;
    };

    React.useEffect(() => {
        if (Array.isArray(options) && options.length > 0) {
            setItems([...options]);
        }
    }, [options]);

    const selectedValue = typeof form?.watch === "function" ? form?.watch(name) : selected;
    console.log("Selected val",selectedValue);
    React.useEffect(() => {
        // if (form?.getValues(name) || form?.getValues(name) === "0") {
        const selectedItem = items.filter((item) => item.value === String(selectedValue));
        if (selectedItem.length > 0) {
            setValue(generateValue(selectedItem[0]));
        }
        // } else {
        //     setValue("");
        //     setValueLabel("");
        // }
    }, [items, selectedValue]);


    return (
        <FormField
            control={form?.control}
            name={name}
            render={({ field }) => (
                <FormItem className={`mb-2 ${className}`}>
                    <FormLabel>{title}</FormLabel>
                    <Select
                        onValueChange={(currentValue) => {
                            const newValue = currentValue === value ? "" : currentValue;
                            setValue(newValue);
                            if (onChange) onChange(createChangeEvent(name, newValue));
                            field.onChange(newValue); // Pass the raw value to `field.onChange`
                        }}
                        defaultValue={field.value+""}
                    >
                        
                        <FormControl>
                            <SelectTrigger className="">
                                <SelectValue placeholder={(!res.otherOption ?(placeholder || "Select"):"")} />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                            {res.otherOption &&

                                <SelectItem value={"0"}>
                                    Please Select
                                </SelectItem>
                            }
                            {items.map((option: SelectOption) => (
                                <SelectItem  key={option.value} value={option.value + ""}>
                                    {option.label} 
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage className="mt-1 h-auto min-h-2" />
                </FormItem>
            )}
        />
    );
}

const CustomSelect = React.forwardRef(CSelect);
export default CustomSelect;
