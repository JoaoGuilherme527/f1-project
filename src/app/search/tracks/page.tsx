import TracksPage from "@/app/components/TracksPage"
import {GetCircuits} from "@/lib/actions/actions"

export default async function Render() {
    const circuits = await GetCircuits()

    return <TracksPage tracks={circuits as Array<Track>} />
}
