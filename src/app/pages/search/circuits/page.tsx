"use client"

import {GetCircuits} from "@/lib/actions/actions"
import {Circuit} from "@/types/Circuits"
import Image from "next/image"
import {useEffect, useState, useTransition} from "react"
import {motion} from "framer-motion"
import "./style.css"

interface CircuitComponentProps {
    circuit: Circuit
    isOpen: string
    setIsOpen: (isOpen: string) => void
}

interface CircuitsComponentProps {
    circuits: Array<Circuit>
    isOpen: string
    setIsOpen: (isOpen: string) => void
}

function CircuitComponent({circuit, isOpen, setIsOpen}: CircuitComponentProps) {
    const [isOpenCircuit, setIsOpenCircuit] = useState(false)
    function checkIsOpen() {
        setIsOpenCircuit(isOpen === circuit.name)
    }

    useEffect(() => checkIsOpen(), [isOpen])

    return (
        <motion.div
            initial={{opacity: 0, scale: 0.95}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.3}}
            className={`relative bg-[#1e293960] flex items-center justify-between gap-6 px-4 py-2 min-w-[350px] max-w-full rounded-md border border-gray-800 cursor-pointer transition-all hover:bg-[#1e2939de] ${isOpenCircuit}`}
            onClick={() => {
                setIsOpen(isOpenCircuit ? "" : circuit.name)
            }}
        >
            <div id="flag" className="z-20">
                <p className="text-3xl">{circuit.flag}</p>
            </div>
            <div className="z-20 text-center">
                <h2 id="circuit" className="text-white font-bold">
                    {circuit.name}
                </h2>
                <p id="country" className="text-gray-400">
                    {circuit.country}
                </p>
            </div>
            <motion.div initial={{opacity: 0, scale: 0.8}} animate={{opacity: 1, scale: 1}} transition={{duration: 0.5}}>
                <Image
                    id="img"
                    src={isOpenCircuit ? circuit.url : circuit.src}
                    alt={circuit.name}
                    width={890}
                    height={590}
                    className={`z-10 w-[90px] ${isOpenCircuit ? "" : "invert"}`}
                />
            </motion.div>
            <div id="circuitInfos" className="grid grid-cols-2 gap-3">
                <div className="flex flex-col border-r-3 border-b-3 rounded-br-2xl border-gray-200">
                    <p className="text-sm text-white">First Grand Prix</p>
                    <p className="text-3xl text-white" style={{fontFamily: "Formula1 Display Bold"}}>
                        {circuit.firstGP}
                    </p>
                </div>
                <div className="flex flex-col border-r-3 border-b-3 rounded-br-2xl border-gray-200">
                    <p className="text-sm text-white">Circuit Length</p>
                    <p className="text-3xl text-white" style={{fontFamily: "Formula1 Display Bold"}}>
                        {circuit.circuitLength}
                    </p>
                </div>
                <div className="flex flex-col border-r-3 border-b-3 rounded-br-2xl border-gray-200 col-span-2 pr-4">
                    <p className="text-sm text-white">Lap Record</p>
                    <div className="flex items-end gap-2">
                        <p id={`circuit-${circuit.name}`} className="text-3xl text-white" style={{fontFamily: "Formula1 Display Bold"}}>
                            {circuit.lapRecord}
                        </p>
                        <p className="text-md text-white">{circuit.driverLapRecordHolder}</p>
                    </div>
                </div>
            </div>
        </motion.div>
    )
}

function CircuitsComponent({circuits, isOpen, setIsOpen}: CircuitsComponentProps) {
    return (
        <div className="grid grid-cols-2 max-sm:grid-cols-1 gap-4 p-4 w-full max-w-full overflow-y-auto h-[calc(100vh-150px)]">
            {circuits.map((circuit, index) => (
                <CircuitComponent key={index} circuit={circuit} isOpen={isOpen} setIsOpen={setIsOpen} />
            ))}
        </div>
    )
}

export default function CircuitsSearch() {
    const [isPending, startTransition] = useTransition()
    const [circuits, setCircuits] = useState<Array<Circuit>>([])
    const [searchTerm, setSearchTerm] = useState("")
    const [isOpen, setIsOpen] = useState("")
    const filteredCircuits = circuits.filter(
        (circuit) =>
            circuit.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            circuit.country.toLowerCase().includes(searchTerm.toLowerCase())
    )

    useEffect(() => {
        getCircuits()
    }, [])

    function getCircuits() {
        startTransition(() => {
            GetCircuits()
                .then((data) => {
                    if (!Array.isArray(data)) {
                        console.log("No data found")
                        return
                    }
                    setCircuits(data as Circuit[])
                })
                .catch((error) => {
                    console.log(error)
                })
        })
    }

    return (
        <div className="flex flex-col py-4 gap-2 w-full h-screen">
            <h1 className="px-10 text-4xl text-white font-bold max-sm:text-center" style={{fontFamily: "Formula1 Display Bold"}}>
                Circuits
            </h1>
            <div className="flex flex-col gap-2 py-2 w-full h-full">
                <div className="flex gap-2 px-4">
                    <input
                        className="w-full rounded bg-[#1e293960] p-2 border border-gray-800 text-white"
                        placeholder="Search circuit name"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {isPending ? (
                    <div className="absolute top-1/2 left-1/2">
                        <div role="status">
                            <svg
                                aria-hidden="true"
                                className="inline w-16 h-16 opacity-90 text-gray-200 animate-spin dark:text-gray-200 fill-red-600"
                                viewBox="0 0 100 101"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                                    fill="currentColor"
                                />
                                <path
                                    d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                                    fill="currentFill"
                                />
                            </svg>
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                ) : searchTerm.length > 0 && filteredCircuits.length === 0 ? (
                    <p className="text-yellow-500 text-center pt-2">No circuit found.</p>
                ) : null}
                {searchTerm.length > 0 && filteredCircuits.length > 0 ? (
                    <CircuitsComponent circuits={filteredCircuits} isOpen={isOpen} setIsOpen={setIsOpen} />
                ) : (
                    <CircuitsComponent circuits={circuits} isOpen={isOpen} setIsOpen={setIsOpen} />
                )}
            </div>
        </div>
    )
}
