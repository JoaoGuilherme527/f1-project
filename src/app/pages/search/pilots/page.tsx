"use client"

import {GetDrivers} from "@/lib/actions/actions"
import Image from "next/image"
import {useEffect, useLayoutEffect, useState, useTransition} from "react"

function DriverComponent({driver}: {driver: Driver}) {
    const color = "#" + driver.team_colour
    return (
        <div className="flex items-center justify-between relative border border-gray-800 shadow-2xl rounded-sm px-4 bg-[#1e293960] h-auto">
            <div className="flex items-center gap-4">
                {driver.headshot_url && (
                    <Image
                        src={driver.headshot_url.replaceAll(".transform/1col/image.png", "")}
                        alt={driver.full_name ?? ""}
                        width={100}
                        height={100}
                        className="rounded-full h-auto w-auto z-20 bg-[#1e293950] border-2 border-[#1e293950] shadow-lg"
                    />
                )}

                <div className="z-20 flex flex-col justify-center py-2">
                    <h2 className="text-gray-500">Name:</h2>
                    <h3 className={`text-lg font-bold px-2 wrap-break-word`} style={{color: color}}>
                        {driver.full_name ?? ""}
                    </h3>
                    <h4 className="text-gray-500">Team:</h4>
                    <p className="text-md px-2" style={{color: color}}>
                        {driver.team_name ?? ""}
                    </p>
                </div>
            </div>
            <p className="opacity-20 text-5xl text-center " style={{color: color, fontFamily: "Formula1 Display Bold"}}>
                {driver.driver_number ?? ""}
            </p>
        </div>
    )
}

function DriversComponent({drivers}: {drivers: Array<Driver>}) {
    return (
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 pl-0 overflow-y-auto h-[calc(100vh-150px)]">
            {drivers
                .sort((a, b) => (a.team_name ? a.team_name.localeCompare(b.team_name) : 0))
                .map((driver) => (
                    <DriverComponent key={driver.driver_number} driver={driver} />
                ))}
        </div>
    )
}

export default function Pilots() {
    const [isPending, startTransition] = useTransition()
    const [drivers, setDrivers] = useState<Array<Driver>>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isYear, setIsYear] = useState<number>(2025)
    const filteredDrivers = drivers.filter((driver) => driver.full_name.toLowerCase().includes(searchTerm.toLowerCase()))
    useEffect(() => {
        const year = isYear ?? new Date().getFullYear()
        getDrivers(undefined, year)
    }, [])

    useLayoutEffect(
        function changeYear() {
            getDrivers(undefined, isYear)
        },
        [isYear]
    )

    function getDrivers(key: string | undefined, year: number) {
        startTransition(() => {
            GetDrivers(key, year)
                .then((data) => {
                    if (!Array.isArray(data)) {
                        console.log("No data found")
                        return
                    }
                    setDrivers(data as Driver[])
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    return (
        <div className="flex flex-col py-4 gap-2 w-full h-screen">
            <h1 className="px-8 text-4xl text-white font-bold" style={{fontFamily: "Formula1 Display Bold"}}>
                Pilots
            </h1>
            <div className="flex flex-col gap-2 py-2 w-full h-full">
                <div className="flex gap-2">
                    <div className="flex flex-row gap-2 items-center">
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
                    </div>
                    <input
                        className="w-full rounded bg-[#1e293960] p-2 border border-gray-800 text-white"
                        placeholder="Search pilot"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {isPending ? (
                    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-16 h-16 opacity-90 text-gray-200 animate-spin dark:text-gray-200 fill-red-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : searchTerm.length > 0 ? (
                    filteredDrivers.length > 0 ? (
                        <DriversComponent drivers={filteredDrivers} />
                    ) : (
                        <p className="text-white text-center">No pilot found.</p>
                    )
                ) : (
                    <DriversComponent drivers={drivers} />
                )}
            </div>
        </div>
    )
}
