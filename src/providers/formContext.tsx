import { FormContextType } from "@/types/types";
import { createContext } from "react";

export const FormContext = createContext<FormContextType>({} as FormContextType)
