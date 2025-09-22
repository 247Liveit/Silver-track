import { type ClassValue, clsx } from 'clsx';
import { ChangeEvent } from 'react';
import { twMerge } from 'tailwind-merge';
import { format } from "date-fns";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
export function formatAxiosData(data: any, url: string, additional?: any) {
    switch (url) {
        case '/users':
            return { ...data, isActive: String(data.isActive) === '1'}
        case '/locations':
            return appendFormData(data);
        case '/employees':
            return appendFormData(data);
        case '/countries':
            return appendFormData(data);
        case '/lessons':
            return appendFormData(data);
        case '/testimonials':
            return appendFormData(data);
        case '/roles':
            return appendOnlyTreuValues(data);
        case '/employee-shifts/schedule-update':
            return processEmployeeShiftData(data);
        case '/employee-shifts':
            return appendFormData(data);
        default:
            return data
    }
}

function processEmployeeShiftData(data: any) {

    const formData = new FormData();
    for (const key in data) {
        if (['employeeShifts'].includes(key) && typeof (data['employeeShifts'] === "object")) {
            for (const day in data['employeeShifts']) {
                if (data['employeeShifts'][day] !== false)
                    formData.append(key + "[]", JSON.stringify(data['employeeShifts'][day]))

            }
        } else {
            formData.append(key, data[key]);
        }
    }
    return formData
}

function appendFormData(data: any) {

    const formData = new FormData();
    for (const key in data) {
        if (['file', 'image', 'photo', 'classImage', 'certificate'].includes(key)) {

            if (data[key] && typeof data[key] == "object") {
                formData.append(key, data[key]);
            }


        } else {
            formData.append(key, data[key]);
        }
    }
    return formData
}

function appendOnlyTreuValues(data: any) {
    const formData = new FormData();
    formData.append("name", data.name)
    for (const key in data) {
        if (data[key] === true) {
            formData.append("permissions[]", key);
        }
    }
    return formData
}
export function capitalize(str: string) {
    return str.charAt(0).toUpperCase() + str.slice(1);
}
export  function convertToHourMinuteString(hours) {
    const wholeHours = Math.floor(hours);
    const fractionalPart = hours - wholeHours;
    const minutes = Math.round(fractionalPart * 60);

    return `${wholeHours}:${minutes < 10 ? '0' + minutes : minutes}`;
  }

export function formatErrorToList(str: string[] | string) {
    if (typeof (str) == "string") {
        return (
            '<ul>' +
            '<li style="list-style: circle">' + str + '</li>'
            + '</ul>'
        )
    } else
        return (
            '<ul>' +
            str.map(s => {
                return (
                    '<li style="list-style: circle">' + s + '</li>'
                )
            }).join('')
            + '</ul>'
        )
}
export function removeHtmlTags(input: string | undefined) {
    if (input)
        return input.replace(/<\/?[^>]+(>|$)/g, '');
    return ''
}

export function getUTCDate(date: Date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}
export function getUTCDateTime(date: Date) {
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hour = String(date.getUTCHours()).padStart(2, '0');
    const minute = String(date.getUTCMinutes()).padStart(2, '0');
    const second = String(date.getUTCSeconds()).padStart(2, '0');
    return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
}

export function parseTime(timeStr) {
    if (!timeStr) return 0;
    var parts = timeStr.split(':');
    var hours = parseInt(parts[0], 10);
    var minutes = parseInt(parts[1], 10);
    return (hours * 60 * 60 * 1000) + (minutes * 60 * 1000);
}

export function TimeDiffHours(end: number, start: number) {
    if (end >= start) {
        var diffMs = end - start;
    }
    else {
        var diffMs = (24 * 60 * 60 * 1000 - start) + end;
    }

    return (diffMs / (1000 * 60 * 60)).toFixed(2)
}

export function subtractTimeStr(time1: string, time2: string) {
    const time1MSeconds = Math.floor(parseTime(time1) / 1000)
    const time2MSeconds = Math.floor(parseTime(time2) / 1000)
    return formatTimeStr(time1MSeconds - time2MSeconds);
}
export function sumTimeStr(time1: string, time2: string) {
    const time1MSeconds = Math.floor(parseTime(time1) / 1000)
    const time2MSecods = Math.floor(parseTime(time2) / 1000)
    return formatTimeStr(time1MSeconds + time2MSecods);
}
export function formatTimeStr(timeSeconds) {
    return String(Math.floor(timeSeconds / (60 * 60))).padStart(2, "0") + ":" + String((timeSeconds % (60 * 60)) / 60).padStart(2, "0") + ":" + String(timeSeconds % 60).padStart(2, "0");
}

export const createChangeEvent = <T extends HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>(name: string, value: string):
    ChangeEvent<T> => {
    return {
        target: { name, value } as T, currentTarget: { name, value } as T, bubbles: true, cancelable: true,
        defaultPrevented: false, eventPhase: 0, isTrusted: true, nativeEvent: {} as Event, preventDefault: () => { }, stopPropagation: () => { },
        isPropagationStopped: () => false, isDefaultPrevented: () => false,
        timeStamp: Date.now(), type: 'change', persist: () => { },
    };
};
export function secondsToTime(seconds) {
    let hours = Math.floor(seconds / 3600).toString().padStart(2, '0');
    let minutes = Math.floor((seconds % 3600) / 60).toString().padStart(2, '0');
    let secs = (seconds % 60).toString().padStart(2, '0');
    return `${hours}:${minutes}:${secs}`;
}
export function getWeekBounds(selectedDate: Date): { startDate: Date, endDate: Date } {
    const day = selectedDate.getDay(); // Get the day of the week (0-6, where 0 is Sunday)
    const diffToMonday = (day === 0 ? -6 : 1) - day; // Calculate the difference to the previous Monday
    const diffToSunday = day == 0 ? 0 : (6 - day) + 1; // Calculate the difference to the next Sunday
  
    const startDate = new Date(selectedDate);
    startDate.setDate(selectedDate.getDate() + diffToMonday);
    startDate.setHours(0, 0, 0, 0);
  
    const endDate = new Date(selectedDate);
    endDate.setDate(selectedDate.getDate() + diffToSunday);
    endDate.setHours(23, 59, 59, 999);
  
    return { startDate, endDate };
  }
  
  export const dateFromat = (date: string | Date) => {
    if (date == "" || date == null) {
        return ""
    }
    return format(date, "LLL dd, y HH:mm")
}

export function debounce(func: (...args: any[]) => void, wait: number) {
    let timeout: NodeJS.Timeout;
    return function (...args: any[]) {
        clearTimeout(timeout);
        //@ts-ignore
        timeout = setTimeout(() => func.apply(this, args), wait);
    };
}