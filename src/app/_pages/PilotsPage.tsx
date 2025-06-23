"use client"

import {useEffect, useLayoutEffect, useState, useTransition} from "react"
import {Icon} from "../../../public/icons/icons"
import Image from "next/image"
import {Search as SearchIcon} from "@deemlol/next-icons"
import {GetErgastDrivers} from "@/lib/actions/actions"

interface PilotsPageProps {
    drivers: Array<DriverErgast>
    driversOpenF1: Driver[]
    teams: Team[]
}

export default function PilotsPage({drivers, driversOpenF1, teams}: PilotsPageProps) {
    const [isYear, setIsYear] = useState(2025)
    const [searchTerm, setSearchTerm] = useState("")
    const [isDrivers, setIsDrivers] = useState(drivers)
    const [allDrivers, setAllDrivers] = useState<
        | {
              driver: string
              team: string
              constructorId: string
              color: string
              logo: string
          }[]
        | undefined
    >()
    const [activeAllDrivers, setActiveAllDrivers] = useState(false)

    const [transition, setTransition] = useTransition()

    const filteredDrivers =
        searchTerm.length > 0
            ? isDrivers.filter((driver) => (driver.givenName + " " + driver.familyName).toLowerCase().includes(searchTerm.toLowerCase()))
            : isDrivers
    const filteredAllDrivers =
        searchTerm.length > 0
            ? allDrivers?.filter(
                  ({driver, team}) =>
                      driver.toLowerCase().includes(searchTerm.toLowerCase()) || team.toLowerCase().includes(searchTerm.toLowerCase())
              )
            : allDrivers

    function Search() {
        setTransition(() => {
            GetErgastDrivers(isYear).then((data) => {
                setIsDrivers(data)
            })
        })
    }

    useLayoutEffect(() => {
        setTimeout(() => {
            Search()
        }, 1000)
        return () => {
            setIsDrivers(drivers)
        }
    }, [isYear])

    useLayoutEffect(() => {
        const uniqueDrivers: {
            driver: string
            team: string
            constructorId: string
            color: string
            logo: string
        }[] = []

        teams.forEach((team) => {
            team.pilots.forEach((pilotYear) => {
                pilotYear.drivers.forEach((driver) => {
                    const alreadyExists = uniqueDrivers.some((item) => item.driver === driver && item.constructorId === team.constructorId)

                    if (!alreadyExists) {
                        uniqueDrivers.push({
                            driver,
                            team: team.name,
                            constructorId: team.constructorId,
                            color: team.color,
                            logo: team.logo,
                        })
                    }
                })
            })
        })
        setAllDrivers(uniqueDrivers)
    }, [])

    const PilotComponent = ({driver}: {driver: DriverErgast}) => {
        let teamName = ""
        let driverFiltered: any = driver
        for (let team of teams) {
            for (let pilots of team.pilots) {
                if (Number(pilots.year) == isYear) {
                    for (let _driver of pilots.drivers) {
                        if (_driver.toLowerCase().includes(driver.givenName.toLowerCase())) {
                            teamName = team.name
                        }
                    }
                }
            }
        }

        for (const pilot of driversOpenF1) {
            if (pilot.last_name.toLowerCase().includes(driver.familyName.toLowerCase())) {
                driverFiltered = {...driver, ...pilot}
            }
        }

        const filteredTeam = teams.filter(({name}) => name.toLowerCase() === teamName.toLowerCase())[0]
        const color = filteredTeam ? filteredTeam.color : "black"
        useLayoutEffect(() => {
            // console.log(driver.familyName);
            // console.log(filteredTeam.name);
            return () => {}
        }, [])
        return (
            <div
                className={`flex bg-[#1e293960] items-center justify-between relative border border-gray-800 shadow-2xl rounded-sm px-6 w-full min-md:80`}
            >
                <div className="flex items-center gap-4">
                    {/* {driverFiltered.headshot_url && (
                        <Image
                            src={driverFiltered.headshot_url}
                            alt={driverFiltered.full_name ?? ""}
                            width={100}
                            height={100}
                            className="rounded-full h-auto w-auto z-20 bg-[#1e293950] border-2 border-[#1e293950] shadow-lg"
                        />
                    )} */}

                    <div className="z-20 flex flex-col justify-center py-2">
                        <h2 className={`text-white text-md font-bold wrap-break-word`}>{driver.givenName}</h2>
                        <h3 className={`text-2xl wrap-break-word`} style={{color: color, fontFamily: "Formula1 Display Bold"}}>
                            {driver.familyName}
                        </h3>
                        <div className="flex items-center gap-2">
                            <div className="w-[30px]">
                                {filteredTeam ? <Image alt="Team Logo" src={filteredTeam.logo} height={96} width={96} /> : <></>}
                            </div>
                            <p className="text-white text-md px-2">{filteredTeam ? filteredTeam.name : ""}</p>
                        </div>
                    </div>
                </div>
                <p
                    className="opacity-50 text-5xl text-white text-center text-shadow-gray-400 text-shadow-2xs"
                    style={{color, fontFamily: "Formula1 Display Bold"}}
                >
                    {driver.permanentNumber}
                </p>
            </div>
        )
    }

    const PilotsComponent = () => {
        // const [page, setPage] = useState(1)
        // const itemsPerPage = 8

        // const paginatedTracks = drivers.slice(0, page * itemsPerPage)

        return (
            <div
                className={`gap-4 p-4 w-full max-w-full overflow-y-auto transition-all flex flex-wrap`}
                style={{
                    columns: "4 200px",
                }}
            >
                {transition ? (
                    <div className={`absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%]`}>
                        <Icon icon="loading" className="w-30 h-30" />
                    </div>
                ) : (
                    filteredDrivers.map((driver, index) => <PilotComponent key={index} driver={driver} />)
                )}
                {/* {paginatedTracks.length < drivers.length && (
                    <button
                        className="bg-blue-900 text-white rounded-md p-2 hover:bg-blue-950 transition duration-300 ease-in-out min-md:col-span-4 h-10"
                        onClick={() => setPage(page + 1)}
                    >
                        Load more
                    </button>
                )} */}
            </div>
        )
    }

    return (
        <div className="flex flex-col py-4 gap-2 w-full h-screen">
            <h1 className="px-10 text-4xl text-white font-bold max-sm:text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                Drivers
            </h1>
            <div className="flex flex-col gap-2 py-2 w-full">
                <div className="flex gap-2 px-4 transition-all">
                    <button
                        className={`${
                            activeAllDrivers ? "bg-blue-900" : "bg-[#1e293960]"
                        } h-full w-1/2 p-2 text-white border border-gray-800 rounded disabled:opacity-50 cursor-pointer`}
                        onClick={() => setActiveAllDrivers(!activeAllDrivers)}
                    >
                        See all Drivers
                    </button>
                    <input
                        className="w-full rounded bg-[#1e293960] p-2 border border-gray-800 text-white"
                        placeholder="Search driver"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button
                        onClick={Search}
                        className="flex flex-row h-12 w-12 px-2 items-center bg-blue-900 border border-gray-800 rounded-md disabled:opacity-50 cursor-pointer"
                    >
                        <SearchIcon size={24} color="#FFFFFF" />
                    </button>
                    {!activeAllDrivers && (
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
                    )}
                </div>
            </div>
            {activeAllDrivers ? (
                <div className={`gap-4 p-4 w-full max-w-full overflow-y-auto transition-all max-sm:grid-cols-1 max-lg:grid-cols-2 grid`}>
                    {filteredAllDrivers?.map((item, index) => (
                        <div
                            key={index}
                            className={`flex bg-[#1e293960] items-center justify-between relative border border-gray-800 shadow-2xl rounded-sm px-6 w-full min-md:80`}
                        >
                            <div className="flex items-center gap-4">
                                <div className="z-20 flex flex-col justify-center py-2">
                                    <h3
                                        className={`text-2xl wrap-break-word`}
                                        style={{color: item.color, fontFamily: "Formula1 Display Bold"}}
                                    >
                                        {item.driver}
                                    </h3>
                                    <div className="flex items-center gap-2">
                                        <div className="w-[30px]">
                                            <Image alt="Team Logo" src={item.logo} height={96} width={96} />
                                        </div>
                                        <p className="text-white text-md px-2">{item.team}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <PilotsComponent />
            )}
        </div>
    )
}
