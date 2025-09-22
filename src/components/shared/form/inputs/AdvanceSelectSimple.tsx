import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn, createChangeEvent } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { CustomSelectProps, SelectOption } from "@/types/forms/SelectPropsType"


function AdvanceSelect({ title, name, icon, placeholder, error, selected, options, onTypeing, otherOption, onChange, ...res }: CustomSelectProps, ref: any) {

    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")
    const [items, setItems] = React.useState<SelectOption[]>(options || []);
    const generateValue = (item: SelectOption) => {
        return item.value + item.label
    }

    React.useEffect(() => {
        if (options) {
            setItems(options);
        }
    }, [options]);


    React.useEffect(() => {
        if (selected) {
            const selectedItem = options.find(item => {  return (String(item.value) == String(selected)) })
            
            if (selectedItem) {
                setValue(generateValue(selectedItem))
            }
        }
        else {
            setValue("")
        }
    }, [options, selected]);

    return (
        <div className="mb-4">
            <label htmlFor={name} className="mb-1 block text-md font-bold">
                {title}
            </label>
            <div className="relative">
                <Popover open={open} onOpenChange={setOpen}  >
                    <PopoverTrigger asChild >
                        <Button
                            variant="outline"
                            role="combobox"
                            aria-expanded={open}
                            className="w-full justify-between truncate overflow-hidden text-ellipsis"
                        >
                            <span className="truncate w-full text-left">
                                {value
                                    ? items.find((item) => generateValue(item) === value)?.label
                                    : placeholder}
                            </span>
                            <ChevronsUpDown className="opacity-50 flex-shrink-0" />
                        </Button>
                    </PopoverTrigger>
                    {!res.disabled && <PopoverContent className="w-full p-0">
                        <Command >
                            <CommandInput placeholder={placeholder} className="h-9" onValueChange={onTypeing} />
                            <CommandList >
                                <CommandEmpty>No item found.</CommandEmpty>
                                <CommandGroup>
                                    {otherOption &&
                                        <CommandItem
                                            key={otherOption}
                                            value={generateValue({value: "0", label: otherOption})}
                                            onSelect={(currentValue) => {
                                                setValue(currentValue === value ? "" : currentValue)
                                                setOpen(false)
                                                onChange ? onChange(createChangeEvent(name, String("0"))) : "";
                                            }}
                                        >
                                            {otherOption}
                                            <Check
                                                className={cn(
                                                    "ml-auto",
                                                    value === generateValue({value: "0", label: otherOption}) ? "opacity-100" : "opacity-0"
                                                )}
                                            />
                                        </CommandItem>
                                    }
                                    {items.map((option) => (
                                        <CommandItem
                                            key={option.value}
                                            value={generateValue(option)}
                                            onSelect={(currentValue) => {
                                                setValue(val=>currentValue === val ? "" : currentValue)
                                                setOpen(false)
                                                onChange ? onChange(createChangeEvent(name, String(option.value))) : "";
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
    )
}

const AdvanceSelectSimple = React.forwardRef(AdvanceSelect);
export default AdvanceSelectSimple;