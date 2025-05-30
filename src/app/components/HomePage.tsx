"use client"

import Image from "next/image"
import {useEffect, useState, useTransition} from "react"
import {formatTime, getMonthShort, getWeekdayShort} from "@/lib/utils"

interface HomePageProps {
    nextRace: Race
    nextMeeting: Meeting | null
    track: Track
    timeLeft: number | null
}

export default function HomePage({nextRace, nextMeeting, track, timeLeft}: HomePageProps) {
    const [isTimeLeft, setIsTimeLeft] = useState<number>(timeLeft ?? 0)
    const firstPractice = nextRace.FirstPractice?.date + "T" + nextRace.FirstPractice?.time?.replace("z", nextMeeting?.gmt_offset as string)
    const secondPractice =
        nextRace.SecondPractice?.date + "T" + nextRace.SecondPractice?.time?.replace("z", nextMeeting?.gmt_offset as string)
    const thirdPractice = nextRace.ThirdPractice?.date + "T" + nextRace.ThirdPractice?.time?.replace("z", nextMeeting?.gmt_offset as string)
    const qualifying = nextRace.Qualifying?.date + "T" + nextRace.Qualifying?.time?.replace("z", nextMeeting?.gmt_offset as string)
    const race = nextRace?.date + "T" + nextRace?.time?.replace("z", nextMeeting?.gmt_offset as string)

    useEffect(() => {
        if (!nextRace) return
        const interval = setInterval(() => {
            setIsTimeLeft(new Date(firstPractice).getTime() - Date.now())
        }, 1000)
        return () => clearInterval(interval)
    }, [nextRace])

    const Countdown = () => {
        if (!nextMeeting) return null

        const diffMs = new Date(firstPractice).getTime() - Date.now()
        const oneDay = 24 * 60 * 60 * 1000

        if (diffMs <= 0) return <p className="text-white text-center">Started!</p>

        if (diffMs > oneDay) {
            const days = Math.floor(diffMs / (1000 * 60 * 60 * 24))
            const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
            const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60))
            return (
                <CountdownBlock
                    values={[
                        {label: "DAYS", value: days},
                        {label: "HRS", value: hours},
                        {label: "MIN", value: minutes},
                    ]}
                />
            )
        }

        const {hours, minutes, seconds} = formatTime(diffMs)
        return (
            <CountdownBlock
                values={[
                    {label: "HRS", value: hours},
                    {label: "MIN", value: minutes},
                    {label: "SECS", value: seconds},
                ]}
            />
        )
    }

    const CountdownBlock = ({values}: {values: {label: string; value: string | number}[]}) => (
        <div className="text-white flex flex-col gap-3 bg-gray-950 justify-center rounded-2xl w-80 max-sm:w-full max-sm:items-center px-10 py-4 border-2 border-gray-600">
            <div className="flex flex-col items-center">
                <p className="text-md font-extrabold">PRACTICE</p>
            </div>
            <div className="h-0.5 w-full bg-gray-600" />
            <div className="flex">
                {values.map(({label, value}, idx) => (
                    <div key={label} className="flex items-center">
                        <div className="flex flex-col gap-2 items-center w-20">
                            <p className="text-4xl w-full text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                                {value}
                            </p>
                            <p className="text-sm text-gray-500 text-center">{label}</p>
                        </div>
                        {idx < values.length - 1 && <div className="h-10 w-0.5 bg-gray-500" />}
                    </div>
                ))}
            </div>
        </div>
    )

    return (
        <div className="min-h-screen bg-gray-950">
            {nextRace && (
                <section className="p-4 flex flex-col items-center bg-gray-950 text-gray-50 gap-2 border-b-2 border-gray-600">
                    <h2 className="text-3xl font-semibold mask-t-from-6">Próxima Corrida</h2>
                    <p className="text-xl mask-t-from-6">{nextRace.raceName}</p>
                </section>
            )}
            {nextMeeting && (
                <div className="flex flex-col items-center p-4">
                    <div className="flex items-start rounded-2xl gap-4 max-sm:flex-col">
                        <div className="flex flex-col gap-4 bg-gray-950 border-2 border-gray-600 p-4 rounded-2xl w-80 max-sm:w-full">
                            <div className="flex items-center justify-between">
                                <div className="flex flex-col gap-1">
                                    <h1 className="text-white" style={{fontFamily: "Formula1 Display Wide"}}>
                                        {new Date(nextRace?.FirstPractice?.date as string).getUTCDate().toString().padStart(2, "0")} -{" "}
                                        {new Date(nextMeeting.date_start).getUTCDate().toString().padStart(2, "0")}
                                    </h1>
                                    <div className="bg-white rounded text-sm flex px-2">
                                        <h1 style={{fontFamily: "Formula1 Display Wide"}}>
                                            {getMonthShort(new Date(nextRace?.FirstPractice?.date as string))}-
                                        </h1>
                                        <h1 style={{fontFamily: "Formula1 Display Wide"}}>
                                            {getMonthShort(new Date(nextRace?.date as string))}
                                        </h1>
                                    </div>
                                </div>
                                <p className="text-4xl px-2">{nextMeeting.flag}</p>
                            </div>
                            <div className="h-0.5 w-full bg-gray-600" />
                            <h2 className="text-4xl text-white" style={{fontFamily: "Formula1 Display Bold"}}>
                                {nextMeeting.country_name}
                            </h2>
                            <p className="text-white">{nextMeeting.meeting_official_name}</p>
                            <div className="h-0.5 w-full bg-gray-600" />
                            <div className="overflow-clip rounded-lg bg-plusPattern64 bg-[length:8px] h-28">
                                <Image
                                    className="object-contain w-full h-full"
                                    alt={track?.name as string}
                                    height={112}
                                    width={112}
                                    src={track?.src as string}
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center gap-4 max-sm:w-full">
                            <Countdown />
                            <div className="grid grid-cols-3 items-center justify-between w-full bg-gray-800 px-4 py-2 gap-6 rounded-lg">
                                <p className="text-white">QUALIFYING</p>
                                <p className="text-gray-500 text-center">{getWeekdayShort(new Date(firstPractice))}</p>
                                <div className="py-2 px-6 bg-gray-600 rounded-lg">
                                    <p className="text-white text-center">{firstPractice.slice(11, 16)}</p>
                                </div>
                                <p className="text-white">RACE</p>
                                <p className="text-gray-500 text-center">{getWeekdayShort(new Date(race))}</p>
                                <div className="py-2 px-6 bg-gray-600 rounded-lg">
                                    <p className="text-white text-center">{race.slice(11, 16)}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
