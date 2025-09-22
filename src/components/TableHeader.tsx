

export default function TableHeader({ headers, withActions = true }: { headers: string[], withActions?: boolean }) {
    return (
        <thead className="bg-sidebar" >
            <tr className="bg-gray-2 text-center " >
                {headers.map(header => {
                    return (
                        <th key={header} className="py-4 px-0 font-semibold text-black text-center ">
                            {header}
                        </th>
                    )
                })}
                {withActions &&

                    <th className="py-4 px-4 font-semibold text-black text-center ">
                        Actions
                    </th>
                }
            </tr>
        </thead>
    )
}


