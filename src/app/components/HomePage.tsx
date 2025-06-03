"use client"

import Image from "next/image"
import {useEffect, useState} from "react"
import {formatTime, getContrastTextColor, getMonthShort, getTimeInOffset, getWeekdayShort, pad} from "@/lib/utils"
import {getNameOfSession, sessionKeys} from "@/types/ErgastExport"

interface HomePageProps {
    nextRace: Race
    nextMeeting: Meeting | null
    track: Track
    timeLeft: number | null
    driverStandingList: DriverStanding[]
    teamStandingList: ConstructorStanding[]
    teams: Team[]
    drivers: Driver[]
}

export default function HomePage({driverStandingList, nextRace, nextMeeting, track, timeLeft, teams, teamStandingList}: HomePageProps) {
    const [timeMode, setTimeMode] = useState<"local" | "track">("local")
    const [isTimeLeft, setIsTimeLeft] = useState<number>(timeLeft ?? 0)

    const raceTime = nextRace?.date + "T" + nextRace?.time
    const firstPracticeTime = nextRace.FirstPractice?.date+"T"+nextRace.FirstPractice?.time

    const raceDateObj = new Date(raceTime)
    const race =
        timeMode === "local"
            ? `${pad(raceDateObj.getHours())}:${pad(raceDateObj.getMinutes())}`
            : getTimeInOffset(nextRace.date as string, nextRace.time, nextMeeting?.gmt_offset as string)
    const firstPracticeDateObj = new Date(firstPracticeTime)
    const firstPractice =
        timeMode === "local"
            ? `${pad(firstPracticeDateObj.getHours())}:${pad(firstPracticeDateObj.getMinutes())}`
            : getTimeInOffset(nextRace.FirstPractice?.date as string, nextRace.FirstPractice?.time, nextMeeting?.gmt_offset as string)

    const Separator = ({axle}: {axle: "x" | "y"}) => <div className={`${axle === "x" ? "h-0.5 w-full" : "h-full w-0.5"} bg-gray-600`} />

    const NextRaceSchedule = () =>
        sessionKeys.map((key, index) => {
            const session = nextRace[key]
            if (!session) return null

            const dateObj = new Date(`${session.date}T${session.time}`)
            const displayTime =
                timeMode === "local"
                    ? `${pad(dateObj.getHours())}:${pad(dateObj.getMinutes())}`
                    : getTimeInOffset(session.date, session.time, nextMeeting?.gmt_offset as string)

            return (
                <div key={index} className="grid grid-cols-3 w-full">
                    <p className="text-white">{getNameOfSession(index)}</p>
                    <p className="text-gray-500 text-center">{getWeekdayShort(dateObj)}</p>
                    <div className="py-2 px-6 bg-gray-600 rounded-lg">
                        <p className="text-white text-center">{displayTime}</p>
                    </div>
                </div>
            )
        })

    const NextRaceLayout = ({nextMeeting}: {nextMeeting: Meeting}) => {
        const firstDate = pad(new Date(firstPracticeTime).getUTCDate())
        const secondDate = pad(new Date(raceTime).getUTCDate())
        const firstMonth = getMonthShort(new Date(firstPracticeTime))
        const secondMonth = getMonthShort(new Date(raceTime))

        const months = firstMonth === secondMonth ? firstMonth : `${firstMonth}-${secondMonth}`

        return (
            <div className="flex flex-col gap-4 bg-gray-950 border-2 border-gray-600 p-4 rounded-2xl w-full relative">
                <div className="bg-gray-950 absolute top-[-7px] left-1/2 translate-x-[-50%] px-2">
                    <p className="text-sm text-red-500 font-extrabold">ROUND {nextMeeting.circuit_key}</p>
                </div>

                <div className="flex items-center justify-between">
                    <div className="flex flex-col gap-1">
                        <h1 className="text-white text-2xl " style={{fontFamily: "Formula1 Display Wide"}}>
                            {firstDate}-{secondDate}
                        </h1>
                        <div className=" w-fit px-4 flex justify-center bg-white rounded text-sm">
                            <h1 className="text-center" style={{fontFamily: "Formula1 Display Wide"}}>
                                {months}
                            </h1>
                        </div>
                    </div>
                    <p className="text-4xl px-2">{nextMeeting.flag}</p>
                </div>

                <h2 className="text-4xl text-white" style={{fontFamily: "Formula1 Display Bold"}}>
                    {nextMeeting.country_name}
                </h2>
                <p className="text-white">{nextMeeting.meeting_official_name}</p>
                <Separator axle="x" />
                <div className="flex items-center justify-center overflow-clip rounded-lg bg-plusPattern64 bg-[length:8px] h-28">
                    <Image
                        className="object-contain h-full "
                        alt={track?.name as string}
                        height={112}
                        width={136}
                        src={track?.src as string}
                    />
                </div>
            </div>
        )
    }

    const Countdown = () => {
        if (!nextMeeting) return null

        const diffMs = new Date(raceTime).getTime() - Date.now()
        const oneDay = 24 * 60 * 60 * 1000

        if (diffMs <= 0) return <p className="text-white text-center">Started!</p>

        if (diffMs > oneDay) {
            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
            useEffect(() => {
                const interval = setInterval(() => {
                    setIsTimeLeft(new Date(raceTime).getTime() - Date.now())
                }, 60000)
                return () => clearInterval(interval)
            }, [])
            return (
                <CountdownBlock
                    values={[
                        {label: days <= 1 ? "DAY" : "DAYS", value: pad(days)},
                        {label: hours <= 1 ? "HR" : "HRS", value: pad(hours)},
                        {label: "MINS", value: pad(minutes)},
                    ]}
                />
            )
        }

        const {hours, minutes, seconds} = formatTime(diffMs)
        useEffect(() => {
            const interval = setInterval(() => {
                setIsTimeLeft(new Date(raceTime).getTime() - Date.now())
            }, 1000)
            return () => clearInterval(interval)
        }, [])
        return (
            <CountdownBlock
                values={[
                    {label: Number(hours) <= 1 ? "HR" : "HRS", value: pad(Number(hours))},
                    {label: "MINS", value: pad(Number(minutes))},
                    {label: "SECS", value: pad(Number(seconds))},
                ]}
            />
        )
    }

    const CountdownBlock = ({values}: {values: {label: string; value: string | number}[]}) => (
        <div className="text-white flex flex-col gap-2 bg-gray-950 justify-center rounded-2xl w-full items-center px-10 py-4 border-2 border-gray-600">
            <div className="flex flex-col items-center">
                <p className="text-lg font-extrabold">RACE</p>
            </div>
            <Separator axle="x" />
            <div className="flex">
                {values.map(({label, value}, idx) => (
                    <div key={label} className="flex items-center">
                        <div className="flex flex-col items-center w-20">
                            <p className="text-4xl w-full text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                                {value}
                            </p>
                            <p className="text-sm text-gray-500 text-center">{label}</p>
                        </div>
                        {idx < values.length - 1 && <Separator axle="y" />}
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <div className="min-lg:h-screen bg-gray-950 overflow-y-scroll">
            {nextRace && (
                <section className="p-4 flex flex-col items-center bg-gray-950 text-gray-50 gap-2 border-b-2 border-gray-600">
                    <h2 className="text-3xl font-semibold mask-t-from-6">Next Race</h2>
                    <p className="text-xl mask-t-from-6">{nextRace.raceName}</p>
                </section>
            )}
            {nextMeeting && (
                <div className="flex items-start gap-4 p-4 max-sm:flex-col max-sm:pb-4 pb-10">
                    <div className="flex flex-col gap-4 w-full">
                        <NextRaceLayout nextMeeting={nextMeeting} />
                        <Countdown />
                    </div>

                    <div className="flex flex-col items-center gap-4 w-full">
                        <div className="flex flex-col items-center w-full justify-between bg-gray-800 p-4 gap-6 rounded-lg">
                            <div className="grid grid-cols-2 gap-4 bg-gray-800 w-full rounded-lg ">
                                <button
                                    onClick={() => setTimeMode("local")}
                                    className={`py-2 px-4 rounded-lg ${
                                        timeMode === "local" ? "bg-red-500" : "bg-gray-700"
                                    } text-white transition-all`}
                                >
                                    MY TIME
                                </button>
                                <button
                                    onClick={() => setTimeMode("track")}
                                    className={`py-2 px-4 rounded-lg ${
                                        timeMode === "track" ? "bg-red-500" : "bg-gray-700"
                                    } text-white transition-all`}
                                >
                                    TRACK TIME
                                </button>
                            </div>
                            <Separator axle="x" />
                            <NextRaceSchedule />
                            <Separator axle="x" />
                            <div className="grid grid-cols-3 w-full">
                                <p className="text-white">RACE</p>
                                <p className="text-gray-500 text-center">{getWeekdayShort(new Date(raceTime))}</p>
                                <div className="py-2 px-6 bg-gray-600 rounded-lg">
                                    <p className="text-white text-center">
                                        {race}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col items-center w-full border-2 border-gray-600 rounded-lg">
                            <h2 className=" py-4 text-3xl font-semibold mask-b-from-5 text-gray-50 text-center w-full">Team Standings</h2>
                            <div className="flex flex-col items-center w-full border-t-2 border-gray-600">
                                {teamStandingList
                                    .sort((a, b) => Number(a.position) - Number(b.position))
                                    .map(({position, points, Constructor}, index) => {
                                        const filteredTeam = teams.filter(
                                            ({constructorId}) => constructorId === Constructor.constructorId
                                        )[0]

                                        return (
                                            <div
                                                key={index}
                                                className="w-full flex items-center border-b-2 border-gray-600 text-white"
                                                // style={{background: color}}
                                            >
                                                <div className="w-14 py-2 border-r-2 border-gray-600">
                                                    <h1 className="text-center text-sm">{position}</h1>
                                                </div>
                                                <div className="flex items-center gap-2 w-full">
                                                    <div className="w-[48px] flex justify-center items-center">
                                                        <Image alt="Team Logo" src={filteredTeam.logo} height={36} width={22} />
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <p
                                                            className="text-shadow text-md"
                                                            style={{
                                                                fontFamily: "Formula1 Display Bold",
                                                            }}
                                                        >
                                                            {filteredTeam.name.toUpperCase()}
                                                        </p>
                                                    </div>
                                                </div>
                                                <div className="bg-gray-800 w-14 py-2">
                                                    <h1
                                                        style={{fontFamily: "Formula1 Display Bold"}}
                                                        className="text-center text-white text-sm"
                                                    >
                                                        {points}
                                                    </h1>
                                                </div>
                                            </div>
                                        )
                                    })}
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col items-center w-full  border-2 border-gray-600 rounded-lg">
                        <h2 className=" py-4 text-3xl font-semibold mask-b-from-5 text-gray-50 text-center w-full">Driver Standings</h2>
                        <div className="flex flex-col items-center w-full border-t-2 border-gray-600">
                            {driverStandingList
                                .sort((a, b) => Number(a.position) - Number(b.position))
                                .map(({position, points, Driver}, index) => {
                                    let teamName = ""
                                    for (let team of teams) {
                                        for (let pilot of team.pilots) {
                                            if (pilot.toLowerCase().includes(Driver.givenName.toLowerCase())) {
                                                teamName = team.name
                                            }
                                        }
                                    }
                                    const filteredTeam = teams.filter(({name}) => name === teamName)[0]
                                    const color = filteredTeam.color as string
                                    const contrastColor = getContrastTextColor(color)

                                    return (
                                        <div
                                            key={index}
                                            className="w-full flex items-center border-b-2 border-gray-600 text-white"
                                            // style={{background: color}}
                                        >
                                            <div className="w-14 py-2 border-r-2 border-gray-600">
                                                <h1 className="text-center text-sm">{position}</h1>
                                            </div>
                                            <div className="flex items-center gap-2 w-full">
                                                <div className="w-[48px] flex justify-center items-center">
                                                    <Image alt="Team Logo" src={filteredTeam.logo} height={36} width={22} />
                                                </div>
                                                <div className="flex items-center gap-1">
                                                    <p className="text-sm">{Driver.givenName}</p>
                                                    <p
                                                        className="text-shadow text-md"
                                                        style={{
                                                            fontFamily: "Formula1 Display Bold",
                                                        }}
                                                    >
                                                        {Driver.familyName.toUpperCase()}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="bg-gray-800 w-14 py-2">
                                                <h1
                                                    style={{fontFamily: "Formula1 Display Bold"}}
                                                    className="text-center text-white text-sm"
                                                >
                                                    {points}
                                                </h1>
                                            </div>
                                        </div>
                                    )
                                })}
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
