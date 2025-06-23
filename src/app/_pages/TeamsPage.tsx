"use client"
import Image from "next/image"
import {useRef, useState} from "react"

interface TeamsPageProps {
    teams: Team[] & Constructor[]
}

function TeamComponent({team}: {team: Team}) {
    const ref = useRef<HTMLDivElement>(null)
    if (ref.current) {
        ref.current.style.setProperty("--team-color", team.color)
    }
    return (
        <div
            className="text-white flex flex-col gap-6
        bg-[#1e293960] relative border border-gray-800 rounded-xl h-52 min-md:w-80 overflow-hidden justify-between
        teamCard
        "
            ref={ref}
        >
            <div className="flex items-center gap-2 w-full p-2">
                <div className="w-[30px]">
                    <Image alt="Team Logo" src={team.logo} height={96} width={96} />
                </div>
                <p className="text-sm">{team.name}</p>
            </div>
            <div className="pr-7 pl-2 w-full flex justify-start">
                <img src={team.car} alt="Team car" />
            </div>
        </div>
    )
}

function TeamsList({teams}: {teams: Team[]}) {
    return (
        <div className={`gap-4 p-4 w-full h-full max-w-full transition-all flex flex-wrap`}>
            {teams.map((team, index) => (
                <TeamComponent key={index} team={team} />
            ))}
        </div>
    )
}

export default function TeamsPage({teams}: TeamsPageProps) {
    const [searchTerm, setSearchTerm] = useState("")
    const filteredTeams = searchTerm.length > 0 ? teams.filter((team) => team.name.toLowerCase().includes(searchTerm.toLowerCase())) : teams
    return (
        <div className="flex flex-col py-4 gap-2 w-full h-full">
            <h1 className="px-10 text-4xl text-white font-bold max-sm:text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                Teams
            </h1>
            <div className="flex flex-col gap-2 py-2 w-full">
                <div className="flex gap-2 px-4">
                    <input
                        className="w-full rounded bg-[#1e293960] p-2 border border-gray-800 text-white"
                        placeholder="Search team"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <TeamsList teams={filteredTeams} />
            </div>
        </div>
    )
}
