"use client"

import {GetMeetings} from "@/lib/actions/actions"
import {Meeting} from "@/types/Utils"
import {useEffect, useState, useTransition} from "react"
import {Icon} from "../../public/icons/icons"

export default function Home() {
    const date = new Date()
    const year = date.getFullYear()
    const [isMeeting, setIsMeeting] = useState<Meeting>()
    const [isPending, startTransition] = useTransition()
    const [timeLeft, setTimeLeft] = useState<number>(0)

    function getNextMeeting(meetings: Meeting[]): Meeting | null {
        const now = new Date()
        const upcomingMeetings = meetings
            .map((meeting) => ({
                ...meeting,
                dateObj: new Date(meeting.date_start),
            }))
            .filter((meeting) => meeting.dateObj > now)
            .sort((a, b) => a.dateObj.getTime() - b.dateObj.getTime())

        return upcomingMeetings.length > 0 ? upcomingMeetings[0] : null
    }

    useEffect(() => {
        startTransition(() => {
            GetMeetings(year)
                .then((data) => {
                    if (!data) {
                        throw new Error("No meeting data found")
                    } else {
                        const nextMeeting = getNextMeeting(data as Meeting[])
                        if (nextMeeting) {
                            setIsMeeting(nextMeeting)
                            const diff = new Date(nextMeeting.date_start).getTime() - new Date().getTime()
                            setTimeLeft(diff)
                        }
                    }
                })
                .catch((error) => {
                    console.error("Error fetching meetings:", error)
                })
        })
    }, [])

    useEffect(() => {
        if (!isMeeting) return

        const interval = setInterval(() => {
            const diff = new Date(isMeeting.date_start).getTime() - new Date().getTime()
            setTimeLeft(diff)
        }, 1000)

        return () => clearInterval(interval)
    }, [isMeeting])

    function formatTime(ms: number) {
        const totalSeconds = Math.floor(ms / 1000)
        const hours = Math.floor(totalSeconds / 3600)
        const minutes = Math.floor((totalSeconds % 3600) / 60)
        const seconds = totalSeconds % 60

        const pad = (n: number) => n.toString().padStart(2, "0")

        return {hours: pad(hours), minutes: pad(minutes), seconds: pad(seconds)}
    }

    function getWeekdayShort(date: Date): string {
        const weekdays = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"]
        return weekdays[date.getDay()]
    }

    function getMonthShort(date: Date): string {
        const month = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"]
        return month[date.getMonth()]
    }

    function RenderCountdown() {
        if (!isMeeting) return null

        const oneDay = 24 * 60 * 60 * 1000 // 24 hours in milliseconds

        if (timeLeft > oneDay) {
            const days = Math.round(Number(formatTime(timeLeft).hours) / 24)
            const hours = Number(formatTime(timeLeft).hours) - (days * 24)
            return (
                 <div className="text-white flex flex-col gap-4 bg-gray-950 justify-center rounded-2xl w-80 px-10 py-4">
                    <div className="flex flex-col gap-2 items-center">
                        <p className="text-md font-extrabold">RACE</p>
                        <div className="h-0.5 w-full bg-gray-600" />
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-2 items-center w-20">
                            <p className="text-4xl w-full text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                                {Math.round(Number(formatTime(timeLeft).hours) / 24)}
                                {/* 00 */}
                            </p>
                            <p className="text-sm text-gray-500 text-center">DAYS</p>
                        </div>
                        <div className="h-10 w-0.5 bg-gray-500" />
                        <div className="flex flex-col gap-2 items-center w-20">
                            <p className="text-4xl w-full text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                                {hours}
                                {/* 00 */}
                            </p>
                            <p className="text-sm text-gray-500 text-center">HRS</p>
                        </div>
                        <div className="h-10 w-0.5 bg-gray-500" />
                        <div className="flex flex-col gap-2 items-center w-20">
                            <p className="text-4xl w-full text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                                {formatTime(timeLeft).minutes}
                                {/* 00 */}
                            </p>
                            <p className="text-sm text-gray-500 text-center">MIN</p>
                        </div>
                    </div>
                </div>
                // <p className="text-black text-center">
                //     {days} {days === 1 ? "day" : "days"} left
                // </p>
            )
        } else if (timeLeft > 0) {
            return (
                <div className="text-white flex flex-col gap-4 bg-gray-950 justify-center rounded-2xl w-80 px-10 py-4">
                    <div className="flex flex-col gap-2 items-center">
                        <p className="text-md font-extrabold">RACE</p>
                        <div className="h-0.5 w-full bg-gray-600" />
                    </div>
                    <div className="flex">
                        <div className="flex flex-col gap-2 items-center w-20">
                            <p className="text-4xl w-full text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                                {formatTime(timeLeft).hours}
                                {/* 00 */}
                            </p>
                            <p className="text-sm text-gray-500 text-center">HRS</p>
                        </div>
                        <div className="h-10 w-0.5 bg-gray-500" />
                        <div className="flex flex-col gap-2 items-center w-20">
                            <p className="text-4xl w-full text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                                {formatTime(timeLeft).minutes}
                                {/* 00 */}
                            </p>
                            <p className="text-sm text-gray-500 text-center">MIN</p>
                        </div>
                        <div className="h-10 w-0.5 bg-gray-500" />
                        <div className="flex flex-col gap-2 items-center w-20">
                            <p className="text-4xl w-full text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                                {formatTime(timeLeft).seconds}
                                {/* 00 */}
                            </p>
                            <p className="text-sm text-gray-500 text-center">SECS</p>
                        </div>
                    </div>
                </div>
            )
        } else {
            return <p className="text-white text-center">Started!</p>
        }
    }

    return (
        <div className="min-h-screen bg-gray-900">
            {isPending ? (
                <div className="absolute top-1/2 left-1/2 translate-x-[-50%] -translate-y-[50%]">
                    <Icon icon="loading" className="w-30 h-30" />
                </div>
            ) : (
                <div className="flex flex-col items-center py-4">
                    <div className="flex items-center rounded-2xl gap-10 p-4 bg-lime-">
                        <div className="flex flex-col gap-4 bg-gray-950 p-4 rounded-2xl w-80">
                            <div className="flex items-center justify-between">
                                <h1 className="text-white" style={{fontFamily: "Formula1 Display Wide"}}>
                                    {new Date(isMeeting?.date_start as string).getUTCDate() < 9
                                        ? "0" + new Date(isMeeting?.date_start as string).getUTCDate()
                                        : new Date(isMeeting?.date_start as string).getUTCDate()}{" "}
                                    - {getMonthShort(new Date(isMeeting?.date_start as string))}
                                </h1>
                                <p className="text-4xl px-2">{isMeeting?.flag}</p>
                            </div>
                            <div className="h-0.5 w-full bg-gray-600" />
                            <h2 className="text-4xl text-white" style={{fontFamily: "Formula1 Display Bold"}}>
                                {isMeeting?.country_name}
                            </h2>
                            <p className="text-white">{isMeeting?.meeting_official_name}</p>
                        </div>
                        <div className="flex flex-col items-center gap-4">
                            <RenderCountdown />
                            <div className="flex items-center justify-between w-full bg-gray-800 px-4 py-2 gap-6 rounded-lg">
                                <p className="text-white">RACE</p>
                                <p className="text-gray-500">{getWeekdayShort(new Date(isMeeting?.date_start as string))}</p>
                                <div className="py-2 px-6 bg-gray-600 rounded-lg">
                                    <p className="text-white text-center">
                                        {isMeeting?.date_start.slice(11, 13)}:{isMeeting?.date_start.slice(14, 16)}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}
