"use client"

import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"
import React from "react"

function BackHomeButton({pathname}: {pathname: string}) {
    return (
        pathname.startsWith("/pages") && (
            <Link href={"/"} className="absolute top-4 left-2 text-4xl text-white rounded bg-red-500 px-1">
                {"<"}
            </Link>
        )
    )
}

export function Navbar({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()
    return (
        <div className="flex flex-row h-svh">
            <div className="bg-gray-100 w-1/6 p-4 flex flex-col gap-4 items-center">
                <Image src={"/f1Image.png"} className="w-full" height={640} width={2560} alt="f1 logo" />
                <div className="rounded bg-gray-200 w-full h-full p-4 flex flex-col gap-2">
                    <h2 className="text-lg border-b-2">Search</h2>
                    <div className="flex flex-col items-center pl-2 gap-2">    
                        <Link href={"/pages/search/circuits"} className="rounded bg-red-500 p-2 text-white w-full">
                            Circuits
                        </Link>
                        <Link href={"/pages/search/pilots"} className="rounded bg-red-500 p-2 text-white w-full">
                            Pilots
                        </Link>
                    </div>
                </div>
            </div>
            <div className="bg-gray-900 w-full relative">
                <BackHomeButton pathname={pathname} />
                {children}
            </div>
        </div>
    )
}
