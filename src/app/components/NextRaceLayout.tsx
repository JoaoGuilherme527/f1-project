import {getMonthShort, pad} from "@/lib/utils"
import {Separator} from "./Separator"
import Image from "next/image"

interface NextRaceLayoutProps {
    nextMeeting: Meeting
    firstPracticeTime: string
    raceTime: string
    track: Track
}

export const NextRaceLayout = ({nextMeeting, firstPracticeTime, raceTime, track}: NextRaceLayoutProps) => {
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
                <Image className="object-contain h-full " alt={track?.name as string} height={112} width={136} src={track?.src as string} />
            </div>
        </div>
    )
}
