import { createChangeEvent } from "@/lib/utils";
import { FormContext } from "@/providers/formContext";
import React, { useContext, useEffect,useState } from "react";

function isNumeric(str:string) { return /^\d{1,}$/.test(str); }

//@ts-ignore
function cTimeInput({ title, name, type, icon, placeholder, error, onChange, ...res }: CustomInputProps, ref: any) {
    const { setValue, getValues, watch } = useContext(FormContext);
    const [hours, setHours] = useState<number | null>(null);
    const [minutes, setMinutes] = useState<number | null>(null);
    const hoursMinutes = watch(name);



    useEffect(() => {
        const initHousMinutes = getValues(name)
        try {
            setHours(Number(initHousMinutes?.split(":")[0]))
            setMinutes(Number(initHousMinutes?.split(":")[1]))
        } catch (e) {
            console.error(initHousMinutes)
            setHours(0)
            setMinutes(0)
        }
    }, []);

    useEffect(() => {

        try {
            const formHours = hoursMinutes?.split(":")[0]
            const formMinutes = hoursMinutes?.split(":")[1]

            if (formHours && isNumeric(formHours) && Number(formHours) != Number(hours)) {
                setHours(formHours)
            }

            if (formMinutes && isNumeric(formMinutes) && Number(formMinutes) != Number(minutes)) {
                setMinutes(formMinutes)
            }
        } catch (e) {
            setHours(0)
            setMinutes(0)
        }

    }, [hoursMinutes]);

    useEffect(() => {

        if (hours == null || minutes == null) {
            return;
        }
        const formatedTime = String(hours).padStart(2, '0') + ":" + String(minutes).padStart(2, '0');        
        const sec=getValues(name).split(":").length==3?":00":""
        
        if (formatedTime+sec != getValues(name)) {
            setValue(name, formatedTime);
            if (onChange) {
                // const syntheticEvent = { target: { name, value: formatedTime } };
                const syntheticEvent = createChangeEvent<HTMLInputElement>(name, formatedTime)
                onChange(syntheticEvent);
            }

        }

    }, [minutes, hours]);

    const handleMinutesChange = (e:any) => {
        setMinutes(Number(e.target.value))
    }
    const handleHoursChange = (e:any) => {
        setHours(Number(e.target.value))
    }

    return (

        <div className={`mb-2 ${res.className}`}>

            <label htmlFor={name} className={`mb-2 block text-sm font-bold ${res.className}`}>
                {title}
            </label>
            <div className="relative inline-flex  ">
                <input
                    id={`${name}-hours`}
                    name={`${name}-hours`}
                    type="number"
                    disabled={res.disabled}
                    onChange={handleHoursChange}
                    value={String(hours).padStart(2, "0")}
                    min="0"
                    placeholder={placeholder}
                    className={`h-9 peer block w-full ${res.disabled ? '' : 'cursor-pointer'} rounded-md border ${["time"].includes(type+"") ? "py-0" : "py-2"} pl-10 text-sm outline-2 placeholder:text-gray-500
     ${error ? 'border-red-300' : 'border-gray-200'} ${res.disabled ? 'text-gray-400' : 'text-black'} p-1 `}

                />
                <div className={"self-center p-2 text-2xl "}>:</div>
                <input
                    id={`${name}-minutes`}
                    name={`${name}-minutes`}
                    type="number"
                    disabled={res.disabled}
                    onChange={handleMinutesChange}
                    value={String(minutes).padStart(2, "0")}
                    // step={`${res.step??"0.01"}`}
                    placeholder={placeholder}
                    min="0"
                    className={`h-9 peer block w-full ${res.disabled ? '' : 'cursor-pointer'} rounded-md border ${["time"].includes(type+"") ? "" : "py-2"} pl-10 text-sm outline-2 placeholder:text-gray-500
     ${error ? 'border-red-300' : 'border-gray-200'} ${res.disabled ? 'text-gray-400' : 'text-black'} p-1 `}
                />
            </div>
            {error && (
                <p className="text-xs italic text-red-500 mt-2"> {error as string}
                </p>
            )}
        </div>

    );
}

const TimeInput = React.forwardRef(cTimeInput);
export default TimeInput;


