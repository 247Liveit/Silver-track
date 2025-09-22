import * as React from "react"
import { Check, ChevronsUpDown, Command } from "lucide-react"
import { useForm } from "react-hook-form"
import { FormField, FormItem } from "@/components/ui/form";
import { cn, createChangeEvent } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import { CustomSelectProps, SelectOption } from "@/types/forms/SelectPropsType";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

function aSelect({ title, name, type, icon, placeholder, error, selected, options, onChange, className, ...res }: CustomSelectProps, ref: any) {
    const form = React.useContext(FormContext);

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    //@ts-ignore
    const [valueLabel, setValueLabel] = React.useState("")

    const [items, setItems] = React.useState<SelectOption[]>(options || []);

    const generateValue = (item: SelectOption) => {
        return item.value + item.label
    }



    React.useEffect(() => {
        if (Array.isArray(options) && options.length > 0) {
            setItems([...options]);
        }
    }, [options]);

    const selectedValue = typeof form?.watch == "function" ? form?.watch(name) : selected

    React.useEffect(() => {

        // if (form.getValues && (form?.getValues(name) || form?.getValues(name) == "0")) {
        const selectedItem = items.filter(item => { return (item.value == String(selectedValue)) })
        if (selectedItem.length > 0) {
            setValue(generateValue(selectedItem[0]))
            setValueLabel(selectedItem[0].label)
        }
        // }
        // else {
        //     setValue("")
        //     setValueLabel("")
        // }
    }, [items, selectedValue]);
    const formMethods = useForm();
    console.log("from",form)
    return (
        <FormField
            control={form?.control ?? formMethods.control}
            name={name}
            render={({ field }) => (
                <FormItem className={`mb-2 ${className}`}>
                    <div className="mb-4">
                        <label htmlFor={name} className="mb-2 block text-md  font-bold">
                            {title}
                        </label>
                        <div className="relative">
                            <Popover open={open} onOpenChange={setOpen}  >
                                <PopoverTrigger asChild >
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        aria-expanded={open}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            (!field.value && field.value != "0") && "text-muted-foreground"
                                        )}>
                                        <span className="truncate w-full text-left text-black font-md">
                                            {value
                                                ? items.find((item) => generateValue(item) === value)?.label
                                                : placeholder}
                                        </span>
                                        <ChevronsUpDown className="opacity-50 flex-shrink-0" />
                                    </Button>
                                </PopoverTrigger>

                                {!res.disabled &&
                                    <PopoverContent className="w-full p-0">
                                        <Command >
                                            <CommandInput placeholder={placeholder} className="h-9" />
                                            <CommandList >
                                                <CommandEmpty>No item found.</CommandEmpty>
                                                <CommandGroup>
                                                    {items.map((option) => (
                                                        <CommandItem
                                                            key={option.value}
                                                            className={value === generateValue(option) ? "opacity-100 font-bold" : "opacity-90"}
                                                            value={generateValue(option)}
                                                            onSelect={(currentValue) => {

                                                                const newValue = currentValue === value ? "" : currentValue
                                                                setValue(newValue)
                                                                if (newValue != "") {
                                                                    setValueLabel(option.label)
                                                                }
                                                                else {
                                                                    setValueLabel("")
                                                                }
                                                                setOpen(false)
                                                                if (onChange)
                                                                    onChange(createChangeEvent(name, (newValue != "" ? String(option.value) : "")))
                                                                field.onChange(createChangeEvent(name, (newValue != "" ? String(option.value) : "")))


                                                            }}
                                                        >
                                                            {option.label}
                                                            <Check
                                                                className={cn(
                                                                    "ml-auto",
                                                                    value === generateValue(option) ? "opacity-100" : "opacity-0"
                                                                )}
                                                            />
                                                        </CommandItem>
                                                    ))}
                                                </CommandGroup>
                                            </CommandList>
                                        </Command>
                                    </PopoverContent>}
                                {error && (
                                    <p className="text-xs italic text-red-500 mt-2">
                                        {error as string}
                                    </p>
                                )}
                            </Popover>
                        </div>
                    </div>
                </FormItem>
            )}
        />

    )
}

const AdvanceSelect = React.forwardRef(aSelect);
export default AdvanceSelect;