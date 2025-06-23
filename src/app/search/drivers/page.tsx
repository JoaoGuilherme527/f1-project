"use server"

import PilotsPage from "@/app/_pages/PilotsPage"
import {GetDrivers, GetErgastDrivers, GetTeams} from "@/lib/actions/actions"

export default async function Render() {
    const [driversErgast, teams] = await Promise.all([GetDrivers(), GetTeams()])

    const drivers = await GetErgastDrivers(2025)

    return <PilotsPage drivers={drivers}  driversOpenF1={driversErgast} teams={teams}/>
}

{
    /* <h1 className="px-10 text-4xl text-white font-bold max-sm:text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                Drivers
            </h1>
            <div className="flex flex-col gap-2 py-2 w-full">
                <div className="flex gap-2 px-4">
                    <input
                        className="w-full rounded bg-[#1e293960] p-2 border border-gray-800 text-white"
                        placeholder="Search driver"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button className="flex flex-row h-12 w-12 px-2 items-center bg-blue-900 border border-gray-800 rounded-md disabled:opacity-50 cursor-pointer">
                        <Search size={24} color="#FFFFFF" />
                    </button>
                    <div className="flex flex-row gap-2 items-center">
                        <button
                            className="bg-[#1e293960] h-full px-2 border border-gray-800 rounded-md disabled:opacity-50"
                            disabled={isYear <= 1950}
                            onClick={() => {
                                setIsYear((previous) => previous - 1)
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
                            onChange={(e) => setIsYear(Number(e.target.value))}
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
                </div>
            </div> */
}
