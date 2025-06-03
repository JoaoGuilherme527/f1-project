"use client"

import Image from "next/image"
import Link from "next/link"
import {usePathname} from "next/navigation"
import React from "react"
import {Menu, House, Search} from "@deemlol/next-icons"
import "../styles/Navbar.css"
import {Icon, IconName, icons} from "../../../public/icons/icons"

interface Route {
    href: string
    name: string
    iconName: IconName
}

export function Navbar({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    const pathname = usePathname()

    const routes: Array<Route> = [
        {href: "/", name: "Home", iconName: "home"},
        {href: "/search/tracks", name: "Race tracks", iconName: "tracks"},
        {href: "/search/pilots", name: "Drivers", iconName: "pilots"},
    ]

    function RouteComponent({route}: {route: Route}) {
        const isActive = pathname === route.href
        const isActiveClass = isActive ? "bg-red-400" : "bg-gray-100"
        const isActiveTextClass = isActive ? "text-white" : "text-gray-800"
        const isActiveIconClass = isActive ? "text-white" : "text-gray-800"

        return (
            <Link
                href={route.href}
                className={`flex items-center gap-8 w-full cursor-pointer rounded-md ${isActiveClass} ${
                    isActive ? "activeRoute relative" : " hover:bg-gray-200 transition duration-300 ease-in-out"
                } max-sm:flex-row-reverse max-sm:gap-2 max-sm:justify-center max-sm:items-center`}
                onClick={() => {
                    const sidebarMobile = document.querySelector("#sidebarMobile")
                    sidebarMobile?.classList.add("hiddenSideBarMobile")
                    sidebarMobile?.classList.remove("showSideBarMobile")
                }}
            >
                <div className={`p-1 ${isActiveIconClass} z-10`}>
                    <Icon icon={route.iconName} className="w-6 rotate-y-180" />
                </div>
                <div className={`flex items-center justify-center z-10  ${isActiveTextClass}`}>
                    <h2 className={`w-[120px] max-sm:text-center ${isActiveTextClass}`}>{route.name}</h2>
                </div>
            </Link>
        )
    }

    function Routes({routes}: {routes: Array<Route>}) {
        return (
            <div className="flex flex-col items-center gap-4 w-full">
                {routes.map((route, index) => {
                    return (
                        <div key={index} className="flex flex-col gap-2 w-full">
                            <RouteComponent route={route} />
                        </div>
                    )
                })}
            </div>
        )
    }

    return (
        <div className={`flex max-sm:flex-col flex-row  min-lg:h-screen ${pathname.includes("tracks") || pathname.includes("pilots") ? 'bg-gray-950' : 'bg-gray-950'} px-1`}>
            {/* SIDEBAR */}
            <div
                className={`bg-gray-50 w-56 p-2 px-3 shadow-2xl flex flex-col gap-8 items-center rounded-md z-10 hiddenSideBar max-sm:hidden`}
                id="sidebar"
            >
                {/* F1 IMAGE AND SANDWICH BUTTON */}
                <div className="flex items-center gap-2 w-full">
                    <div className="px-1">
                        <Menu
                            size={24}
                            color="black"
                            className="cursor-pointer"
                            onClick={() => {
                                const sidebar = document.querySelector("#sidebar")
                                sidebar?.classList.toggle("hiddenSideBar")
                                sidebar?.classList.toggle("showSideBar")
                            }}
                        />
                    </div>
                    <div id="imgHolder" className="flex items-center justify-center mr-4">
                        <Icon icon="f1" className="w-1/2 text-red-500" />
                    </div>
                </div>

                {/* NAVBAR */}
                <div className="flex flex-col items-center gap-2 shrink-0 w-full">
                    <Routes routes={routes} />
                </div>
            </div>

            {/* SIDEBAR MOBILE */}
            <div
                className={`bg-gray-50 w-full h-58 p-2 px-3 pb-4 flex flex-col gap-8 items-center rounded-md z-10 min-sm:hidden mt-2 hiddenSideBarMobile shadow-2xl`}
                id="sidebarMobile"
            >
                {/* F1 IMAGE AND SANDWICH BUTTON */}
                <div className="flex items-center gap-2 w-full flex-row-reverse">
                    <div className="px-1 z-10">
                        <Menu
                            size={24}
                            color="black"
                            className="cursor-pointer"
                            onClick={() => {
                                const sidebar = document.querySelector("#sidebarMobile")
                                sidebar?.classList.toggle("hiddenSideBarMobile")
                                sidebar?.classList.toggle("showSideBarMobile")
                            }}
                        />
                    </div>
                    <div id="imgHolder" className="mr-[-34px] z-0 flex w-full h-[38px] items-center justify-center ">
                        <Icon icon="f1" className="h-full text-red-500" />
                    </div>
                </div>
                {/* NAVBAR */}
                <div className="flex items-center gap-2 w-full">
                    <Routes routes={routes} />
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="w-full overflow-hidden h-calc(100vh-235px) relative">{children}</div>
        </div>
    )
}
