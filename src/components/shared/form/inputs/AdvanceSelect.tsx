import * as React from "react";
import { useContext } from "react";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { FormContext } from "@/providers/formContext";
import { CustomSelectProps, SelectOption } from "@/types/forms/SelectPropsType";

function AdvanceSelect(
  {
    title,
    name,
    icon,
    placeholder,
    error, // not used directly; RHF's FormMessage will handle messages
    selected, // will be ignored in favor of RHF's field.value, but kept for API compat
    options = [],
    onTypeing, // keeping your spelling to match current codebase
    otherOption,
    onChange, // optional external onChange; we'll call it after field.onChange
    className,
    hidden,
    disabled,
    ...res
  }: CustomSelectProps,
  ref: any
) {
  const form = useContext(FormContext);
  const [open, setOpen] = React.useState(false);
  const [items, setItems] = React.useState<SelectOption[]>(options);

  React.useEffect(() => {
    setItems(options || []);
  }, [options]);

  // Helper: get the label shown in the button from the current field value
  const getLabelForValue = (val: unknown) => {
    const found = items.find((i) => String(i.value) === String(val));
    if (found) return found.label;
    if (otherOption && String(val) === "0") return otherOption;
    return "";
  };

  if(name=="location")
  console.log(items);

  return (
    <FormField
      control={form?.control}
      name={name}
      render={({ field }) => {
        // Normalize the field.value to string (RHF often handles strings)
        const fieldValue = field.value ?? (selected ?? ""); // allow initial selected to seed if RHF has no value yet
        const selectedLabel = getLabelForValue(fieldValue);

        return !hidden ? (
          <FormItem className={cn("mb-2", className)}>
            {title ? (
              <FormLabel className="font-bold flex items-center gap-2">
                {icon ? icon : null}
                {title}
              </FormLabel>
            ) : null}

            <FormControl>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button
                    ref={ref}
                    type="button"
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className={cn(
                      "w-full justify-between truncate overflow-hidden text-ellipsis",
                      disabled && "opacity-60 cursor-not-allowed"
                    )}
                    disabled={disabled}
                  >
                    <span className="truncate w-full text-left">
                      {selectedLabel || placeholder || "Select..."}
                    </span>
                    <ChevronsUpDown className="opacity-50 flex-shrink-0" />
                  </Button>
                </PopoverTrigger>

                {!disabled && (
                  <PopoverContent className="w-full p-0">
                    <Command>
                      <CommandInput
                        placeholder={placeholder}
                        className="h-9"
                        onValueChange={onTypeing}
                      />
                      <CommandList>
                        <CommandEmpty>No item found.</CommandEmpty>
                        <CommandGroup>
                          {otherOption && (
                            <CommandItem
                              key="__other__"
                              // `value` here is purely for Command’s typeahead/filtering
                              value={`0 ${otherOption}`}
                              onSelect={() => {
                                // Update RHF
                                field.onChange("0");
                                // Call external onChange if provided
                                onChange?.({
                                  target: { name, value: "0" },
                                } as unknown as React.ChangeEvent<HTMLInputElement>);
                                setOpen(false);
                              }}
                            >
                              {otherOption}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  String(fieldValue) === "0"
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          )}

                          {items.map((opt) => (
                            <CommandItem
                              key={String(opt.value)}
                              value={`${opt.value} ${opt.label}`}
                              onSelect={() => {
                                const newVal = String(opt.value);
                                // Toggle-off behavior (optional): if same value, clear. Comment out if undesired.
                                const finalVal =
                                  String(fieldValue) === newVal ? "" : newVal;

                                field.onChange(finalVal);
                                onChange?.({
                                  target: { name, value: finalVal },
                                } as unknown as React.ChangeEvent<HTMLInputElement>);
                                setOpen(false);
                              }}
                            >
                              {opt.label}
                              <Check
                                className={cn(
                                  "ml-auto",
                                  String(fieldValue) === String(opt.value)
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                )}
              </Popover>
            </FormControl>

            <FormMessage className="h-auto min-h-2" />
          </FormItem>
        ) : (
          <></>
        );
      }}
    />
  );
}

const AdvanceSelectSimple = React.forwardRef(AdvanceSelect);
export default AdvanceSelectSimple;
