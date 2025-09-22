import { dateFromat } from "@/lib/utils";

export const onDelete = (url: string, item: any, axios: any, toast: any, handleDelete) => {
    const tost= toast({
        title: "Please wait ...",
        itemID:"formSubmitWaiting",
    })

    axios.delete(url)
        .then(() => {
            handleDelete(item, "delete")
            toast({
                itemID: "SUCCSESS",
                title: 'deleted successfully',
                description: dateFromat(new Date()),
                variant: "success"
            })
        })
        .catch(err => {
            if (err?.response?.data?.message && typeof err?.response?.data?.message != "string") {
                toast({
                    title: err.response.data.message[0],
                    description: dateFromat(new Date()),
                    variant: "destructive"
                })
            } else
                toast({
                    title: err.message,
                    description: dateFromat(new Date()),
                    variant: "destructive"
                })
        })
        .finally(() => {
            tost.dismiss();
        });
}