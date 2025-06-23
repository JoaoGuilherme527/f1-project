import {getTimeInOffset, getWeekdayShort, pad} from "@/lib/utils"
import {getNameOfSession, sessionKeys} from "@/types/ErgastExport"
import {useState} from "react"
import {Separator} from "./Separator"

export const WeekendSchedule = ({nextMeeting, nextRace, raceTime}: {nextMeeting: Meeting; nextRace: Race; raceTime: string}) => {
    const [timeMode, setTimeMode] = useState<"local" | "track">("local")
    const raceDateObj = new Date(raceTime)
    const race =
        timeMode === "local"
            ? `${pad(raceDateObj.getHours())}:${pad(raceDateObj.getMinutes())}`
            : getTimeInOffset(nextRace.date as string, nextRace.time, nextMeeting?.gmt_offset as string)

    return (
        <div className="flex flex-col items-center gap-4 w-full">
            <div className="flex flex-col items-center w-full justify-between bg-gray-800 p-4 gap-6 rounded-lg">
                <div className="grid grid-cols-2 gap-4 bg-gray-800 w-full rounded-lg ">
                    <button
                        onClick={() => setTimeMode("local")}
                        className={`py-2 px-4 rounded-lg ${timeMode === "local" ? "bg-red-500" : "bg-gray-700"} text-white transition-all`}
                    >
                        MY TIME
                    </button>
                    <button
                        onClick={() => setTimeMode("track")}
                        className={`py-2 px-4 rounded-lg ${timeMode === "track" ? "bg-red-500" : "bg-gray-700"} text-white transition-all`}
                    >
                        TRACK TIME
                    </button>
                </div>
                <Separator axle="x" />
                <NextRaceSchedule nextMeeting={nextMeeting} nextRace={nextRace} timeMode={timeMode} />
                <Separator axle="x" />
                <div className="grid grid-cols-3 w-full">
                    <p className="text-white">RACE</p>
                    <p className="text-gray-500 text-center">{getWeekdayShort(new Date(raceTime))}</p>
                    <div className="py-2 px-6 bg-gray-600 rounded-lg">
                        <p className="text-white text-center">{race}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

const NextRaceSchedule = ({nextRace, timeMode, nextMeeting}: {nextRace: Race; timeMode: string; nextMeeting: Meeting | null}) =>
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
