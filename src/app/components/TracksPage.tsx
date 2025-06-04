"use client"

import Image from "next/image"
import {useEffect, useLayoutEffect, useState} from "react"
import {motion} from "framer-motion"
import {Icon} from "../../../public/icons/icons"
import "../styles/TracksPage.css"

interface TrackComponentProps {
    track: Track
    isOpen: string
    setIsOpen: (isOpen: string) => void
}

interface TracksComponentProps {
    tracks: Array<Track>
    isOpen: string
    setIsOpen: (isOpen: string) => void
    className?: string
}

export default function TracksPage({tracks}: {tracks: Array<Track>}) {
    const [searchTerm, setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState("")
    const filteredCircuits = tracks.filter(
        (track) =>
            track.name.toLowerCase().includes(searchTerm.toLowerCase()) || track.country.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <div className="flex flex-col py-4 gap-2 w-full min-md:h-screen bg-gray-950">
            <h1 className="px-10 text-4xl text-white font-bold max-sm:text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                Race Tracks
            </h1>
            <div className="flex flex-col gap-2 py-2 w-full min-md:h-full">
                <div className="flex gap-2 px-4">
                    <input
                        className="w-full rounded bg-[#1e293960] p-2 border border-gray-800 text-white"
                        placeholder="Search circuit name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {searchTerm.length > 0 && filteredCircuits.length === 0 ? (
                    <p className="text-yellow-500 text-center pt-2">No circuit found.</p>
                ) : searchTerm.length > 0 && filteredCircuits.length > 0 ? (
                    <TracksComponent tracks={filteredCircuits} isOpen={isOpen} setIsOpen={setIsOpen} />
                ) : (
                    <>
                        <TracksComponent
                            tracks={tracks}
                            isOpen={isOpen}
                            setIsOpen={setIsOpen}
                        />
                    </>
                )}
            </div>
        </div>
    )
}

const TrackComponent = ({track, isOpen, setIsOpen}: TrackComponentProps) => {
    const [isOpenCircuit, setIsOpenCircuit] = useState(false)
    const [imgWidth, setImgWidth] = useState(960)
    function checkIsOpen() {
        setIsOpenCircuit(isOpen === track.name)
    }

    useEffect(() => {
        setTimeout(() => {
            setImgWidth(isOpenCircuit ? 960 : 50)
        }, 450)
        setImgWidth(!isOpenCircuit ? 50 : imgWidth)
    }, [isOpenCircuit])

    useEffect(() => checkIsOpen(), [isOpen])

    return (
        <motion.div
            className={`relative bg-[#1e293960] flex items-center justify-between gap-6 px-4 py-2 max-w-full rounded-md border border-gray-800 cursor-pointer transition-all hover:bg-[#1e2939de] ${isOpenCircuit}`}
            onClick={() => {
                setIsOpen(isOpenCircuit ? "" : track.name)
            }}
        >
            <div id="flag" className="z-20">
                <p className="text-3xl">{track.flag}</p>
            </div>
            <div className="z-20 text-center">
                <h2 id="circuit" className="text-white font-bold">
                    {track.name}
                </h2>
                <p id="country" className="text-gray-400">
                    {track.country}
                </p>
            </div>
            <motion.div>
                {isOpenCircuit && (
                    <div className="bg-gray-100">
                        <Image
                            id="img"
                            src={track.url}
                            alt={track.name}
                            width={imgWidth}
                            height={imgWidth * 0.75}
                            loading="lazy"
                            className={`z-10 w-[90px]`}
                        />
                    </div>
                )}
            </motion.div>
            <div id="circuitInfos" className="flex flex-col gap-2">
                <h2 className="text-white font-bold text-2xl">{track.name}</h2>
                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col border-r-3 border-b-3 rounded-br-2xl border-gray-200">
                        <p className="text-sm text-white">First Grand Prix</p>
                        <p className="text-3xl text-white font-extrabold" style={{fontFamily: "Formula1 Display Regular"}}>
                            {track.firstGP}
                        </p>
                    </div>
                    <div className="flex flex-col border-r-3 border-b-3 rounded-br-2xl border-gray-200">
                        <p className="text-sm text-white">Circuit Length</p>
                        <p className="text-3xl text-white font-extrabold" style={{fontFamily: "Formula1 Display Regular"}}>
                            {track.circuitLength / 1000} <span className="text-sm text-gray-300">meters</span>
                        </p>
                    </div>
                    <div className="flex flex-col border-r-3 border-b-3 rounded-br-2xl border-gray-200 col-span-2 pr-4">
                        <p className="text-sm text-white">Lap Record</p>
                        <div className="flex items-end gap-2">
                            <p
                                id={`circuit-${track.name}`}
                                className="text-3xl text-white font-extrabold"
                                style={{fontFamily: "Formula1 Display Regular"}}
                            >
                                {track.lapRecord}
                            </p>
                            <p className="text-md text-white">{track.driverLapRecordHolder}</p>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

const TracksComponent = ({tracks, isOpen, setIsOpen, className}: TracksComponentProps) => {
    const [page, setPage] = useState(1)
    const [isLoading, setIsLoading] = useState(true)
    const itemsPerPage = 14

    const paginatedTracks = tracks.slice(0, page * itemsPerPage)

    useLayoutEffect(() => {
        setTimeout(() => {
            setIsLoading(false)
        }, 500)
    }, [])

    return (
        <>
            <div
                className={`grid grid-cols-2 max-sm:grid-cols-1 gap-4 p-4 w-full max-w-full min-md:h-calc(100vh-235px) overflow-y-auto ${className} transition-all min-md:mb-6 ${isLoading ? "opacity-0" : "opacity-100"}`}
            >
                {paginatedTracks
                    // .sort((a, b) => (a.country ? a.country.localeCompare(b.country) : 0))
                    .map((track, index) => (
                        <TrackComponent key={index} track={track} isOpen={isOpen} setIsOpen={setIsOpen} />
                    ))}
                {paginatedTracks.length < tracks.length && (
                    <button
                        className="bg-blue-900 text-white rounded-md p-2 hover:bg-blue-950 transition duration-300 ease-in-out min-md:col-span-2"
                        onClick={() => setPage(page + 1)}
                    >
                        Load more
                    </button>
                )}
            </div>

            <div className={`${isLoading ? "opacity-100" : "opacity-0"} absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[50%]`}>
                <Icon icon="loading" className="w-30 h-30" />
            </div>
        </>
    )
}
