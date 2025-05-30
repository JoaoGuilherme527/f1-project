import {GetCircuits, GetDrivers, GetTeams} from "@/lib/actions/actions"
import PilotsPage from "@/app/components/PilotsPage"
import TracksPage from "@/app/components/TracksPage"

export const revalidate = 3600

type Props = {
    params: Promise<{type: string}>
    searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export default async function SearchTypePage({params, searchParams}: Props) {
    const {type} = await params

    if (type === "pilots") {
        const pilots = await GetDrivers()
        const teams = await GetTeams()
        return <PilotsPage pilots={pilots as Array<Pilot>} teams={teams}/>
    } else if (type === "tracks") {
        const circuits = await GetCircuits()
        return <TracksPage tracks={circuits as Array<Track>} />
    } else {
        return <div>Type not found</div>
    }
}
