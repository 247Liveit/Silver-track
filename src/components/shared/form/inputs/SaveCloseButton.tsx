
import { Button} from "@/components/ui/button";
import { FormContext } from "@/providers/formContext";
import { ButtonProps } from "@/types/forms/ButtonPropsType";
import { useContext } from "react";


export default function SaveCloseButton({ loading, edit, showCancelBtn, showNewBtn, onClick }: ButtonProps) {
    const { reset } = useContext(FormContext);

    return (
        <div className="m-2 flex justify-end gap-4">
            {showCancelBtn &&
                <Button
                    type="button"
                    className="flex h-10 items-center rounded-lg bg-gray-100 px-4 text-sm font-medium text-gray-600 transition-colors hover:bg-gray-200">
                    Cancel
                </Button>
            }

            {showNewBtn &&
                <Button type="button"
                    variant={"outline"}
                    onClick={() => { reset();console.log("reseting"); }}
                    className="flex h-10 items-center rounded-lg  px-4 text-sm font-medium transition-colors"
                    disabled={loading} aria-disabled={loading}>
                    New
                </Button>
            }

            {edit &&
                <Button type="submit"
                    onClick={onClick}
                    className="flex h-10 items-center rounded-lg  px-4 text-sm font-medium transition-colors"
                    disabled={loading} aria-disabled={loading}>
                    {loading ? 'please wait..' : 'Submit'}
                </Button>
            }


            <div
                className="flex h-8 items-end space-x-1"
                aria-live="polite"
                aria-atomic="true"
            >
            </div>
        </div>
    )
}