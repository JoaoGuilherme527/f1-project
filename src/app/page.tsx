import {
    GetCircuits,
    GetDrivers,
    GetErgastDriverStandingList,
    GetErgastRaces,
    GetErgastTeamStandingList,
    GetMeetings,
    GetTeams,
} from "@/lib/actions/actions"
import {getNextMeeting} from "@/lib/utils"
import HomePage from "./_pages/HomePage"
import {Metadata, ResolvingMetadata} from "next"

type Props = {
    params: Promise<{slug: string}>
    searchParams: Promise<{[key: string]: string | string[] | undefined}>
}

export async function generateMetadata({params, searchParams}: Props, parent: ResolvingMetadata): Promise<Metadata> {
    return {
        title: {
            default: "Grand Prix Nexus",
            template: "%s | Grand Prix Nexus",
        },
        description:
            "Explore the complete Formula 1 universe: race schedules, circuits, drivers, teams, standings, and official regulations. Grand Prix Nexus connects everything F1 fans need in one place.",
        keywords: [
            "Formula 1",
            "F1",
            "Grand Prix",
            "F1 Schedule",
            "F1 Standings",
            "F1 Circuits",
            "F1 Drivers",
            "F1 Teams",
            "F1 Rules",
            "F1 History",
        ],
        openGraph: {
            title: "Grand Prix Nexus",
            description: "All F1 circuits, teams, drivers, standings and official rules. Your ultimate hub for everything Formula 1.",
            url: "https://f1-project-eta.vercel.app",
            siteName: "Grand Prix Nexus",
            locale: "pt_BR",
            type: "website",
        },
        twitter: {
            card: "summary_large_image",
            title: "Grand Prix Nexus",
            description: "All F1 circuits, teams, drivers, standings and official rules. Your ultimate hub for everything Formula 1.",
            images: ["https://f1-project-eta.vercel.app/og-image.png"],
        },
        metadataBase: new URL("https://f1-project-eta.vercel.app"),
        alternates: {
            canonical: "/",
        },
        icons: {
            icon: [{url: "/icons/f1Image.svg"}],
        },
    }
}

export default async function Render() {
    try {
        const [races, meetings, driverStandingList, constructors, tracks, drivers, teams] = await Promise.all([
            GetErgastRaces(),
            GetMeetings(),
            GetErgastDriverStandingList(),
            GetErgastTeamStandingList(),
            GetCircuits(),
            GetDrivers(),
            GetTeams(),
        ])

        const nextMeeting = getNextMeeting(meetings)
        const nextRace = races && races.filter(({round}) => Number(round) === nextMeeting?.circuit_key)[0]
        const timeLeft = nextMeeting && new Date(nextMeeting.date_start).getTime() - Date.now()
        const findTrackMeeting = tracks.filter(({flag, src}) => flag == nextMeeting?.flag && src !== "")[0]

        return (
            <HomePage
                constructors={constructors}
                drivers={drivers}
                teams={teams}
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
