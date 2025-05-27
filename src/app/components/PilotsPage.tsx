"use client"

import {useState} from "react"
import {Icon} from "../../../public/icons/icons"

function PilotComponent({pilot}: {pilot: Pilot}) {
    const color = "#" + pilot.team_colour
    return (
        <div className="flex items-center justify-between relative border border-gray-800 shadow-2xl rounded-sm px-4 bg-[#1e293960] max-h-40">
            <div className="flex items-center gap-4">
                {/* {driver.headshot_url && (
                    <Image
                        src={driver.headshot_url.replaceAll(".transform/1col/image.png", "")}
                        alt={driver.full_name ?? ""}
                        width={100}
                        height={100}
                        className="rounded-full h-auto w-auto z-20 bg-[#1e293950] border-2 border-[#1e293950] shadow-lg"
                    />
                )} */}

                <div className="z-20 flex flex-col justify-center py-2">
                    <h2 className={`text-white text-md font-bold px-2 wrap-break-word`} >
                        {pilot.full_name.split(" ")[0] ?? ""}
                    </h2>
                    <h3 className={`text-2xl px-2 wrap-break-word`} style={{color: color,fontFamily: "Formula1 Display Bold"}}>
                        {pilot.full_name.split(" ")[1] ?? ""}
                    </h3>
                    <p className="text-white text-md px-2">
                        {pilot.team_name ?? ""}
                    </p>
                </div>
            </div>
            <p className="opacity-20 text-5xl text-center" style={{color: color, fontFamily: "Formula1 Display Bold"}}>
                {pilot.driver_number ?? ""}
            </p>
        </div>
    )
}

function PilotsComponent({pilots}: {pilots: Array<Pilot>}) {
    const [page, setPage] = useState(1)
    const itemsPerPage = 8

    const paginatedTracks = pilots.slice(0, page * itemsPerPage)

    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 min-md:grid-rows-5 p-4 w-full max-w-full overflow-y-auto h-[calc(100vh-150px)]">
            {paginatedTracks
                .sort((a, b) => (a.team_name ? a.team_name.localeCompare(b.team_name) : 0))
                .map((pilot) => (
                    <PilotComponent key={pilot.driver_number} pilot={pilot} />
                ))}
            {paginatedTracks.length < pilots.length && (
                <button
                    className="bg-blue-900 text-white rounded-md p-2 hover:bg-blue-950 transition duration-300 ease-in-out min-md:col-span-4 h-10"
                    onClick={() => setPage(page + 1)}
                >
                    Load more
                </button>
            )}
        </div>
    )
}

export default function PilotsPage({pilots}: {pilots: Array<Pilot>}) {
    const [searchTerm, setSearchTerm] = useState("")
    const filteredDrivers = pilots.filter((pilot) => pilot.full_name.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="flex flex-col py-4 gap-2 w-full h-screen">
            <h1 className="px-10 text-4xl text-white font-bold max-sm:text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                Pilots
            </h1>
            <div className="flex flex-col gap-2 py-2 w-full h-full">
                <div className="flex gap-2 px-4">
                    {/* <div className="flex flex-row gap-2 items-center">
                        <button
                            className="bg-[#1e293960] h-full px-2 border border-gray-800 rounded-md disabled:opacity-50"
                            disabled={isYear <= 2023}
                            onClick={() => {
                                setIsYear((previous) => (previous <= 2023 ? previous : previous - 1))
                            }}
                        >
                            <svg
                                className="w-6 h-2 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 8"
                            >
                                <path stroke="currentColor" strokeWidth="2" d="m1 1 5.326 5.7a.909.909 0 0 0 1.348 0L13 1" />
                            </svg>
                        </button>
                        <input
                            min="2023"
                            value={isYear}
                            readOnly
                            className="w-full rounded bg-[#1e293960] p-2 border border-gray-800 text-white outline-none cursor-default text-center"
                        />
                        <button
                            className="bg-[#1e293960] h-full px-2 border border-gray-800 rounded-md disabled:opacity-50 "
                            disabled={isYear >= 2025}
                            onClick={() => {
                                setIsYear((previous) => (previous >= 2025 ? previous : previous + 1))
                            }}
                        >
                            <svg
                                className="w-6 h-2 text-gray-800 dark:text-white"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 8"
                            >
                                <path stroke="currentColor" strokeWidth="2" d="M13 7 7.674 1.3a.91.91 0 0 0-1.348 0L1 7" />
                            </svg>
                        </button>
                    </div> */}
                    <input
                        className="w-full rounded bg-[#1e293960] p-2 border border-gray-800 text-white"
                        placeholder="Search pilot"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {false ? (
                    <div className="absolute top-1/2 left-1/2 translate-x-[-50%] -translate-y-[50%]">
                        <Icon icon="loading" className="w-30 h-30" />
                    </div>
                ) : searchTerm.length > 0 && filteredDrivers.length === 0 ? (
                    <p className="text-white text-center pt-2">No pilot found.</p>
                ) : searchTerm.length > 0 && filteredDrivers.length > 0 ? (
                    <PilotsComponent pilots={filteredDrivers} />
                ) : (
                    <PilotsComponent pilots={pilots} />
                )}
            </div>
        </div>
    )
}

