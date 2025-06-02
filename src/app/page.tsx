import {GetCircuits, GetErgastDriverStandingList, GetErgastRaces, GetMeetings} from "@/lib/actions/actions"
import {getNextMeeting} from "@/lib/utils"
import HomePage from "./components/HomePage"

export default async function Render() {
    try {
        const [races, meetings, driverStandingList, tracks] = await Promise.all([
            GetErgastRaces(),
            GetMeetings(),
            GetErgastDriverStandingList(),
            GetCircuits(),
        ])

        const nextMeeting = getNextMeeting(meetings)
        const nextRace = races && races.filter(({round}) => Number(round) === nextMeeting?.circuit_key)[0]
        const timeLeft = nextMeeting && new Date(nextMeeting.date_start).getTime() - Date.now()
        const findTrackMeeting = tracks.filter(({flag, src}) => flag == nextMeeting?.flag && src !== "")[0]

        return (
            <HomePage
                driverStandingList={driverStandingList}
                nextMeeting={nextMeeting}
                timeLeft={timeLeft}
                track={findTrackMeeting}
                nextRace={nextRace}
            />
        )
    } catch (error) {
        return <div className="text-gray-950 w-full h-full items-center flex justify-center">Render error: {JSON.stringify(error)}</div>
    }
}
