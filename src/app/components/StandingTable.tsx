import {JSX} from "react"

export const StandingTable = ({title, children}: {title: string; children: JSX.Element}) => (
    <div className="flex flex-col items-center w-full  border-2 border-gray-600 rounded-lg overflow-hidden">
        <h2 className=" py-4 text-2xl font-semibold mask-b-from-5 text-gray-50 text-center w-full">{title}</h2>
        <div className="flex flex-col items-center w-full border-t-2 border-gray-600">{children}</div>
    </div>
)
