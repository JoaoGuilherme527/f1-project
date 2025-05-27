import {GetCircuits, GetDrivers} from "@/lib/actions/actions"
import PilotsPage from "@/app/components/PilotsPage"
import TracksPage from "@/app/components/TracksPage"
import type {Metadata, ResolvingMetadata} from "next"

export const revalidate = 3600

type Props = {
    params: Promise<{type: string}>
    searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    // read route params
    const {type} = await params

    // optionally access and extend (rather than replace) parent metadata
    const previousImages = (await parent).openGraph?.images || []

    return {
        title: type === "pilots" ? "F1 Pilots" : "F1 Tracks",
        description:
            type === "pilots" ? "Explore the latest F1 pilots and their stats." : "Discover the iconic F1 tracks and their history.",
        keywords: type === "pilots" ? "F1, Pilots, Drivers, Formula 1" : "F1, Tracks, Circuits, Formula 1",
        authors: [{name: "F1 Fan", url: "https://f1fan.com"}],
        creator: "F1 Fan",
        icons: {
            icon: [{url: "/icons/f1Image.svg"}],
        },
    }
}

export default async function SearchTypePage({params, searchParams}: Props) {
    const {type} = await params

    if (type === "pilots") {
        const pilots = await GetDrivers(undefined, 2025)
        return <PilotsPage pilots={pilots as Array<Pilot>} />
    } else if (type === "tracks") {
        const circuits = await GetCircuits()
        return <TracksPage tracks={circuits as Array<Track>} />
    } else {
        return <div>Type not found</div>
    }
}
