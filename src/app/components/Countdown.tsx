import {formatTime, pad} from "@/lib/utils"
import {Separator} from "./Separator"
import {useEffect, useState} from "react"

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

export const Countdown = ({nextMeeting, raceTime, timeLeft}: {nextMeeting: Meeting | null; raceTime: string; timeLeft: number | null}) => {
    const [isTimeLeft, setIsTimeLeft] = useState<number>(timeLeft ?? 0)

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
