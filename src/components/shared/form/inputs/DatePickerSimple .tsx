import * as React from "react"
import { format } from "date-fns"
import { createChangeEvent } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover"
import { cn } from "@/lib/utils"

interface DatePickerSimpleProps {
  title?: string;
  name: string;
  defaultValue?: string;
  placeholder?: string;
  disabled?: boolean;
  error?: string;
  onChange?: (e: any) => void;
  className?: string;
}

function getFormatedDate(date: Date) {
  return date.toISOString().split("T")[0];
}

const DatePickerSimple = React.forwardRef<HTMLInputElement, DatePickerSimpleProps>(
  (
    { title, name, defaultValue, placeholder, disabled, error, onChange, className },
    ref
  ) => {
    const initial = defaultValue ? new Date(defaultValue + "T00:00:00") : undefined;
    const [date, setDate] = React.useState<Date | undefined>(initial);

    const handleSelect = (selected?: Date) => {
      setDate(selected);

      if (onChange) {
        const formatted = selected ? getFormatedDate(selected) : "";
        onChange(createChangeEvent(name, formatted));
      }
    };

    return (
      <div className={`mb-2 ${className || ""}`}>
        {title && <label className="mb-1 block text-md font-bold">{title}</label>}

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              disabled={disabled}
              className={cn(
                "w-full justify-start text-left font-normal",
                !date && "text-muted-foreground",
                error ? "border-red-300" : "border-gray-200"
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, "PPP") : placeholder || "Pick a date"}
            </Button>
          </PopoverTrigger>

          {!disabled && (
            <PopoverContent className="p-0">
              <Calendar
                mode="single"
                selected={date}
                onSelect={handleSelect}
                initialFocus
              />
            </PopoverContent>
          )}
        </Popover>

        {error && (
          <p className="text-xs italic text-red-500 mt-1">{error}</p>
        )}
      </div>
    );
  }
);

export default DatePickerSimple;
