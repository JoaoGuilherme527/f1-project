import TracksPage from "@/app/_pages/TracksPage"
import {GetCircuits} from "@/lib/actions/actions"

export default async function Render() {
    const circuits = await GetCircuits()

    return <TracksPage tracks={circuits as Array<Track>} />
}
