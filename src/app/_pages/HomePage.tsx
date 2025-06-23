"use client"

import Image from "next/image"
import {JSX, useEffect, useState} from "react"
import {formatTime, getContrastTextColor, getMonthShort, getTimeInOffset, getWeekdayShort, pad} from "@/lib/utils"
import {getNameOfSession, sessionKeys} from "@/types/ErgastExport"
import {StandingTable} from "../components/StandingTable"
import {TeamStandings} from "../components/TeamStandings"
import {DriverTable} from "../components/DriverStandings"
import {Countdown} from "../components/Countdown"
import {NextRaceLayout} from "../components/NextRaceLayout"
import {WeekendSchedule} from "../components/WeekendSchedule"

interface HomePageProps {
    nextRace: Race
    nextMeeting: Meeting | null
    track: Track
    timeLeft: number | null
    driverStandingList: DriverStanding[]
    constructors: ConstructorStanding[]
    teams: Team[]
    drivers: Driver[]
}

export default function HomePage({driverStandingList, nextRace, nextMeeting, track, timeLeft, teams, constructors}: HomePageProps) {
    const raceTime = nextRace?.date + "T" + nextRace?.time
    const firstPracticeTime = nextRace.FirstPractice?.date + "T" + nextRace.FirstPractice?.time

    return (
        <div className="min-lg:h-screen bg-gray-950 overflow-y-scroll">
            {nextRace && (
                <section className="p-4 min-md:p-2 flex flex-col items-center bg-gray-950 text-gray-50 gap-2 border-b-2 border-gray-600">
                    <h2 className="text-3xl min-md:text-2xl font-semibold mask-t-from-6">Next Race</h2>
                    <p className="text-xl min-md:text-lg mask-t-from-6">{nextRace.raceName}</p>
                </section>
            )}
            {nextMeeting && (
                <div
                    className="max-sm:flex items-start gap-4 p-4 max-sm:flex-col max-sm:pb-4 pb-10
                    min-md:grid min-md:grid-cols-3
                "
                >
                    <div className="flex flex-col gap-4 w-full">
                        <NextRaceLayout nextMeeting={nextMeeting} firstPracticeTime={firstPracticeTime} raceTime={raceTime} track={track} />
                        <Countdown nextMeeting={nextMeeting} raceTime={raceTime} timeLeft={timeLeft} />
                        <WeekendSchedule nextMeeting={nextMeeting} nextRace={nextRace} raceTime={raceTime} />
                    </div>

                    <StandingTable title="Driver Standings" children={<DriverTable teams={teams} drivers={driverStandingList} />} />
                    <StandingTable title="Team Standings" children={<TeamStandings constructors={constructors} teams={teams} />} />
                </div>
            )}
        </div>
    )
}
