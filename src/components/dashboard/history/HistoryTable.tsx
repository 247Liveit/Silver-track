import TableHeader from "@/components/TableHeader";
import Pagination from "@/components/Pagination";

export default function HistoryTable({data}: {data:any}) {

    return (
        <div className="rounded-sm border border-stroke bg-white pb-2.5 shadow-default sm:px-7.5 xl:pb-1">
            <div className="max-w-full overflow-x-auto">
                <table className="w-full table-auto">
                    <TableHeader headers={["ID", "User Name", "Action", "Details",'Date']} />
                    <tbody>
                        {data?.items.map((item) => (
                            <tr key={item.id}>
                                <td className="border-b border-[#eee] py-2 px-2 text-center">
                                    <h5 className="font-semibold text-black text-center">
                                        {item.id}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-2 px-2 text-center">
                                    <h5 className="font-semibold text-black">
                                        {item.user.name}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-2 px-2 text-center">
                                    <h5 className="font-semibold text-black">
                                        {item.action}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-2 px-2 text-center">
                                    <h5 className="font-semibold text-black">
                                        {item.text}
                                    </h5>
                                </td>
                                <td className="border-b border-[#eee] py-2 px-2 text-center">
                                    <h5 className="font-semibold text-black">
                                        {new Date(item.created_at).toUTCString().replace("GMT","").substring(0,22)}
                                    </h5>
                                </td>
                              
                            </tr>
                        ))}
                    </tbody>
                </table>

                {data.links &&
                    
                        <Pagination meta={data.meta} links={data.links} url={'/dashboard/preferences'} />
                    }
            </div>
        </div>
    );
}
