import PilotsPage from "@/app/components/PilotsPage"
import {GetErgastDrivers, GetTeams} from "@/lib/actions/actions"

export default async function Render() {
    const [drivers, teams] = await Promise.all([GetErgastDrivers(), GetTeams()])

    return <PilotsPage drivers={drivers as Array<DriverErgast>} teams={teams} />
}
